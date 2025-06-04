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

// Пример общей схемы (для упрощения здесь всё optional,
// но в реальном проекте можно использовать Discriminated Union)
const schema = z.object({
  unitId: z.string().min(1, { message: "Unit ID is required" }),
  type: z.string().min(1, { message: "Type is required" }),
  questionRu: z.string().min(1, { message: "Question (RU) is required" }),
  questionEn: z.string().min(1, { message: "Question (EN) is required" }),

  // Для загрузки файлов используем FileList или null.
  audioFiles: z.array(z.instanceof(File)).optional(),
  imageFiles: z.any().optional(),

  localizedCorrectAnswerRu: z.string().optional(),
  localizedCorrectAnswerEn: z.string().optional(),
});

// Тип формы
type FormValues = z.infer<typeof schema>;

type Props = {
  isOpen: boolean;
  toggleOpen: () => void;
};

// Пример кастомного компонента для загрузки файла/файлов.
// В реальном проекте можете сделать его более универсальным
// или разделить на ImageUploader / AudioUploader.
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
              // files — это FileList или null
              const files = event.target.files;
              // Вызываем onChange из RHF, чтобы сохранить значение в форму
              // Можно передавать либо сам FileList, либо Array.from(files)
              onChange(files);
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
      imageFiles: [], // Важно! Пустой массив по умолчанию
    },
  });

  const onSubmit = (data: FormValues) => {
    // Здесь data.audioFiles / data.imageFiles — это FileList или null
    // Например, вы можете сделать FormData и отправить файлы на сервер:
    /*
      const formData = new FormData();
      if (data.audioFiles) {
        formData.append('audio', data.audioFiles[0]);
      }
      // или если multiple:
      if (data.imageFiles) {
        Array.from(data.imageFiles).forEach((file, idx) => {
          formData.append(`images[${idx}]`, file);
        });
      }
      // и так далее
    */

    if (data.imageFiles && data.imageFiles.length > 0) {
      // Можно сформировать FormData и загрузить на сервер
      const formData = new FormData();
      data.imageFiles.forEach((file: any, index: any) => {
        formData.append(`imageFiles[${index}]`, file);
      });
      // отправляем formData на бэкенд...
    }
    console.log("Created task:", data);

    toggleOpen();
    reset();
  };

  // Следим за тем, какой тип выбран:
  const currentType = watch("type");

  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <DialogContent className="max-w-xl bg-white dark:bg-gray-dark">
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
