import type { Metadata } from "next";
import UsersPage from "../../../modules/admin/users/pages/UsersPages";

export const metadata: Metadata = {
  title: "Users Page",
};

export default function Page() {
  return <UsersPage />;
}
