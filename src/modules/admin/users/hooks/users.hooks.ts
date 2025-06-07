import { useQuery } from "@tanstack/react-query";
import { UserService } from "../services/users.service";

export const useAllUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: () => UserService.getAllUsers(),
  });
