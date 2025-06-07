// services/user.service.ts
import { axiosWithAuth } from "@/core/api/interceptors";
import { environment } from "@/core/config/environment.config";

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar?: string;
  hearts: number;
  crystals: number;
  xp: number;
  weekly_xp: number;
  monthly_xp: number;
  lessons_completed: string[];
  perfect_lessons_count: number;
  created_at?: string;
  updated_at?: string;
};

class UserServiceClass {
  private readonly baseUrl = `${environment.apiUrl}/user/all`;

  async getAllUsers(): Promise<User[]> {
    const { data } = await axiosWithAuth.get<User[]>(this.baseUrl);
    return data;
  }
}

export const UserService = new UserServiceClass();
