import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
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
      toast.success("Unit created successfully");
    },
    onError: (error: any) => {
      console.error("Unit creation failed:", error);
      toast.error("Error creating Unit");
    },
  });
}

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
      toast.success("Unit updated successfully");
    },
    onError: (error: any) => {
      console.error("Unit updated failed:", error);
      toast.error("Error updating Unit");
    },
  });
};
