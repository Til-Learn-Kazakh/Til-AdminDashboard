import Image from "next/image";
import til from "../assets/logos/til.jpg";

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      {/* Светлый логотип (по умолчанию) */}
      <Image
        src={til}
        alt="Qazaq til logo"
        width={60}
        height={60}
        className="dark:hidden"
        priority
      />

      {/* Тёмный логотип (для dark mode) */}
      <Image
        src={til}
        alt="Qazaq til logo dark"
        width={60}
        height={60}
        className="hidden dark:block"
        priority
      />

      <div className="flex flex-col leading-tight">
        <span className="text-lg font-semibold text-[#0F172A] dark:text-white">
          Til
        </span>
        <span className="text-xs text-slate-500">qazaqsha onai</span>
      </div>
    </div>
  );
}
