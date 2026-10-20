"use client";

import { MOCK_USERS } from "@/lib/auth";
import { useCurrentUser } from "@/lib/use-auth";

export default function Page() {
  const user = useCurrentUser();

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          User Management
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Admin and super admin only. Directory of the mock accounts powering
          this demo.
        </p>
      </header>

      <section className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase tracking-wider text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {MOCK_USERS.map((mockUser) => (
              <tr key={mockUser.id}>
                <td className="px-4 py-3 font-medium text-foreground">
                  {mockUser.name}
                </td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                  {mockUser.email}
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full border border-zinc-200 px-2 py-0.5 text-xs capitalize text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                    {mockUser.role.replace(/_/g, " ")}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {user && (
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Signed in as{" "}
          <span className="font-medium capitalize text-foreground">
            {user.role.replace(/_/g, " ")}
          </span>
          .
        </p>
      )}
    </div>
  );
}