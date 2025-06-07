"use client";

import dayjs from "dayjs";
import { Eye } from "lucide-react";
import { useCallback, useState } from "react";
import Breadcrumb from "../../../../components/Breadcrumbs/Breadcrumb";
import { useAllUsers } from "../hooks/users.hooks";
import { User } from "../services/users.service";
import { UserDetailDialog } from "./dialogs/UserDetailDialog";

export function UsersTable() {
  const { data: users, isLoading } = useAllUsers();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const toggleDetail = useCallback(() => setDetailOpen((p) => !p), []);
  console.log("Users", users);

  return (
    <div className="w-full px-4 py-8 md:px-8">
      <div className="mb-2 flex items-center justify-between">
        <Breadcrumb pageName="Users Management" />
      </div>

      <div className="w-full rounded-xl bg-white p-4 shadow-md dark:bg-gray-dark">
        <div className="overflow-x-auto">
          {isLoading ? (
            <p className="p-4">Loading...</p>
          ) : (
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
                    Created Date
                  </th>
                  <th className="text-muted-foreground py-3 text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user: any) => (
                  <tr
                    key={user.id}
                    className="border-muted hover:bg-muted/40 border-b transition last:border-0"
                  >
                    <td className="py-3 text-sm font-medium text-dark dark:text-white">
                      {user.id}
                    </td>
                    <td className="py-3 text-sm font-medium text-dark dark:text-white">
                      {user.first_name}
                    </td>
                    <td className="py-3 text-sm font-medium text-dark dark:text-white">
                      {user.email}
                    </td>
                    <td className="py-3 text-sm font-medium text-dark dark:text-white">
                      {user.xp}
                    </td>
                    <td className="py-3 text-sm font-medium text-dark dark:text-white">
                      {user.crystals}
                    </td>
                    <td className="py-3 text-sm font-medium text-dark dark:text-white">
                      {dayjs(user.created_at).format("MMM DD, YYYY")}
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
          )}
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
