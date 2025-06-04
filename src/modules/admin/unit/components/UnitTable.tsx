"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Eye, Pencil, PlusIcon, RotateCcw } from "lucide-react";
import { useCallback, useState } from "react";
import { useAllUnits } from "../hooks/unit.hooks";
import { Unit } from "../types/unit.types";
import { CreateUnitDialog } from "./dialogs/CreateUnitDialog";
import { UnitDetailDialog } from "./dialogs/UnitDetailDialog";
import { UpdateUnitDialog } from "./dialogs/UpdateUnitDialog";

export function UnitTable() {
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const { data: units, isLoading, refetch } = useAllUnits();

  const toggleDetail = useCallback(() => setDetailOpen((p) => !p), []);
  const toggleUpdate = useCallback(() => setUpdateOpen((p) => !p), []);
  const toggleCreate = useCallback(() => setCreateOpen((p) => !p), []);

  return (
    <div className="w-full px-4 py-8 md:px-8">
      <div className="mb-2 flex items-center justify-between">
        <Breadcrumb pageName="Units Management" />

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
            <CreateUnitDialog isOpen={createOpen} toggleOpen={toggleCreate} />
          )}
        </div>
      </div>

      <div className="w-full rounded-xl bg-white p-4 shadow-md dark:bg-gray-dark">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-muted border-b">
                <th className="text-muted-foreground py-3 text-sm font-semibold">
                  ID
                </th>
                <th className="text-muted-foreground py-3 text-sm font-semibold">
                  Title
                </th>
                <th className="text-muted-foreground py-3 text-sm font-semibold">
                  Level ID
                </th>
                <th className="text-muted-foreground py-3 text-end text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={4} className="py-3 text-center">
                    Loading...
                  </td>
                </tr>
              )}

              {units?.map((unit: Unit) => (
                <tr
                  key={unit.id}
                  className="border-muted hover:bg-muted/40 border-b transition last:border-0"
                >
                  <td className="py-3 text-sm font-medium text-dark dark:text-white">
                    {unit.id}
                  </td>

                  <td className="py-3 text-sm font-medium text-dark dark:text-white">
                    {unit.title}
                  </td>

                  <td className="py-3 text-sm font-medium text-dark dark:text-white">
                    {unit.level_id}
                  </td>

                  <td className="py-3">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => {
                          setSelectedUnit(unit);
                          toggleDetail();
                        }}
                        className="text-muted-foreground transition hover:text-primary"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUnit(unit);
                          toggleUpdate();
                        }}
                        className="text-muted-foreground transition hover:text-primary"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    </div>

                    {detailOpen && selectedUnit?.id === unit.id && (
                      <UnitDetailDialog
                        unit={selectedUnit}
                        isOpen={detailOpen}
                        toggleOpen={toggleDetail}
                      />
                    )}

                    {updateOpen && selectedUnit?.id === unit.id && (
                      <UpdateUnitDialog
                        unit={selectedUnit}
                        isOpen={updateOpen}
                        toggleOpen={toggleUpdate}
                      />
                    )}
                  </td>
                </tr>
              ))}

              {!isLoading && units?.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="text-muted-foreground py-3 text-center"
                  >
                    No units found.
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
