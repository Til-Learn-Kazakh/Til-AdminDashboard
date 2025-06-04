"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import InputGroup from "@/components/FormElements/InputGroup";
import { Select } from "@/components/FormElements/select";
import { Button } from "@/core/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/core/ui/dialog";
import { useLevels } from "../../../section/hooks/section.hooks";
import { useCreateUnit } from "../../hooks/unit.hooks";

type DialogProps = {
  isOpen: boolean;
  toggleOpen: () => void;
};

const schema = z
  .object({
    title: z.string().min(1, { message: "Unit name is required" }),
    level_id: z.string().min(1, { message: "Please select a section" }),
    descriptions: z.object({
      en: z.string(),
      ru: z.string(),
      kk: z.string(),
    }),
  })
  .strict();

type FormType = z.infer<typeof schema>;

export function CreateUnitDialog({ isOpen, toggleOpen }: DialogProps) {
  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      level_id: "",
      descriptions: {
        en: "",
        ru: "",
        kk: "",
      },
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = form;

  const { data: levels } = useLevels();
  console.log("Selected level ID:", levels); // должно быть 24 символа!

  const createUnit = useCreateUnit();

  const onSubmit = (values: FormType) => {
    console.log("Create Unit DTO:", values);

    createUnit.mutate(values, {
      onSuccess: () => {
        toggleOpen();
        reset();
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <DialogContent className="bg-white dark:bg-gray-dark">
        <DialogHeader>
          <DialogTitle>Create New Unit</DialogTitle>
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

          <Controller
            name="level_id"
            control={control}
            render={({ field }) => (
              <Select
                label="Parent section"
                placeholder="Select parent section"
                items={
                  levels?.map((lvl) => ({
                    label: lvl.name,
                    value: String(lvl.id), // 🔥 Важно! Приведи явно в строку
                  })) || []
                }
                value={field.value}
                onChange={field.onChange}
                error={errors.level_id?.message}
              />
            )}
          />

          {/* Пример расширенного описания */}
          <InputGroup
            label="Description EN (optional)"
            type="text"
            placeholder="Enter English description"
            name="descriptions.en"
            control={control}
            error={errors.descriptions?.en?.message}
          />
          <InputGroup
            label="Description RU (optional)"
            type="text"
            placeholder="Введите описание на русском"
            name="descriptions.ru"
            control={control}
            error={errors.descriptions?.ru?.message}
          />
          <InputGroup
            label="Description KZ (optional)"
            type="text"
            placeholder="Kazakh description"
            name="descriptions.kk"
            control={control}
            error={errors.descriptions?.kk?.message}
          />

          <Button
            type="submit"
            className="flex items-center justify-center rounded-lg bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
          >
            Create Unit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
