"use client";

import InputGroup from "@/components/FormElements/InputGroup";
import { Button } from "@/core/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/core/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUpdateUnit } from "../../hooks/unit.hooks";
import { Unit } from "../../types/unit.types";

type DialogProps = {
  isOpen: boolean;
  toggleOpen: () => void;
};

interface UpdateUnitDialogProps extends DialogProps {
  unit: Unit;
}

const schema = z.object({
  title: z.string().min(1, { message: "Unit name is required" }),
  descriptions: z
    .object({
      en: z.string().optional(),
      ru: z.string().optional(),
      kk: z.string().optional(),
    })
    .optional(),
});

type FormType = z.infer<typeof schema>;

export function UpdateUnitDialog({
  isOpen,
  toggleOpen,
  unit,
}: UpdateUnitDialogProps) {
  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: unit.title ?? "",
      descriptions: {
        en: unit.descriptions?.en ?? "",
        ru: unit.descriptions?.ru ?? "",
        kk: unit.descriptions?.kk ?? "",
      },
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;
  const updateUnit = useUpdateUnit();

  const onSubmit = (values: FormType) => {
    updateUnit.mutate(
      { unitID: unit.id, data: values },
      {
        onSuccess: () => {
          toggleOpen();
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <DialogContent className="bg-white dark:bg-gray-dark">
        <DialogHeader>
          <DialogTitle>Update Unit</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 flex flex-col gap-5"
        >
          <InputGroup
            label="Unit Name"
            type="text"
            placeholder="Enter unit name"
            name="title"
            control={control}
            error={errors.title?.message}
          />

          <InputGroup
            label="Description EN"
            type="text"
            placeholder="Enter English description"
            name="descriptions.en"
            control={control}
            error={errors.descriptions?.en?.message}
          />

          <InputGroup
            label="Description RU"
            type="text"
            placeholder="Введите описание на русском"
            name="descriptions.ru"
            control={control}
            error={errors.descriptions?.ru?.message}
          />

          <InputGroup
            label="Description KZ"
            type="text"
            placeholder="Қазақша сипаттаманы енгізіңіз"
            name="descriptions.kk"
            control={control}
            error={errors.descriptions?.kk?.message}
          />

          <Button
            type="submit"
            className="flex items-center justify-center rounded-lg bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
          >
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
