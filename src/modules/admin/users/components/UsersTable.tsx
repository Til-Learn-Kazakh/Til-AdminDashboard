"use client";

import dayjs from "dayjs";
import { Eye } from "lucide-react";
import { useCallback, useState } from "react";
import Breadcrumb from "../../../../components/Breadcrumbs/Breadcrumb";
import { UserDetailDialog } from "./dialogs/UserDetailDialog";

type User = {
  id: string;
  firstname: string;
  email: string;
  xp: number;
  crystal: number;
  role: "user" | "admin";
  createdAt: string;
};

const users: User[] = [
  {
    id: "67a1cdaa3cc8487f0e07bc25",
    firstname: "Ayan",
    email: "ayan@example.com",
    xp: 1500,
    crystal: 200,
    role: "user",
    createdAt: "2024-10-12T09:20:00Z",
  },
  {
    id: "83e2faab4bc9477c1a91de13",
    firstname: "Dana",
    email: "dana@example.com",
    xp: 2300,
    crystal: 150,
    role: "admin",
    createdAt: "2024-09-18T14:45:00Z",
  },
];

export function UsersTable() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const toggleDetail = useCallback(() => setDetailOpen((p) => !p), []);

  return (
    <div className="w-full px-4 py-8 md:px-8">
      <div className="mb-2 flex items-center justify-between">
        <Breadcrumb pageName="Users Management" />
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
                  Firstname
                </th>
                <th className="text-muted-foreground py-3 text-sm font-semibold">
                  Email
                </th>
                <th className="text-muted-foreground py-3 text-sm font-semibold">
                  XP
                </th>
                <th className="text-muted-foreground py-3 text-sm font-semibold">
                  Crystal
                </th>
                <th className="text-muted-foreground py-3 text-sm font-semibold">
                  Role
                </th>
                <th className="text-muted-foreground py-3 text-sm font-semibold">
                  Created Date
                </th>
                <th className="text-muted-foreground py-3 text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-muted hover:bg-muted/40 border-b transition last:border-0"
                >
                  <td className="py-3 text-sm font-medium text-dark dark:text-white">
                    {user.id}
                  </td>
                  <td className="py-3 text-sm font-medium text-dark dark:text-white">
                    {user.firstname}
                  </td>
                  <td className="py-3 text-sm font-medium text-dark dark:text-white">
                    {user.email}
                  </td>
                  <td className="py-3 text-sm font-medium text-dark dark:text-white">
                    {user.xp}
                  </td>
                  <td className="py-3 text-sm font-medium text-dark dark:text-white">
                    {user.crystal}
                  </td>
                  <td className="py-3 text-sm font-medium text-dark dark:text-white">
                    {user.role}
                  </td>
                  <td className="py-3 text-sm font-medium text-dark dark:text-white">
                    {dayjs(user.createdAt).format("MMM DD, YYYY")}
                  </td>
                  <td className="py-3 text-center">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        toggleDetail();
                      }}
                      className="text-muted-foreground transition hover:text-primary"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {detailOpen && selectedUser && (
        <UserDetailDialog
          user={selectedUser}
          isOpen={detailOpen}
          toggleOpen={toggleDetail}
        />
      )}
    </div>
  );
}
