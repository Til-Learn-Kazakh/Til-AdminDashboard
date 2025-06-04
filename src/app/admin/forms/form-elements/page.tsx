import type { Metadata } from "next";

import FormElementsPage from "../../../../modules/admin/components/FormElementsPage";

export const metadata: Metadata = {
  title: "Form Elements",
};

export default function Page() {
  return <FormElementsPage />;
}
