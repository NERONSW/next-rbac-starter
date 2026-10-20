"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { mockLogout } from "@/lib/auth";

export default function Page() {
  const router = useRouter();

  function handleSwitchAccount() {
    mockLogout();
    router.push("/");
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <p className="text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
        403
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Access Denied
      </h1>
      <p className="max-w-md text-base leading-7 text-zinc-600 dark:text-zinc-400">
        Your account does not have permission to view this page. Return to your
        dashboard or switch to an account with the required role.
      </p>

      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Return to Dashboard
        </Link>
        <button
          type="button"
          onClick={handleSwitchAccount}
          className="rounded-md border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-foreground dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900"
        >
          Switch Account
        </button>
      </div>
    </main>
  );
}