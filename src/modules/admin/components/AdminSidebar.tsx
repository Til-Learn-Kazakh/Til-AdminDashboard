"use client";

import { ArrowLeftIcon, ChevronUp } from "@/components/Layouts/sidebar/icons"
import { MenuItem } from "@/components/Layouts/sidebar/menu-item"
import { useSidebarContext } from "@/components/Layouts/sidebar/sidebar-context"
import { Logo } from "@/components/logo"
import { cn } from "@/core/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { ADMIN_MENU } from "../../../core/config/menu.config"
import { PRIMARY_PAGES } from "../../../core/config/pages-url.config"

export function AdminSidebar() {
  const pathname = usePathname();
  const { setIsOpen, isOpen, isMobile, toggleSidebar } = useSidebarContext();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (name: string) => {
    setExpandedItems((prev) => (prev.includes(name) ? [] : [name]));
  };

  useEffect(() => {
    ADMIN_MENU.forEach((item: any) => {
      if (item.children?.some((child: any) => child.link() === pathname)) {
        if (!expandedItems.includes(item.name)) {
          toggleExpanded(item.name);
        }
      }
    });
  }, [pathname]);

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isMobile]);

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "max-w-[290px] w-[290px] overflow-hidden border-r border-gray-200 bg-white transition-all duration-200 ease-linear dark:border-gray-800 dark:bg-gray-dark",
          isMobile ? "fixed bottom-0 top-0 z-50" : "sticky top-0 h-screen",
          isOpen ? "w-full" : "w-0",
        )}
        aria-label="Main navigation"
        aria-hidden={!isOpen}
        // inert={!isOpen}
      >
        <div className="flex h-full flex-col py-10 pl-[25px] pr-[7px]">
          <div className="relative pr-4.5">
            <Link
              href={PRIMARY_PAGES.HOME}
              onClick={() => isMobile && toggleSidebar()}
              className="px-0 py-2.5 min-[850px]:py-0"
            >
              <Logo />
            </Link>

            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="absolute left-3/4 right-4.5 top-1/2 -translate-y-1/2 text-right"
              >
                <span className="sr-only">Close Menu</span>
                <ArrowLeftIcon className="ml-auto size-7" />
              </button>
            )}
          </div>

          <div className="custom-scrollbar mt-6 flex-1 overflow-y-auto pr-3 min-[850px]:mt-10">
            <nav role="navigation" aria-label="Admin Navigation">
              <ul className="space-y-2">
                {ADMIN_MENU.map((item: any) => (
                  <li key={item.name}>
                    {item.children ? (
                      <div>
                        <MenuItem
                          isActive={item.children.some(
                            (child: any) => pathname === child.link(),
                          )}
                          onClick={() => toggleExpanded(item.name)}
                        >
                          <item.icon
                            className="size-6 shrink-0"
                            aria-hidden="true"
                          />
                          <span>{item.name}</span>
                          <ChevronUp
                            className={cn(
                              "ml-auto rotate-180 transition-transform duration-200",
                              expandedItems.includes(item.name) && "rotate-0",
                            )}
                            aria-hidden="true"
                          />
                        </MenuItem>

                        {expandedItems.includes(item.name) && (
                          <ul
                            className="ml-9 space-y-1.5 pb-[15px] pt-2"
                            role="menu"
                          >
                            {item.children.map((sub: any) => (
                              <li key={sub.name} role="none">
                                <MenuItem
                                  as="link"
                                  href={sub.link()}
                                  isActive={pathname === sub.link()}
                                >
                                  <span>{sub.name}</span>
                                </MenuItem>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <MenuItem
                        className="flex items-center gap-3 py-3"
                        as="link"
                        href={item.link()}
                        isActive={pathname === item.link()}
                      >
                        <item.icon
                          className="size-6 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{item.name}</span>
                      </MenuItem>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
}
