"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
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
import { Task } from "../../types/task";

// То же самое, что и в Create, но можно доработать/изменить
const taskTypes = [
  { label: "Translation Word", value: "translation_word" },
  { label: "Translation Audio", value: "translation_audio" },
  { label: "Audio", value: "audio" },
  { label: "Tap Audio", value: "tap_audio" },
  { label: "Choose Correct Image", value: "choose_correct_image" },
  { label: "Fill Blank", value: "fill_blank" },
  { label: "Read & Respond", value: "read_respond" },
];

// Пример схемы (можно использовать ту же, что и в CreateTaskDialog)
const schema = z.object({
  unitId: z.string().min(1, { message: "Unit ID is required" }),
  type: z.string().min(1, { message: "Type is required" }),
  questionRu: z.string().min(1, { message: "Question (RU) is required" }),
  questionEn: z.string().min(1, { message: "Question (EN) is required" }),

  // Доп. поля
  localizedCorrectAnswerRu: z.string().optional(),
  localizedCorrectAnswerEn: z.string().optional(),
  correctAnswer: z.string().optional(),
  hints: z.string().optional(),

  // Простейший вариант для image/audio (одно значение)
  imagePath: z.string().optional(),
  audioPath: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

type UpdateTaskDialogProps = {
  isOpen: boolean;
  toggleOpen: () => void;
  task: Task; // Ваш тип задачи
};

export function UpdateTaskDialog({
  isOpen,
  toggleOpen,
  task,
}: UpdateTaskDialogProps) {
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    // Здесь заполняем поля исходя из текущего task
    defaultValues: {
      unitId: task.unit_id,
      type: task.type,
      questionRu: task.question?.ru ?? "",
      questionEn: task.question?.en ?? "",
      // Для переводов, если это translation_word / translation_audio
      localizedCorrectAnswerRu: task.localized_correct_answer?.ru ?? "",
      localizedCorrectAnswerEn: task.localized_correct_answer?.en ?? "",
      correctAnswer: task.correct_answer ?? "",

      // hints в виде массива строк — упрощённо можно склеить в одну строку
      // или сделать отдельные поля
      hints: task.hints ? task.hints.join(", ") : "",
      imagePath: task.image_path ?? "",
      audioPath: task.audio_path ?? "",
    },
  });

  // Слежка за полем "type", чтобы динамически отрисовывать нужные поля
  const currentType = watch("type");

  // Закрываем диалог -> сбрасываем форму, чтобы при новом открытии
  // данные были чистые или соответствовали новому `task`
  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = (data: FormValues) => {
    // Ваша логика обновления
    // Например, отправка PUT-запроса на сервер
    console.log("Updated task data:", data);

    // Закрываем диалог
    toggleOpen();
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <DialogContent className="max-w-xl bg-white dark:bg-gray-dark">
        <DialogHeader>
          <DialogTitle>Update Task</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 flex flex-col gap-5"
        >
          {/* Unit ID */}
          <InputGroup
            label="Unit ID"
            placeholder="Enter unit ID"
            name="unitId"
            type="text"
            control={control}
            error={errors.unitId?.message}
          />

          {/* Тип задания */}
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
            <p className="text-sm text-red-500">{errors.type.message}</p>
          )}

          {/* Основные поля (вопрос на RU/EN) */}
          <InputGroup
            label="Question (RU)"
            placeholder="Введите вопрос (RU)"
            name="questionRu"
            type="text"
            control={control}
            error={errors.questionRu?.message}
          />
          <InputGroup
            label="Question (EN)"
            placeholder="Enter question (EN)"
            name="questionEn"
            type="text"
            control={control}
            error={errors.questionEn?.message}
          />

          {/* Доп. поля для конкретных типов */}
          {currentType === "translation_word" && (
            <>
              <InputGroup
                label="Localized Correct Answer (RU)"
                placeholder="Введите ответ (RU)"
                name="localizedCorrectAnswerRu"
                type="text"
                control={control}
                error={errors.localizedCorrectAnswerRu?.message}
              />
              <InputGroup
                label="Localized Correct Answer (EN)"
                placeholder="Enter answer (EN)"
                name="localizedCorrectAnswerEn"
                type="text"
                control={control}
                error={errors.localizedCorrectAnswerEn?.message}
              />
              <InputGroup
                label="Image Path (URL)"
                placeholder="Например: https://..."
                name="imagePath"
                type="text"
                control={control}
                error={errors.imagePath?.message}
              />
            </>
          )}

          {currentType === "fill_blank" && (
            <>
              <InputGroup
                label="Correct Answer"
                placeholder="Введите правильный ответ"
                name="correctAnswer"
                type="text"
                control={control}
                error={errors.correctAnswer?.message}
              />
              <InputGroup
                label="Hints (comma-separated)"
                placeholder="Например: Алия, Сау бол, қайырлы таң"
                name="hints"
                type="text"
                control={control}
                error={errors.hints?.message}
              />
              <InputGroup
                label="Image Path (URL)"
                placeholder="Например: https://..."
                name="imagePath"
                type="text"
                control={control}
                error={errors.imagePath?.message}
              />
            </>
          )}

          {currentType === "choose_correct_image" && (
            <>
              <InputGroup
                label="Image Path (maybe main image, optional)"
                placeholder="Например: https://..."
                name="imagePath"
                type="text"
                control={control}
                error={errors.imagePath?.message}
              />
              {/* Здесь же можно вывести форму для image_options, если нужно */}
            </>
          )}

          {currentType === "audio" && (
            <>
              <InputGroup
                label="Audio Path"
                placeholder="Например: /audio/file.mp3 или https://..."
                name="audioPath"
                type="text"
                control={control}
                error={errors.audioPath?.message}
              />
              <InputGroup
                label="Correct Answer"
                placeholder="Что слышим?"
                name="correctAnswer"
                type="text"
                control={control}
                error={errors.correctAnswer?.message}
              />
              <InputGroup
                label="Hints (comma-separated)"
                placeholder="Например: Сәлеметсіз бе?, Сау бол!, Қайырлы таң!"
                name="hints"
                type="text"
                control={control}
                error={errors.hints?.message}
              />
            </>
          )}

          {currentType === "translation_audio" && (
            <>
              <InputGroup
                label="Audio Path"
                placeholder="Например: /audio/file.mp3"
                name="audioPath"
                type="text"
                control={control}
                error={errors.audioPath?.message}
              />
              <InputGroup
                label="Localized Correct Answer (RU)"
                placeholder="Введите ответ (RU)"
                name="localizedCorrectAnswerRu"
                type="text"
                control={control}
                error={errors.localizedCorrectAnswerRu?.message}
              />
              <InputGroup
                label="Localized Correct Answer (EN)"
                placeholder="Enter answer (EN)"
                name="localizedCorrectAnswerEn"
                type="text"
                control={control}
                error={errors.localizedCorrectAnswerEn?.message}
              />
            </>
          )}

          {currentType === "read_respond" && (
            <>
              <InputGroup
                label="Localized Correct Answer (RU)"
                placeholder="Введите ответ (RU)"
                name="localizedCorrectAnswerRu"
                type="text"
                control={control}
                error={errors.localizedCorrectAnswerRu?.message}
              />
              <InputGroup
                label="Localized Correct Answer (EN)"
                placeholder="Enter answer (EN)"
                name="localizedCorrectAnswerEn"
                type="text"
                control={control}
                error={errors.localizedCorrectAnswerEn?.message}
              />
            </>
          )}

          <Button
            type="submit"
            className="mt-4 rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
          >
            Update Task
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
