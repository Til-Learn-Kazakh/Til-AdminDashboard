"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Eye, Pencil, PlusIcon, RotateCcw } from "lucide-react";
import { useCallback, useState } from "react";
import { useLevels } from "../hooks/section.hooks";
import { CreateSectionDialog } from "./dialogs/CreateSectionDialog";
import { SectionDetailDialog } from "./dialogs/SectionDetailDialog";
import { UpdateSectionDialog } from "./dialogs/UpdateSectionDialog";

type Section = {
  id: number;
  name: string;
};

export function SectionTable() {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const { data: levels, isLoading, refetch } = useLevels();

  const toggleDetailsModal = useCallback(() => {
    setDetailsModalOpen((prev) => !prev);
  }, []);

  const toggleUpdateModal = useCallback(() => {
    setUpdateModalOpen((prev) => !prev);
  }, []);

  const toggleCreateModal = useCallback(() => {
    setCreateModalOpen((prev) => !prev);
  }, []);

  return (
    <div className="w-full px-4 py-8 md:px-8">
      <div className="mb-2 flex items-center justify-between">
        <Breadcrumb pageName="Sections Management" />

        <div className="mb-4 flex items-center gap-2">
          <button
            onClick={() => refetch()}
            className="border-muted-foreground hover:bg-muted/60 rounded-md border p-2 dark:border-dark-3 dark:hover:bg-dark-3"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <button
            onClick={toggleCreateModal}
            className="flex items-center gap-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
          >
            <PlusIcon className="h-4 w-4" />
            Create
          </button>
          {createModalOpen && (
            <CreateSectionDialog
              isOpen={createModalOpen}
              toggleOpen={toggleCreateModal}
            />
          )}
        </div>
      </div>

      <div className="w-full rounded-xl bg-white p-4 shadow-md dark:bg-gray-dark">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-muted border-b">
                <th className="text-muted-foreground py-3 text-sm font-semibold">
                  Name
                </th>
                <th className="text-muted-foreground py-3 text-end text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={2} className="py-3 text-center">
                    Loading...
                  </td>
                </tr>
              )}

              {levels?.map((section) => (
                <tr
                  key={section.id}
                  className="border-muted hover:bg-muted/40 border-b transition last:border-0"
                >
                  <td className="py-3 text-sm font-medium text-dark dark:text-white">
                    {section.name}
                  </td>

                  <td className="py-3">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => {
                          setSelectedSection(section);
                          toggleDetailsModal();
                        }}
                        className="text-muted-foreground transition hover:text-primary"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedSection(section);
                          toggleUpdateModal();
                        }}
                        className="text-muted-foreground transition hover:text-primary"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>

                      {detailsModalOpen &&
                        selectedSection?.id === section.id && (
                          <SectionDetailDialog
                            section={selectedSection}
                            isOpen={detailsModalOpen}
                            toggleOpen={toggleDetailsModal}
                          />
                        )}

                      {updateModalOpen &&
                        selectedSection?.id === section.id && (
                          <UpdateSectionDialog
                            section={selectedSection}
                            isOpen={updateModalOpen}
                            toggleOpen={toggleUpdateModal}
                          />
                        )}
                    </div>
                  </td>
                </tr>
              ))}

              {!isLoading && levels?.length === 0 && (
                <tr>
                  <td
                    colSpan={2}
                    className="text-muted-foreground py-3 text-center"
                  >
                    No sections found.
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
