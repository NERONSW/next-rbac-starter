"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NAVIGATION_ITEMS } from "@/config/navigation";
import { mockLogout } from "@/lib/auth";
import { useCurrentUser } from "@/lib/use-auth";

/** A link is active on its exact path or any nested sub-path. */
function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function TopNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const user = useCurrentUser();

  const navItems = user
    ? NAVIGATION_ITEMS.filter((item) =>
        user.permissions.includes(item.permission),
      )
    : [];

  function handleLogout() {
    mockLogout();
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-background dark:border-zinc-800">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-foreground"
        >
          RouteShield
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-zinc-100 text-foreground dark:bg-zinc-900"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-foreground dark:text-zinc-400 dark:hover:bg-zinc-900"
                }`}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-background">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <div className="hidden leading-tight sm:block">
                  <p className="text-sm font-medium text-foreground">
                    {user.name}
                  </p>
                  <p className="text-xs capitalize text-zinc-500 dark:text-zinc-400">
                    {user.role.replace(/_/g, " ")}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-foreground dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900"
              >
                Log Out
              </button>
            </>
          ) : (
            <Link
              href="/"
              className="rounded-md bg-foreground px-3 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}