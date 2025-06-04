import Breadcrumb from "../../../../components/Breadcrumbs/Breadcrumb";
import { SettingsForm } from "../components/SettingsForm";

export default function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-[1080px]">
      <Breadcrumb pageName="Settings" />

      <div className="grid grid-cols-1 justify-center">
        <div className="w-full max-w-6xl">
          <SettingsForm />
        </div>
      </div>
    </div>
  );
}
