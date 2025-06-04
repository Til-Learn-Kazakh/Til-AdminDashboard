"use client";

import { ChevronUpIcon } from "@/assets/icons";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import { cn } from "@/core/lib/utils";
import Link from "next/link";
import { useState } from "react";
import {
  ADMIN_PAGES,
  PRIMARY_PAGES,
} from "../../../../core/config/pages-url.config";
import { LogOutIcon, SettingsIcon } from "./icons";

export function UserInfo() {
  const [isOpen, setIsOpen] = useState(false);

  const USER = {
    firstName: "Bolatbek",
    lastName: "Ermekov",
    email: "ermekbolatbek21@gmail.com",
    img: "",
  };
  const initials = USER.firstName?.charAt(0).toUpperCase() || "U";

  return (
    <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
      <DropdownTrigger className="rounded align-middle outline-none ring-primary ring-offset-2 focus-visible:ring-1 dark:ring-offset-gray-dark">
        <span className="sr-only">My Account</span>

        <figure className="flex items-center gap-3">
          {USER.img ? (
            <img
              src={USER.img}
              className="size-12 rounded-full object-cover"
              alt={`Avatar of ${USER.firstName}`}
            />
          ) : (
            <div className="flex size-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-white">
              {initials}
            </div>
          )}

          <figcaption className="flex items-center gap-1 font-medium text-dark dark:text-dark-6 max-[1024px]:sr-only">
            <span>{USER.firstName + " " + USER.lastName}</span>

            <ChevronUpIcon
              aria-hidden
              className={cn(
                "rotate-180 transition-transform",
                isOpen && "rotate-0",
              )}
              strokeWidth={1.5}
            />
          </figcaption>
        </figure>
      </DropdownTrigger>

      <DropdownContent
        className="border border-stroke bg-white shadow-md dark:border-dark-3 dark:bg-gray-dark min-[230px]:min-w-[17.5rem]"
        align="end"
      >
        <h2 className="sr-only">User information</h2>

        <figure className="flex items-center gap-2.5 px-5 py-3.5">
          {USER.img ? (
            <img
              src={USER.img}
              className="size-12 rounded-full object-cover"
              alt={`Avatar for ${USER.firstName}`}
            />
          ) : (
            <div className="flex size-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-white">
              {initials}
            </div>
          )}

          <figcaption className="space-y-1 text-base font-medium">
            <div className="mb-2 leading-none text-dark dark:text-white">
              {USER.firstName + " " + USER.lastName}
            </div>

            <div className="max-w-[200px] truncate leading-none text-gray-6">
              {USER.email}
            </div>
          </figcaption>
        </figure>

        <hr className="border-[#E8E8E8] dark:border-dark-3" />

        <div className="p-2 text-base text-[#4B5563] dark:text-dark-6 [&>*]:cursor-pointer">
          <Link
            href={ADMIN_PAGES.SETTINGS}
            onClick={() => setIsOpen(false)}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-gray-2 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white"
          >
            <SettingsIcon />
            <span className="mr-auto text-base font-medium">
              Account Settings
            </span>
          </Link>
        </div>

        <hr className="border-[#E8E8E8] dark:border-dark-3" />

        <div className="p-2 text-base text-[#4B5563] dark:text-dark-6">
          <Link
            href={PRIMARY_PAGES.HOME}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-gray-2 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <LogOutIcon />
            <span className="text-base font-medium">Log out</span>
          </Link>
        </div>
      </DropdownContent>
    </Dropdown>
  );
}
