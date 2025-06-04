import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";

type MultiImageUploaderProps<T extends FieldValues> = {
  control: Control<T>;
  name: string;
  label: string;
  error?: string;
};

export function MultiImageUploader<T extends FieldValues>({
  control,
  name,
  label,
  error,
}: MultiImageUploaderProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium">{label}</label>
      <Controller
        control={control}
        name={name as any}
        render={({ field: { value, onChange } }) => {
          // value здесь – это массив File[] или undefined
          const files: File[] = value || [];

          // Функция для добавления новых файлов
          const handleAddFiles = (
            event: React.ChangeEvent<HTMLInputElement>,
          ) => {
            if (!event.target.files) return;
            // Массив новых файлов
            const newFiles = Array.from(event.target.files);
            // Мерджим с уже загруженными
            const updatedFiles = [...files, ...newFiles];
            onChange(updatedFiles);
          };

          // Удаление файла по индексу
          const handleRemoveFile = (index: number) => {
            const updatedFiles = files.filter((_, i) => i !== index);
            onChange(updatedFiles);
          };

          return (
            <>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleAddFiles}
              />
              {/* Список загруженных файлов */}
              <div className="mt-2 flex flex-row flex-wrap gap-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 rounded border p-1"
                  >
                    <span className="text-sm">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="text-red-500"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </>
          );
        }}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
