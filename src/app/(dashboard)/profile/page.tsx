"use client";

import { useCurrentUser } from "@/lib/use-auth";

export default function Page() {
  const user = useCurrentUser();

  if (!user) {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Loading profile…
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Profile
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Your account details and active permissions.
        </p>
      </header>

      <section className="flex flex-col gap-5 rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-lg font-semibold text-background">
            {user.name.charAt(0).toUpperCase()}
          </span>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-foreground">
              {user.name}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {user.email}
            </p>
            <span className="mt-2 w-fit rounded-full border border-zinc-200 px-2 py-0.5 text-xs capitalize text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
              {user.role.replace(/_/g, " ")}
            </span>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Permissions
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {user.permissions.map((permission) => (
              <span
                key={permission}
                className="rounded-full border border-zinc-200 px-2 py-0.5 font-mono text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-400"
              >
                {permission}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}