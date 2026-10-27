"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-12 w-12 text-zinc-400 dark:text-zinc-500"
      >
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>

      <div className="flex max-w-md flex-col items-center gap-3">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          404 - Page Not Found
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          The page you're looking for doesn't exist or may have moved. Head
          back to the landing page to get your bearings.
        </p>
        <div className="mt-2 flex flex-row items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-md border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-foreground dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900"
          >
            Go Back
          </button>
          <Link
            href="/"
            className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}