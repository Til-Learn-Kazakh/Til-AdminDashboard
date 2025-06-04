"use client";

import { ThemeToggleSwitch } from "@/components/Layouts/header/theme-toggle";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { ADMIN_PAGES, AUTH_PAGES } from "../../../core/config/pages-url.config";
import { useProfile } from "../../../core/hooks/useProfile";
import { AuthService } from "../../auth/services/auth.service";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: currentUser, isPending: isCurrentUserLoading } = useProfile();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      toast.success("Вы вышли из системы");
      queryClient.resetQueries({ queryKey: ["profile"] });
    },
    onError: () => {
      toast.error("Не удалось выйти из системы");
    },
  });

  const onLogoutClick = () => {
    mutate();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-2 md:py-2.5">
        {/* Логотип */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-dark dark:text-white">
            Qazaq Til
          </span>
        </div>

        {/* Навигация (Desktop) */}
        <nav className="hidden items-center gap-3 text-sm font-medium text-dark dark:text-white xl:flex">
          <Link href="#features" className="hover:text-primary">
            Features
          </Link>
          <Link href="#testimonials" className="hover:text-primary">
            Testimonials
          </Link>
          <Link href="#pricing" className="hover:text-primary">
            Pricing
          </Link>
          <Link href="#faq" className="hover:text-primary">
            FAQ
          </Link>
        </nav>

        {/* Справа: тема + Auth + меню */}
        <div className="flex items-center gap-3">
          <ThemeToggleSwitch />

          {/* Auth (DropDown for authenticated, Link for guests) */}
          {currentUser ? (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="hidden text-sm font-medium text-dark dark:text-white md:inline-block">
                  Admin
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Content
                align="end"
                className="z-50 mt-2 w-40 rounded-md border border-stroke bg-white p-1 shadow-md dark:border-dark-3 dark:bg-dark-2"
              >
                <DropdownMenu.Item asChild>
                  <Link
                    href={ADMIN_PAGES.DASHBOARD}
                    className="block w-full cursor-pointer rounded px-3 py-2 text-sm text-dark hover:bg-gray-100 dark:text-white dark:hover:bg-dark-3"
                  >
                    Admin Panel
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="my-1 h-px bg-stroke dark:bg-dark-3" />
                <DropdownMenu.Item
                  className="cursor-pointer rounded px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                  onClick={() => onLogoutClick()}
                >
                  Logout
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          ) : (
            <Link
              href={AUTH_PAGES.LOGIN}
              className="hidden text-sm font-medium text-dark hover:text-primary dark:text-white md:inline-block"
            >
              Sign In
            </Link>
          )}

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-dark dark:text-white" />
            ) : (
              <Menu className="h-6 w-6 text-dark dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="mt-2 flex flex-col gap-2 px-4 text-sm font-medium text-dark dark:text-white xl:hidden">
          <Link href="#features" onClick={() => setMobileMenuOpen(false)}>
            Features
          </Link>
          <Link href="#testimonials" onClick={() => setMobileMenuOpen(false)}>
            Testimonials
          </Link>
          <Link href="#pricing" onClick={() => setMobileMenuOpen(false)}>
            Pricing
          </Link>
          <Link href="#faq" onClick={() => setMobileMenuOpen(false)}>
            FAQ
          </Link>
          {!currentUser && !isCurrentUserLoading && (
            <Link
              href={AUTH_PAGES.LOGIN}
              onClick={() => setMobileMenuOpen(false)}
              className="text-primary"
            >
              Sign In
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
