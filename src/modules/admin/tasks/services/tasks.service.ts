// services/task.service.ts
import { axiosWithAuth } from "@/core/api/interceptors";
import { environment } from "../../../../core/config/environment.config";
import { Task } from "../types/task";

class TaskServiceClass {
  private readonly baseUrl = `${environment.apiUrl}/tasks`;

  async getAllTasks(): Promise<Task[]> {
    const { data } = await axiosWithAuth.get<Task[]>(this.baseUrl);
    return data;
  }
}

export const TaskService = new TaskServiceClass();
