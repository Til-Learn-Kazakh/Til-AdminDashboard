import type { Metadata } from "next";
import SettingsPage from "../../../modules/admin/settings/pages/SettingsPage";

export const metadata: Metadata = {
  title: "Settings Page",
};

export default function Settings() {
  return <SettingsPage />;
}
