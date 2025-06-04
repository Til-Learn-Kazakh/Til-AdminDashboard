import type { Metadata } from "next";
import LoginPage from "../../../modules/auth/pages/login/LoginPage";

export const metadata: Metadata = {
  title: "Log In",
};

export default function Login() {
  return <LoginPage />;
}
