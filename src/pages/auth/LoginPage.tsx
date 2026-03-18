import CredentialForm from "@/components/forms/wrapper/LoginForm";
import { ShieldCheck } from "lucide-react";

const Login = () => {
  return (
    <div className="min-h-screen w-full bg-[var(--background-color)]">
      <div className="relative mx-auto grid min-h-screen w-full grid-cols-1 lg:grid-cols-[13fr_7fr]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[var(--primary-bg)] blur-3xl" />
        </div>

        <section className="flex items-center bg-[var(--primary-color)] px-6 py-10 sm:px-10 lg:px-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              <ShieldCheck size={14} />
              Secure POS Access
            </div>
            <p className="mt-6 text-sm uppercase tracking-[0.3em] text-white/70">
              Yaung Ni Oo
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl">
              Clean login. Clear workflow.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/78">
              Sign in to manage invoices, inventory, and patient operations in
              one place.
            </p>
            <blockquote className="mt-10 border-l-2 border-white/60 pl-4">
              <p className="text-sm leading-6 text-white/90">
                "Good systems reduce noise so your team can focus on patients,
                not paperwork."
              </p>
            </blockquote>
          </div>
        </section>

        <section className="border-t border-[var(--border-color)] bg-white px-6 py-10 sm:px-10 lg:border-t-0 lg:border-l lg:px-8">
          <div className="mx-auto flex min-h-full w-full max-w-sm items-center">
            <CredentialForm />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
