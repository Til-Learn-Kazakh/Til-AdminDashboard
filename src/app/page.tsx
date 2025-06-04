import { Metadata } from "next";
import { HomePage } from "../modules/landing/pages/HomePage";

export const metadata: Metadata = {
  title: "Главная",
};

export default async function Page() {
  return <HomePage />;
}
