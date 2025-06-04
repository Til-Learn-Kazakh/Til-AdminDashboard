import Image from "next/image";
import logo1 from "../assets/logos/logo1.png";
import logoqazaqremovebg from "../assets/logos/logoqazaqremovebg.png";

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      {/* Светлый логотип (по умолчанию) */}
      <Image
        src={logoqazaqremovebg}
        alt="Qazaq til logo"
        width={80}
        height={80}
        className="dark:hidden"
        priority
      />

      {/* Тёмный логотип (для dark mode) */}
      <Image
        src={logo1}
        alt="Qazaq til logo dark"
        width={40}
        height={40}
        className="hidden dark:block"
        priority
      />

      <div className="flex flex-col leading-tight">
        <span className="text-lg font-semibold text-[#0F172A] dark:text-white">
          qazaq til
        </span>
        <span className="text-xs text-slate-500">qazaqsha onai</span>
      </div>
    </div>
  );
}
