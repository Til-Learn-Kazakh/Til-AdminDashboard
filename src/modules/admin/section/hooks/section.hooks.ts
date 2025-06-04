import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LevelService } from "../services/section.service";

export function useLevels() {
  return useQuery({
    queryKey: ["levels"],
    queryFn: () => LevelService.getAllLevels(),
  });
}

export function useCreateLevel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: LevelService.createLevel.bind(LevelService),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["levels"] });
    },
  });
}
