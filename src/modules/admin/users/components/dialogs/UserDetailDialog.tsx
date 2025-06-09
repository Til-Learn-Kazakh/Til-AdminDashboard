"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/core/ui/dialog";
import dayjs from "dayjs";
import { memo } from "react";

type User = {
  id: string;
  firstname: string;
  email: string;
  xp: number;
  crystals: number;
  createdAt: string;
};

type DialogProps = {
  isOpen: boolean;
  toggleOpen: () => void;
  user: User;
};

export const UserDetailDialog = memo(
  ({ isOpen, toggleOpen, user }: DialogProps) => {
    return (
      <Dialog open={isOpen} onOpenChange={toggleOpen}>
        <DialogContent className="bg-white dark:bg-gray-dark">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>

          <div className="mt-4 flex flex-col gap-4 rounded-lg border border-slate-200 bg-[#fcfdff] p-5 text-sm dark:border-dark-3 dark:bg-dark-2">
            <div>
              <p className="text-muted-foreground">#ID</p>
              <p className="mt-1 font-medium">{user.id}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Firstname</p>
              <p className="mt-1 font-medium">{user.firstname}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Email</p>
              <p className="mt-1 font-medium">{user.email}</p>
            </div>

            <div className="flex gap-5">
              <div>
                <p className="text-muted-foreground">XP</p>
                <p className="mt-1 font-medium">{user.xp}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Crystal</p>
                <p className="mt-1 font-medium">{user.crystals}</p>
              </div>
            </div>

            <div>
              <p className="text-muted-foreground">Created At</p>
              <p className="mt-1 font-medium">
                {dayjs(user.createdAt).format("MMM DD, YYYY")}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  },
);

UserDetailDialog.displayName = "UserDetailDialog";
