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
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { TaskService } from "../../services/tasks.service";
import { MultiImageUploader } from "../MultiImageUploader";

// Варианты типов заданий
const taskTypes = [
  { label: "Translation Word", value: "translation_word" },
  { label: "Translation Audio", value: "translation_audio" },
  { label: "Audio", value: "audio" },
  { label: "Tap Audio", value: "tap_audio" },
  { label: "Choose Correct Image", value: "choose_correct_image" },
  { label: "Fill Blank", value: "fill_blank" },
  { label: "Read & Respond", value: "read_respond" },
];

const schema = z.object({
  unitId: z.string().min(1, { message: "Unit ID is required" }),
  type: z.string().min(1, { message: "Type is required" }),
  questionRu: z.string().min(1, { message: "Question (RU) is required" }),
  questionEn: z.string().min(1, { message: "Question (EN) is required" }),
  order: z.coerce.number().min(0, { message: "Order must be >= 0" }),
  audioFiles: z.instanceof(File).optional(),
  imageFiles: z.any().optional(),
  localizedCorrectAnswerRu: z.string().optional(),
  localizedCorrectAnswerEn: z.string().optional(),
  localizedHintsRu: z.array(z.string()).optional(),
  localizedHintsEn: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  isOpen: boolean;
  toggleOpen: () => void;
};

function FileUploader({
  control,
  name,
  label,
  multiple = false,
  accept,
  error,
}: {
  control: any;
  name: keyof FormValues;
  label: string;
  multiple?: boolean;
  accept: string; // "audio/*" или "image/*" и т.п.
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium">{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <input
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={(event) => {
              const file = event.target.files?.[0] || null;
              onChange(file);
            }}
          />
        )}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

export function CreateTaskDialog({ isOpen, toggleOpen }: Props) {
  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      unitId: "",
      type: "",
      questionRu: "",
      questionEn: "",
      order: 0,
      imageFiles: [],
      localizedHintsRu: [""],
      localizedHintsEn: [""],
    },
  });

  // внутри компонента
  const mutation = useMutation({
    mutationFn: (formData: FormData) => TaskService.createTask(formData),
    onSuccess: (data) => {
      toast.success("Task created successfully");
      toggleOpen();
      reset();
    },
    onError: (error: any) => {
      console.error("Task creation failed:", error);
      toast.error("Error creating task");
    },
  });

  const onSubmit = (data: FormValues) => {
    const formData = new FormData();
    formData.append("unit_id", data.unitId);
    formData.append("order", data.order.toString());
    formData.append("type", data.type);
    formData.append(
      "question",
      JSON.stringify({
        ru: data.questionRu,
        en: data.questionEn,
      }),
    );

    if (data.localizedCorrectAnswerRu || data.localizedCorrectAnswerEn) {
      formData.append(
        "localized_correct_answer",
        JSON.stringify({
          ru: data.localizedCorrectAnswerRu ?? "",
          en: data.localizedCorrectAnswerEn ?? "",
        }),
      );
    }

    if (data.audioFiles) {
      formData.append("audio", data.audioFiles);
    }
    console.log("AUDIO FILES:", data.audioFiles);

    if (data.imageFiles && data.imageFiles.length > 0) {
      formData.append("image", data.imageFiles[0]);

      if (currentType === "choose_correct_image") {
        Array.from(data.imageFiles as File[]).forEach((file: File) => {
          formData.append("image_options_files", file);
        });
      }
    }

    if (
      (data.localizedHintsRu && data.localizedHintsRu.length > 0) ||
      (data.localizedHintsEn && data.localizedHintsEn.length > 0)
    ) {
      formData.append(
        "localized_hints",
        JSON.stringify({
          ru: data.localizedHintsRu ?? [],
          en: data.localizedHintsEn ?? [],
        }),
      );
    }

    console.log("SUBMIT DATA:", data);

    mutation.mutate(formData);
  };

  // Следим за тем, какой тип выбран:
  const currentType = watch("type");

  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto bg-white dark:bg-gray-dark">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 flex flex-col gap-5"
        >
          {/* Поле Unit ID */}
          <InputGroup
            label="Unit ID"
            placeholder="Enter unit ID"
            name="unitId"
            type="text"
            control={control}
            error={errors.unitId?.message}
          />

          {/* Выбор типа задания */}
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Select
                label="Task Type"
                placeholder="Select task type"
                items={taskTypes}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.type && (
            <p className="-mt-3 text-sm text-red-500">{errors.type.message}</p>
          )}
          <Controller
            control={control}
            name="order"
            render={({ field }) => (
              <div className="flex flex-col gap-1">
                <label className="font-medium">Order</label>
                <input
                  type="number"
                  value={field.value ?? 0}
                  onChange={(e) => {
                    const numericValue = parseInt(
                      e.target.value.replace(/^0+/, "") || "0",
                    );
                    field.onChange(numericValue);
                  }}
                  className="rounded-md border px-3 py-2"
                  placeholder="Enter order"
                  min={0}
                />
                {errors.order && (
                  <p className="text-sm text-red-500">{errors.order.message}</p>
                )}
              </div>
            )}
          />

          {/* Общие поля для всех типов */}
          <InputGroup
            label="Question (RU)"
            placeholder="Введите вопрос на русском"
            name="questionRu"
            type="text"
            control={control}
            error={errors.questionRu?.message}
          />
          <InputGroup
            label="Question (EN)"
            placeholder="Enter question in English"
            name="questionEn"
            type="text"
            control={control}
            error={errors.questionEn?.message}
          />

          {/* Условно рендерим дополнительные поля в зависимости от типа */}
          {currentType === "translation_word" && (
            <>
              <InputGroup
                label="Localized Correct Answer (RU)"
                placeholder="Правильный ответ (RU)"
                name="localizedCorrectAnswerRu"
                type="text"
                control={control}
                error={errors.localizedCorrectAnswerRu?.message}
              />
              <InputGroup
                label="Localized Correct Answer (EN)"
                placeholder="Правильный ответ (EN)"
                name="localizedCorrectAnswerEn"
                type="text"
                control={control}
                error={errors.localizedCorrectAnswerEn?.message}
              />

              <Controller
                control={control}
                name="localizedHintsRu"
                render={({ field }) => (
                  <div>
                    <label className="font-medium">Localized Hints (RU)</label>
                    {(field.value ?? []).map((val, index) => (
                      <input
                        key={index}
                        type="text"
                        value={val}
                        onChange={(e) => {
                          const newHints = [...(field.value ?? [])];
                          newHints[index] = e.target.value;
                          field.onChange(newHints);
                        }}
                        className="mb-2 w-full rounded-md border px-3 py-2"
                        placeholder={`Hint #${index + 1}`}
                      />
                    ))}
                    <Button
                      type="button"
                      onClick={() =>
                        field.onChange([...(field.value ?? []), ""])
                      }
                      className="mb-4 text-white"
                    >
                      + Add Hint RU
                    </Button>
                  </div>
                )}
              />

              <Controller
                control={control}
                name="localizedHintsEn"
                render={({ field }) => (
                  <div>
                    <label className="font-medium">Localized Hints (EN)</label>
                    {field.value?.map((val, index) => (
                      <input
                        key={index}
                        type="text"
                        value={val}
                        onChange={(e) => {
                          const newHints = [...(field.value ?? [])];
                          newHints[index] = e.target.value;
                          field.onChange(newHints);
                        }}
                        className="mb-2 w-full rounded-md border px-3 py-2"
                        placeholder={`Hint #${index + 1}`}
                      />
                    ))}
                    <Button
                      type="button"
                      onClick={() =>
                        field.onChange([...(field.value ?? []), ""])
                      }
                      className="mb-4 text-white"
                    >
                      + Add Hint EN
                    </Button>
                  </div>
                )}
              />

              {/* Загрузка одного изображения */}
              <FileUploader
                control={control}
                name="imageFiles"
                label="Choose an Image"
                accept="image/*"
                multiple={false}
                error={errors.imageFiles?.message as string}
              />
            </>
          )}

          {currentType === "choose_correct_image" && (
            <>
              <p className="text-sm text-gray-600">
                При этом типе можно загрузить несколько изображений:
              </p>
              <MultiImageUploader
                control={control}
                name="imageFiles"
                label="Attach Images"
                error={errors.imageFiles?.message as string}
              />
              {/*
                Здесь же можно отобразить список выбранных файлов (preview) 
                или создать динамическую форму для вариантов.
              */}
            </>
          )}

          {currentType === "read_respond" && (
            <>
              <InputGroup
                label="Localized Correct Answer (RU)"
                placeholder="Правильный ответ (RU)"
                name="localizedCorrectAnswerRu"
                type="text"
                control={control}
                error={errors.localizedCorrectAnswerRu?.message}
              />

              <InputGroup
                label="Localized Correct Answer (EN)"
                placeholder="Правильный ответ (EN)"
                name="localizedCorrectAnswerEn"
                type="text"
                control={control}
                error={errors.localizedCorrectAnswerEn?.message}
              />

              <Controller
                control={control}
                name="localizedHintsRu"
                render={({ field }) => (
                  <div>
                    <label className="font-medium">Localized Hints (RU)</label>
                    {field.value?.map((val, index) => (
                      <input
                        key={index}
                        type="text"
                        value={val}
                        onChange={(e) => {
                          const newHints = [...(field.value ?? [])];
                          newHints[index] = e.target.value;
                          field.onChange(newHints);
                        }}
                        className="mb-2 w-full rounded-md border px-3 py-2"
                        placeholder={`Hint #${index + 1}`}
                      />
                    ))}
                    <Button
                      type="button"
                      onClick={() =>
                        field.onChange([...(field.value ?? []), ""])
                      }
                      className="mb-4 text-white"
                    >
                      + Add Hint RU
                    </Button>
                  </div>
                )}
              />

              <Controller
                control={control}
                name="localizedHintsEn"
                render={({ field }) => (
                  <div>
                    <label className="font-medium">Localized Hints (EN)</label>
                    {field.value?.map((val, index) => (
                      <input
                        key={index}
                        type="text"
                        value={val}
                        onChange={(e) => {
                          const newHints = [...(field.value ?? [])];
                          newHints[index] = e.target.value;
                          field.onChange(newHints);
                        }}
                        className="mb-2 w-full rounded-md border px-3 py-2"
                        placeholder={`Hint #${index + 1}`}
                      />
                    ))}
                    <Button
                      type="button"
                      onClick={() =>
                        field.onChange([...(field.value ?? []), ""])
                      }
                      className="mb-4 text-white"
                    >
                      + Add Hint EN
                    </Button>
                  </div>
                )}
              />
            </>
          )}

          {(currentType === "audio" ||
            currentType === "tap_audio" ||
            currentType === "translation_audio") && (
            <>
              <FileUploader
                control={control}
                name="audioFiles"
                label="Choose an Audio"
                accept="audio/*"
                multiple={false}
                error={errors.audioFiles?.message as string}
              />
            </>
          )}

          {currentType === "translation_audio" && (
            <>
              <InputGroup
                label="Localized Correct Answer (RU)"
                placeholder="Правильный ответ (RU)"
                name="localizedCorrectAnswerRu"
                type="text"
                control={control}
                error={errors.localizedCorrectAnswerRu?.message}
              />
              <InputGroup
                label="Localized Correct Answer (EN)"
                placeholder="Правильный ответ (EN)"
                name="localizedCorrectAnswerEn"
                type="text"
                control={control}
                error={errors.localizedCorrectAnswerEn?.message}
              />

              <Controller
                control={control}
                name="localizedHintsRu"
                render={({ field }) => (
                  <div>
                    <label className="font-medium">Localized Hints (RU)</label>
                    {field.value?.map((val, index) => (
                      <input
                        key={index}
                        type="text"
                        value={val}
                        onChange={(e) => {
                          const newHints = [...(field.value ?? [])];
                          newHints[index] = e.target.value;
                          field.onChange(newHints);
                        }}
                        className="mb-2 w-full rounded-md border px-3 py-2"
                        placeholder={`Hint #${index + 1}`}
                      />
                    ))}
                    <Button
                      type="button"
                      onClick={() =>
                        field.onChange([...(field.value ?? []), ""])
                      }
                      className="mb-4 text-white"
                    >
                      + Add Hint RU
                    </Button>
                  </div>
                )}
              />

              <Controller
                control={control}
                name="localizedHintsEn"
                render={({ field }) => (
                  <div>
                    <label className="font-medium">Localized Hints (EN)</label>
                    {field.value?.map((val, index) => (
                      <input
                        key={index}
                        type="text"
                        value={val}
                        onChange={(e) => {
                          const newHints = [...(field.value ?? [])];
                          newHints[index] = e.target.value;
                          field.onChange(newHints);
                        }}
                        className="mb-2 w-full rounded-md border px-3 py-2"
                        placeholder={`Hint #${index + 1}`}
                      />
                    ))}
                    <Button
                      type="button"
                      onClick={() =>
                        field.onChange([...(field.value ?? []), ""])
                      }
                      className="mb-4 text-white"
                    >
                      + Add Hint EN
                    </Button>
                  </div>
                )}
              />
            </>
          )}

          {currentType === "fill_blank" && (
            <>
              <InputGroup
                label="Правильный ответ (RU)"
                placeholder="Введите ответ"
                name="localizedCorrectAnswerRu"
                type="text"
                control={control}
                error={errors.localizedCorrectAnswerRu?.message}
              />
              <FileUploader
                control={control}
                name="imageFiles"
                label="Attach an Image (optional)"
                accept="image/*"
                multiple={false}
                error={errors.imageFiles?.message as string}
              />
            </>
          )}

          <Button
            type="submit"
            className="mt-2 rounded-lg bg-primary px-6 py-2 font-medium text-white hover:bg-primary/90"
          >
            Create Task
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
