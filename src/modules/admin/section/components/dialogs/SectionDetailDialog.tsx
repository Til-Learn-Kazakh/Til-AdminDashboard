import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/core/ui/dialog";
import { memo } from "react";
import { DialogProps } from "../../../../../core/models/dialogs.model";

type Section = {
  id: number;
  name: string;
};

interface SectionDetailDialogProps extends DialogProps {
  section: Section;
}

export const SectionDetailDialog = memo(
  ({ section, isOpen, toggleOpen }: SectionDetailDialogProps) => {
    return (
      <Dialog modal open={isOpen} onOpenChange={toggleOpen}>
        <DialogContent className="bg-white dark:bg-gray-dark">
          <DialogHeader>
            <DialogTitle>Section Details</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-[#fcfdff] p-5 text-sm dark:bg-gray-dark">
            <div>
              <p className="text-slate-400 dark:text-white">ID</p>
              <p className="mt-1 font-medium dark:text-white">{section.id}</p>
            </div>

            <div>
              <p className="text-slate-400 dark:text-white">Section Name</p>
              <p className="mt-1 font-medium dark:text-white">{section.name}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  },
);
