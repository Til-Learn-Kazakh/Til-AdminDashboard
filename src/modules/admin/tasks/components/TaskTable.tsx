"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import dayjs from "dayjs";
import { Eye, Pencil, PlusIcon, RotateCcw } from "lucide-react";
import { useCallback, useState } from "react";
import { useAllTasks } from "../hooks/tasks.hooks";
import { Task } from "../types/task";
import { CreateTaskDialog } from "./dialogs/CreateTaskDialog";
import { TaskDetailDialog } from "./dialogs/TaskDetailDialog";
import { UpdateTaskDialog } from "./dialogs/UpdateTaskDialog";

export function TaskTable() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const { data: tasks, isLoading, refetch } = useAllTasks();

  const toggleDetail = useCallback(() => setDetailOpen((p) => !p), []);
  const toggleUpdate = useCallback(() => setUpdateOpen((p) => !p), []);
  const toggleCreate = useCallback(() => setCreateOpen((p) => !p), []);

  return (
    <div className="w-full px-4 py-8 md:px-8">
      <div className="mb-2 flex items-center justify-between">
        <Breadcrumb pageName="Tasks Management" />

        <div className="mb-4 flex items-center gap-2">
          <button
            onClick={() => refetch()}
            className="border-muted-foreground hover:bg-muted/60 rounded-md border p-2 dark:border-dark-3 dark:hover:bg-dark-3"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <button
            onClick={toggleCreate}
            className="flex items-center gap-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
          >
            <PlusIcon className="h-4 w-4" />
            Create
          </button>

          {createOpen && (
            <CreateTaskDialog isOpen={createOpen} toggleOpen={toggleCreate} />
          )}
        </div>
      </div>

      <div className="mt-4 w-full rounded-xl bg-white p-4 shadow-md dark:bg-gray-dark">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead>
              <tr className="border-muted text-muted-foreground border-b text-sm font-semibold">
                <th className="min-w-[240px] py-3">ID</th>
                <th className="min-w-[240px] py-3">Unit ID</th>
                <th className="min-w-[160px] py-3">Type</th>
                <th className="min-w-[160px] py-3">Created At</th>
                <th className="min-w-[80px] py-3 text-end">Actions</th>
              </tr>
            </thead>

            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={5} className="py-3 text-center">
                    Loading...
                  </td>
                </tr>
              )}

              {tasks?.map((task) => (
                <tr
                  key={task.id}
                  className="border-muted hover:bg-muted/40 border-b text-sm transition last:border-0"
                >
                  <td className="whitespace-nowrap py-3 text-dark dark:text-white">
                    {task.id}
                  </td>
                  <td className="whitespace-nowrap py-3 text-dark dark:text-white">
                    {task.unit_id}
                  </td>
                  <td className="py-3 capitalize text-dark dark:text-white">
                    {task.type.replaceAll("_", " ")}
                  </td>
                  <td className="whitespace-nowrap py-3 text-dark dark:text-white">
                    {dayjs(task.created_at).format("YYYY-MM-DD")}
                  </td>
                  <td className="py-3">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => {
                          setSelectedTask(task);
                          toggleDetail();
                        }}
                        className="text-muted-foreground transition hover:text-primary"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedTask(task);
                          toggleUpdate();
                        }}
                        className="text-muted-foreground transition hover:text-primary"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    </div>

                    {detailOpen && selectedTask?.id === task.id && (
                      <TaskDetailDialog
                        task={selectedTask}
                        isOpen={detailOpen}
                        toggleOpen={toggleDetail}
                      />
                    )}

                    {updateOpen && selectedTask?.id === task.id && (
                      <UpdateTaskDialog
                        task={selectedTask}
                        isOpen={updateOpen}
                        toggleOpen={toggleUpdate}
                      />
                    )}
                  </td>
                </tr>
              ))}

              {!isLoading && tasks?.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-muted-foreground py-3 text-center"
                  >
                    No tasks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
