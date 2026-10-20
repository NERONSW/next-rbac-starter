// Centralized role mappings, navigation config, and route permissions.
//
// `NAVIGATION_ITEMS` drives menu rendering (filtered by the caller's role),
// and `ROUTE_PERMISSIONS` is consumed by `src/proxy.ts` to guard access.

import type { Role } from "@/lib/auth";

export interface NavItem {
  title: string;
  href: string;
  roles: Role[];
}

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    roles: ["user", "admin", "super_admin"],
  },
  {
    title: "Profile",
    href: "/profile",
    roles: ["user", "admin", "super_admin"],
  },
  {
    title: "User Management",
    href: "/admin/users",
    roles: ["admin", "super_admin"],
  },
  {
    title: "System Settings",
    href: "/super-admin/settings",
    roles: ["super_admin"],
  },
];

export interface RoutePermission {
  /** Regex tested against the request pathname. */
  pattern: RegExp;
  roles: Role[];
}

/**
 * Route path -> allowed roles. Order does not matter here because the prefixes
 * are disjoint (e.g. `^/admin` does not match `/super-admin`), but keep broader
 * prefixes after narrower ones if they ever overlap.
 */
export const ROUTE_PERMISSIONS: RoutePermission[] = [
  { pattern: /^\/dashboard/, roles: ["user", "admin", "super_admin"] },
  { pattern: /^\/profile/, roles: ["user", "admin", "super_admin"] },
  { pattern: /^\/admin/, roles: ["admin", "super_admin"] },
  { pattern: /^\/super-admin/, roles: ["super_admin"] },
];