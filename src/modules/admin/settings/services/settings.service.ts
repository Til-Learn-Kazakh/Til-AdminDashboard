import { axiosWithAuth } from "../../../../core/api/interceptors";
import { environment } from "../../../../core/config/environment.config";
import { User } from "../../users/services/users.service";

type UpdateUserDto = {
  first_name: string;
  last_name: string;
  email?: string;
};
class SettingsServiceClass {
  private readonly baseUrl = `${environment.apiUrl}/user/update`;

  async updateUserProfile(dto: UpdateUserDto): Promise<User> {
    const { data } = await axiosWithAuth.put<User>(`${this.baseUrl}`, dto);
    return data;
  }
}

export const SettingsService = new SettingsServiceClass();
