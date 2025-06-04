// hooks/task.hooks.ts

import { useQuery } from "@tanstack/react-query";
import { TaskService } from "../services/tasks.service";
import { Task } from "../types/task";

export const useAllTasks = () => {
  return useQuery<Task[], Error>({
    queryKey: ["tasks"],
    queryFn: () => TaskService.getAllTasks(),
  });
};
