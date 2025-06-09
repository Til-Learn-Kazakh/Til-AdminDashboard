import "@/css/hideOverlay.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    template: "%s | Til – Платформа для изучения казахского языка",
    default: "Til – Платформа для изучения казахского языка",
  },
  description:
    "Til — современная обучающая платформа для изучения казахского языка. Интерактивные уроки, игровой подход, трекинг прогресса и мощная админ-панель для управления контентом.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <NextTopLoader color="#5750F1" showSpinner={false} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
