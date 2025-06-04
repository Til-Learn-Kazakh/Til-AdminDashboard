import Link from "next/link";
import { AUTH_PAGES } from "../../../core/config/pages-url.config";
import GoogleSigninButton from "../GoogleSigninButton";
import SigninWithPassword from "../SigninWithPassword";

export default function Signin() {
  return (
    <>


      <div>
        <SigninWithPassword />
      </div>

      <div className="mt-6 text-center">
        <p>
          Don’t have any account?{" "}
          <Link href={AUTH_PAGES.SIGNUP} className="text-primary">
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
}
