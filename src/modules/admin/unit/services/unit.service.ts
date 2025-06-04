import { axiosWithAuth } from "@/core/api/interceptors";
import { environment } from "@/core/config/environment.config";
import { CreateUnitDto, Unit, UpdateUnitDto } from "../types/unit.types";

class UnitServiceClass {
  private readonly baseUrl = `${environment.apiUrl}/units`;

  async createUnit(dto: CreateUnitDto): Promise<Unit> {
    const { data } = await axiosWithAuth.post<Unit>(this.baseUrl, dto);
    console.log("CreateUnit DTO:", dto);
    return data;
  }

  async getUnitsByLevelID(levelID: string): Promise<Unit[]> {
    const { data } = await axiosWithAuth.get<Unit[]>(
      `${this.baseUrl}/by-level/${levelID}`,
    );
    return data;
  }

  async getAllUnits(): Promise<Unit[]> {
    const { data } = await axiosWithAuth.get<Unit[]>(this.baseUrl);
    return data;
  }

  async updateUnit(unitID: string, dto: UpdateUnitDto): Promise<Unit> {
    const { data } = await axiosWithAuth.put<Unit>(
      `${this.baseUrl}/${unitID}`,
      dto,
    );
    return data;
  }
}

export const UnitService = new UnitServiceClass();
