import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "../../../../components/Breadcrumbs/Breadcrumb";
import { AUTH_PAGES } from "../../../../core/config/pages-url.config";
import { SignUpForm } from "./components/SignUpForm";

export default function SignupPage() {
  return (
    <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="Sign Up" />
      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="flex flex-wrap items-center">
          {/* Signup form block */}
          <div className="w-full xl:w-1/2">
            <div className="w-full p-4 sm:p-12.5 xl:p-15">
              <SignUpForm />

              <div className="mt-6 text-center text-sm">
                <p className="text-dark dark:text-dark-6">
                  Already have an account?{" "}
                  <Link
                    href={AUTH_PAGES.LOGIN}
                    className="text-primary hover:underline"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right side illustration */}
          <div className="hidden w-full p-7.5 xl:block xl:w-1/2">
            <div className="custom-gradient-1 overflow-hidden rounded-2xl px-12.5 pt-12.5 dark:!bg-dark-2 dark:bg-none">
              <Link
                href="/"
                className="mb-10 inline-block text-3xl font-bold tracking-tight text-dark dark:text-white"
              >
                <span className="bg-gradient-to-br from-primary to-primary/80 bg-clip-text text-transparent">
                  Til
                </span>
              </Link>

              <p className="mb-3 text-xl font-medium text-dark dark:text-white">
                Create your account
              </p>

              <h1 className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-heading-3">
                Join our platform!
              </h1>

              <p className="w-full max-w-[375px] font-medium text-dark-4 dark:text-dark-6">
                Start your journey learning Qazaq today. Fill in the fields to
                create your account.
              </p>

              <div className="mt-31">
                <Image
                  src={"/images/grids/grid-02.svg"}
                  alt="Illustration"
                  width={405}
                  height={325}
                  className="mx-auto dark:opacity-30"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
