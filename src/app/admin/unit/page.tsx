import type { Metadata } from "next";
import UnitPage from "../../../modules/admin/unit/pages/UnitPage";

export const metadata: Metadata = {
  title: "Unit Page",
};

export default function Page() {
  return <UnitPage />;
}
