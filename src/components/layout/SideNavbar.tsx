"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVIGATION_ITEMS } from "@/config/navigation";
import { getCurrentUser } from "@/lib/auth";

/** A link is active on its exact path or any nested sub-path. */
function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SideNavbar() {
  const pathname = usePathname();
  const userRole = getCurrentUser()?.role;

  const navItems = userRole
    ? NAVIGATION_ITEMS.filter((item) => item.roles.includes(userRole))
    : [];

  if (navItems.length === 0) {
    return null;
  }

  return (
    <nav className="flex w-56 flex-col gap-1 border-r border-zinc-200 p-4 dark:border-zinc-800">
      {navItems.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`relative flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-zinc-100 font-semibold text-foreground dark:bg-zinc-900"
                : "text-zinc-600 hover:bg-zinc-50 hover:text-foreground dark:text-zinc-400 dark:hover:bg-zinc-900"
            }`}
          >
            {active && (
              <span className="absolute left-1 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-foreground" />
            )}
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}