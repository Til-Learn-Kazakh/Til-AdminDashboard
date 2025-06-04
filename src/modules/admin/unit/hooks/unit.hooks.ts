import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UnitService } from "../services/unit.service";
import { CreateUnitDto, Unit } from "../types/unit.types";

export function useCreateUnit() {
  const queryClient = useQueryClient();

  return useMutation<Unit, Error, CreateUnitDto>({
    mutationFn: (dto: CreateUnitDto) => UnitService.createUnit(dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["units", variables.level_id],
      });
    },
  });
}

// export function useUnitsByLevelID(levelID: string) {
//   return useQuery<Unit[]>({
//     queryKey: ["units", levelID],
//     queryFn: () => UnitService.getUnitsByLevelID(levelID),
//     enabled: !!levelID, // только если levelID есть
//   });
// }

export function useAllUnits() {
  return useQuery<Unit[]>({
    queryKey: ["units"],
    queryFn: () => UnitService.getAllUnits(),
  });
}

export const useUpdateUnit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ unitID, data }: { unitID: string; data: any }) =>
      UnitService.updateUnit(unitID, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
    },
  });
};
