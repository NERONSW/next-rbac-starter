"use client";

import { useRouter } from "next/navigation";
import { mockLogin, MOCK_USERS } from "@/lib/auth";
import type { Role } from "@/lib/auth";

const DEMO_ACCOUNTS: ReadonlyArray<{
  role: Role;
  label: string;
  description: string;
}> = [
  {
    role: "user",
    label: "Standard User",
    description: "General dashboard and profile access.",
  },
  {
    role: "admin",
    label: "Admin",
    description: "Manage users and administrative views.",
  },
  {
    role: "super_admin",
    label: "Super Admin",
    description: "Full system-settings control.",
  },
];

/** Permissions granted to a persona, sourced from the shared mock users. */
function permissionsFor(role: Role) {
  return MOCK_USERS.find((user) => user.role === role)?.permissions ?? [];
}

export default function Page() {
  const router = useRouter();

  function handleLogin(role: Role) {
    mockLogin(role);
    router.push("/dashboard");
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-12 px-6 py-24">
      <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
        <span className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
          Permission-Based Access Control
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          RouteShield
        </h1>
        <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          A starter that guards every route by permission. Pick a demo account
          to see how navigation and access change for each role.
        </p>
      </div>

      <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-3">
        {DEMO_ACCOUNTS.map(({ role, label, description }) => {
          const permissions = permissionsFor(role);
          return (
            <button
              key={role}
              type="button"
              onClick={() => handleLogin(role)}
              className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-background p-5 text-left transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
            >
              <span className="text-sm font-semibold text-foreground">
                {label}
              </span>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                {description}
              </span>
              <span className="mt-auto flex flex-wrap gap-1.5">
                {permissions.map((permission) => (
                  <span
                    key={permission}
                    className="rounded-full border border-zinc-200 px-2 py-0.5 font-mono text-[10px] text-zinc-600 dark:border-zinc-800 dark:text-zinc-400"
                  >
                    {permission}
                  </span>
                ))}
              </span>
            </button>
          );
        })}
      </div>
    </main>
  );
}