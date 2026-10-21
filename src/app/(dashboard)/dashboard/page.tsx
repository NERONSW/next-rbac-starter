"use client";

import { useCurrentUser } from "@/lib/use-auth";

export default function Page() {
  const user = useCurrentUser();

  if (!user) {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Loading session…
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Your current session and role summary.
        </p>
      </header>

      <section className="flex flex-col gap-5 rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
            {user.name.charAt(0).toUpperCase()}
          </span>
          <div>
            <p className="text-base font-semibold text-foreground">
              {user.name}
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {user.email}
            </p>
          </div>
        </div>

        <dl className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <dt className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Role
            </dt>
            <dd className="mt-1 text-sm font-medium capitalize text-foreground">
              {user.role.replace(/_/g, " ")}
            </dd>
          </div>
          <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <dt className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              User ID
            </dt>
            <dd className="mt-1 text-sm font-medium text-foreground">
              {user.id}
            </dd>
          </div>
        </dl>

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

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          This page is available to every role. Try switching accounts to see
          which other areas appear in the navigation.
        </p>
      </section>
    </div>
  );
}