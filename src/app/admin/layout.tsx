// src/app/admin/layout.tsx
import { Header } from "@/components/Layouts/header";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { AdminSidebar } from "../../modules/admin/components/AdminSidebar";
import { AdminProviders } from "./providers";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AdminProviders>
        <NextTopLoader color="#5750F1" showSpinner={false} />

        <div className="flex min-h-screen">
          <AdminSidebar />

          <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
            <Header />
            <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
              {children}
            </main>
          </div>
        </div>
      </AdminProviders>
    </>
  );
}
