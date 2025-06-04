import { LoginDTO, SignupDTO } from "../models/auth.model";

import { axiosBase } from "@/core/api/interceptors";
import { environment } from "@/core/config/environment.config";
import { destroyCookie, setCookie } from "nookies";

class AuthServiceClass {
  private readonly baseUrl = `${environment.apiUrl}/auth`;

  async login(dto: LoginDTO) {
    return axiosBase.post<any>(`${this.baseUrl}/login`, dto).then((res) => {
      const { access_token, refresh_token } = res.data;

      // 💾 Сохраняем в cookies
      setCookie(null, "token", access_token, {
        path: "/",
        maxAge: 60 * 60 * 24, // 1 день (настраиваем по желанию)
      });

      setCookie(null, "refresh_token", refresh_token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 дней
      });

      return res.data;
    });
  }

  async logout(): Promise<void> {
    // Удаление токенов
    destroyCookie(null, "token", { path: "/" });
    destroyCookie(null, "refresh_token", { path: "/" });
    destroyCookie(null, "csrf_token", { path: "/" });
  }

  async signup(dto: SignupDTO) {
    return axiosBase
      .post<any>(`${this.baseUrl}/register`, dto)
      .then((res) => res.data);
  }
}

export const AuthService = new AuthServiceClass();
