import {
  LayoutDashboard,
  LayoutList,
  LibraryBig,
  ListTodo,
  Settings,
  User,
  UsersIcon,
} from "lucide-react";
import { ADMIN_PAGES, PRIMARY_PAGES } from "./pages-url.config";

export interface IMenuItem {
  link: (slug?: number | string) => string;
  name: string;
  icon?: typeof User;
  children?: IMenuItem[];
}

// Admin Sidebar Menu

export const ADMIN_MENU: IMenuItem[] = [
  {
    icon: LayoutDashboard,
    link: () => ADMIN_PAGES.DASHBOARD,
    name: "Dashboard",
  },
  {
    icon: LibraryBig, // Для Section — макет, структура
    link: () => ADMIN_PAGES.SECTION,
    name: "Section",
  },
  {
    icon: LayoutList, // Для Unit — список задач, шагов
    link: () => ADMIN_PAGES.UNIT,
    name: "Unit",
  },
  {
    icon: ListTodo, // Для Task — задачи
    link: () => ADMIN_PAGES.TASK,
    name: "Task",
  },

  {
    icon: Settings,
    link: () => ADMIN_PAGES.SETTINGS,
    name: "Settings",
  },
  {
    icon: UsersIcon,
    link: () => ADMIN_PAGES.USERS,
    name: "Users",
  },
];

// Optional: Primary (public) Menu

export const PRIMARY_MENU: IMenuItem[] = [
  {
    icon: LayoutDashboard,
    link: () => PRIMARY_PAGES.HOME,
    name: "Home",
  },
];
