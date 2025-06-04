// lib/fetchAndSetCSRFToken.ts
import { setCookie } from "nookies";
import { environment } from "../config/environment.config";
import { axiosBase } from "./interceptors";

// Допустим, у вас есть переменная imageserver, где лежит путь к API

export const fetchAndSetCSRFToken = async () => {
  const { serverUrl } = environment;

  try {
    const res = await axiosBase.get<{ csrfToken: string }>(
      `${serverUrl}/csrf-token`,
    );

    const token = res.data.csrfToken;
    setCookie(null, "csrf_token", token, {
      path: "/",
      maxAge: 60 * 60,
      // domain, secure, sameSite — настраивайте под себя, если нужно
    });
  } catch (err) {
    console.error("❌ Не удалось получить CSRF-токен:", err);
  }
};
