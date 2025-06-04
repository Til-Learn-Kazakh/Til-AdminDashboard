"use client";

import { SidebarProvider } from "@/components/Layouts/sidebar/sidebar-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import { Toaster } from "sonner";
import { queryClientConfig } from "../../core/config/query-client.config";

export function AdminProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));

  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          {children}
          <Toaster
            position="top-center"
            duration={3000}
            expand={true}
            richColors
          />
        </SidebarProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
{
  /* <ThemeProvider defaultTheme="light" attribute="class"> */
}
