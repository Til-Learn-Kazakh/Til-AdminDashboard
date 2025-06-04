"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/core/ui/dialog";
import { Unit } from "../../types/unit.types";

type DialogProps = {
  isOpen: boolean;
  toggleOpen: () => void;
};

interface UnitDetailDialogProps extends DialogProps {
  unit: Unit;
}

export function UnitDetailDialog({
  unit,
  isOpen,
  toggleOpen,
}: UnitDetailDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <DialogContent className="bg-white dark:bg-gray-dark">
        <DialogHeader>
          <DialogTitle>Unit Details</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-[#fcfdff] p-5 text-sm dark:border-dark-3 dark:bg-dark">
          <div>
            <p className="text-slate-400 dark:text-white">ID</p>
            <p className="mt-1 font-medium">{unit.id}</p>
          </div>

          <div>
            <p className="text-slate-400 dark:text-white">Title</p>
            <p className="mt-1 font-medium">{unit.title}</p>
          </div>

          <div>
            <p className="text-slate-400 dark:text-white">Level ID</p>
            <p className="mt-1 font-medium">{unit.level_id}</p>
          </div>

          <div>
            <p className="text-slate-400 dark:text-white">Descriptions</p>
            <div className="mt-1 flex flex-col gap-1 font-medium">
              <p>EN: {unit.descriptions.en}</p>
              <p>RU: {unit.descriptions.ru}</p>
              <p>KZ: {unit.descriptions.kk}</p>
            </div>
          </div>

          <div>
            <p className="text-slate-400 dark:text-white">Tasks count</p>
            <p className="mt-1 font-medium">{unit.tasks?.length ?? 0}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
