"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/core/ui/dialog";
import { Task } from "../../types/task";

type Props = {
  task: Task;
  isOpen: boolean;
  toggleOpen: () => void;
};

const LANGS = ["ru", "en", "kk"];
const BASE_URL = "https://qazaqtil.ip-ddns.com";

export function TaskDetailDialog({ task, isOpen, toggleOpen }: Props) {
  const renderLangFields = (field?: Record<string, string>) =>
    field &&
    LANGS.map((lang) => (
      <p key={lang}>
        <span className="font-medium uppercase">{lang}:</span>{" "}
        {field[lang] || "—"}
      </p>
    ));

  const renderLangListFields = (field?: Record<string, string[]>) =>
    field &&
    LANGS.map((lang) => (
      <div key={lang} className="mt-1">
        <p className="font-medium uppercase">{lang}:</p>
        <ul className="ml-4 list-disc">
          {field[lang]?.length
            ? field[lang].map((hint, i) => <li key={i}>{hint}</li>)
            : "—"}
        </ul>
      </div>
    ));

  const fullImageUrl = task.image_path?.startsWith("http")
    ? task.image_path
    : `${BASE_URL}${task.image_path}`;

  const fullAudioUrl = task.audio_path?.startsWith("http")
    ? task.audio_path
    : `${BASE_URL}${task.audio_path}`;

  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto bg-white dark:bg-gray-dark">
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 text-sm text-dark dark:text-white">
          <div>
            <strong>ID:</strong> {task.id}
          </div>

          <div>
            <strong>Unit ID:</strong> {task.unit_id}
          </div>

          <div>
            <strong>Type:</strong> {task.type.replaceAll("_", " ")}
          </div>

          <div>
            <strong>Created At:</strong>{" "}
            {new Date(task.created_at).toLocaleString()}
          </div>

          {task.question && (
            <div>
              <strong>Question:</strong>
              {renderLangFields(task.question)}
            </div>
          )}

          {task.localized_correct_answer && (
            <div>
              <strong>Localized Correct Answer:</strong>
              {renderLangFields(task.localized_correct_answer)}
            </div>
          )}

          {task.correct_answer && (
            <div>
              <strong>Correct Answer:</strong> {task.correct_answer}
            </div>
          )}

          {task.localized_hints && (
            <div>
              <strong>Localized Hints:</strong>
              {renderLangListFields(task.localized_hints)}
            </div>
          )}

          {task.hints && (
            <div>
              <strong>Hints:</strong>
              <ul className="ml-4 list-disc">
                {task.hints.map((hint, i) => (
                  <li key={i}>{hint}</li>
                ))}
              </ul>
            </div>
          )}

          {task.sentence && (
            <div>
              <strong>Sentence:</strong>
              <div className="mt-1 flex flex-wrap gap-2">
                {task.sentence.map((s, i) => (
                  <span key={i} className="bg-muted rounded px-2 py-1 text-sm">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {task.description && (
            <div>
              <strong>Description:</strong>
              {renderLangFields(task.description)}
            </div>
          )}

          {task.highlighted_word && (
            <div>
              <strong>Highlighted Word:</strong>
              {renderLangFields(task.highlighted_word)}
            </div>
          )}

          {task.image_path && (
            <div>
              <strong>Image:</strong>
              <img
                src={fullImageUrl}
                alt="Task Image"
                className="mt-2 w-40 rounded shadow"
              />
            </div>
          )}

          {task.audio_path && (
            <div>
              <strong>Audio:</strong>
              <audio controls className="mt-2">
                <source src={fullAudioUrl} />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          {task.image_options && (
            <div>
              <strong>Image Options:</strong>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {task.image_options.map((opt) => (
                  <div
                    key={opt.id}
                    className="flex flex-col items-center text-center"
                  >
                    <img
                      src={
                        opt.image.startsWith("http")
                          ? opt.image
                          : `${BASE_URL}${opt.image}`
                      }
                      alt={opt.text["en"]}
                      className="mb-1 w-20 rounded"
                    />
                    {LANGS.map((lang) => (
                      <div key={lang} className="text-xs">
                        <span className="font-medium uppercase">{lang}:</span>{" "}
                        {opt.text?.[lang] || "—"}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
