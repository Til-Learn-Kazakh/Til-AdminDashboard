import type { Metadata } from "next";
import SignupPage from "../../../modules/auth/pages/signup/SignupPage";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignUp() {
  return <SignupPage />;
}
