// lib/axios.ts
import axios, {
  AxiosHeaders,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { environment } from "../config/environment.config";

const server = environment.apiUrl;

const options: AxiosRequestConfig = {
  baseURL: server,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  maxRedirects: 0,
};

// 1) axiosBase — общий экземпляр без автоматической подстановки Authorization
export const axiosBase = axios.create(options);

// 2) axiosWithAuth — экземпляр, который добавляет токен и обновляет при 401
export const axiosWithAuth = axios.create(options);

// --------------------------------------------------
// ПЕРЕХВАТЧИК ЗАПРОСОВ ДЛЯ axiosBase
// --------------------------------------------------
axiosBase.interceptors.request.use((config) => {
  const cookies = parseCookies(); // Считываем куки (на клиенте/сервере)
  const csrfToken = cookies["csrf_token"];

  // Логируем куки и метод запроса
  console.log("[axiosBase] Cookies:", cookies);
  console.log("[axiosBase] Request method:", config.method);

  // Если есть CSRF-токен и это не GET-запрос, подставляем в заголовок
  if (csrfToken && config.method !== "get") {
    console.log("[axiosBase] Setting X-CSRF-Token header:", csrfToken);
    (config.headers as AxiosHeaders).set("X-CSRF-Token", csrfToken);
  } else {
    console.log("[axiosBase] No CSRF token set or method is GET");
  }

  return config;
});

// --------------------------------------------------
// ПЕРЕХВАТЧИК ЗАПРОСОВ ДЛЯ axiosWithAuth
// --------------------------------------------------
axiosWithAuth.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const cookies = parseCookies();
  const accessToken = cookies["token"];
  const csrfToken = cookies["csrf_token"];

  // Логируем куки и метод
  console.log("[axiosWithAuth] Cookies:", cookies);
  console.log("[axiosWithAuth] Request method:", config.method);

  if (accessToken) {
    console.log("[axiosWithAuth] Setting Authorization header:", accessToken);
    (config.headers as AxiosHeaders).set("Authorization", accessToken);
  } else {
    console.log("[axiosWithAuth] No access token found in cookies");
  }

  if (csrfToken && config.method !== "get") {
    console.log("[axiosWithAuth] Setting X-CSRF-Token header:", csrfToken);
    (config.headers as AxiosHeaders).set("X-CSRF-Token", csrfToken);
  } else {
    console.log("[axiosWithAuth] No CSRF token set or method is GET");
  }

  return config;
});

// --------------------------------------------------
// ПЕРЕХВАТЧИК ОТВЕТОВ ДЛЯ axiosWithAuth — ловим 401
// --------------------------------------------------
axiosWithAuth.interceptors.response.use(
  (response: AxiosResponse) => {
    // Можно добавить лог успешных ответов, если нужно
    console.log(
      "[axiosWithAuth] Response success:",
      response.status,
      response.data,
    );
    return response;
  },
  async (error) => {
    console.log(
      "[axiosWithAuth] Response error:",
      error?.response?.status,
      error?.response?.data,
    );

    const originalRequest = error.config;

    // Проверяем 401
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("[axiosWithAuth] Got 401, trying to refresh token...");

      try {
        const cookies = parseCookies();
        const refreshToken = cookies["refresh_token"];
        if (!refreshToken) {
          console.error("[axiosWithAuth] No refresh token found in cookies");
          throw new Error("No refresh token");
        }

        // Логируем, что пошёл запрос на refresh
        console.log(
          "[axiosWithAuth] Sending refresh request with refresh_token:",
          refreshToken,
        );

        const res = await axiosBase.post<{ access_token: string }>(
          "/auth/refresh",
          {
            refresh_token: refreshToken,
          },
        );

        const newAccessToken = res.data.access_token;

        console.log(
          "[axiosWithAuth] Refresh success, new access_token:",
          newAccessToken,
        );

        // Сохраняем новый access-токен в cookie
        setCookie(null, "token", newAccessToken, {
          path: "/",
        });

        // Подставляем в исходный запрос
        originalRequest.headers["Authorization"] = newAccessToken;
        return axiosWithAuth(originalRequest);
      } catch (refreshError) {
        console.error(
          "[axiosWithAuth] Ошибка при обновлении токена:",
          refreshError,
        );
        // Удаляем токены
        destroyCookie(null, "token");
        destroyCookie(null, "refresh_token");
      }
    }

    // Если не 401 или рефреш не сработал
    return Promise.reject(error);
  },
);
