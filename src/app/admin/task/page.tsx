import type { Metadata } from "next";
import TaskPage from "../../../modules/admin/tasks/page/TaskPage";

export const metadata: Metadata = {
  title: "Task Page",
};

export default function Page() {
  return <TaskPage />;
}
