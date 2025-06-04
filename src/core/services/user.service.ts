import { environment } from "@/core/config/environment.config";
import { axiosWithAuth } from "../api/interceptors";

class UserServiceClass {
  private readonly baseUrl = `${environment.apiUrl}/auth`;

  async getProfile(): Promise<any | undefined> {
    try {
      const response = await axiosWithAuth.get<{ user: any }>(
        `${this.baseUrl}/current`,
      );
      return response.data;
    } catch (error) {
      console.error("❌ Ошибка при получении профиля:", error);
      return undefined;
    }
  }
}

export const UserService = new UserServiceClass();
