import type { Metadata } from "next";
import SectionPage from "../../../modules/admin/section/pages/SectionPage";

export const metadata: Metadata = {
  title: "Section Page",
};

export default function Page() {
  return <SectionPage />;
}
