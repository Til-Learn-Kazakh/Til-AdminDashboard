import { axiosWithAuth } from "@/core/api/interceptors";
import { environment } from "@/core/config/environment.config";

type CreateLevelDto = {
  name: string;
};
type UpdateLevelDto = {
  name: string;
};

type Level = {
  id: number;
  name: string;
};

class LevelServiceClass {
  private readonly baseUrl = `${environment.apiUrl}/levels`;

  async getAllLevels(): Promise<Level[]> {
    const { data } = await axiosWithAuth.get<Level[]>(this.baseUrl);
    return data;
  }

  async createLevel(dto: CreateLevelDto): Promise<Level> {
    const { data } = await axiosWithAuth.post<any>(this.baseUrl, dto);
    return data;
  }

  async updateLevel(id: string, dto: UpdateLevelDto): Promise<Level> {
    const { data } = await axiosWithAuth.put<Level>(
      `${this.baseUrl}/${id}`,
      dto,
    );
    return data;
  }
}

export const LevelService = new LevelServiceClass();
