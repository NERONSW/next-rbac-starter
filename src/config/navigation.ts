// Centralized navigation config and route permissions (permission-based).
//
// `NAVIGATION_ITEMS` drives menu rendering (filtered by the caller's
// permissions), and `ROUTE_PERMISSIONS` is consumed by `src/proxy.ts` to guard
// access.

import type { Permission } from "@/lib/auth";

export interface NavItem {
  title: string;
  href: string;
  /** Permission required to see the item and enter the route. */
  permission: Permission;
}

export const NAVIGATION_ITEMS: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", permission: "dashboard:read" },
  { title: "Profile", href: "/profile", permission: "profile:read" },
  { title: "User Management", href: "/admin/users", permission: "users:read" },
  {
    title: "System Settings",
    href: "/super-admin/settings",
    permission: "settings:read",
  },
];

export interface RoutePermission {
  /** Regex tested against the request pathname. */
  pattern: RegExp;
  /** Permission required to access matching routes. */
  permission: Permission;
}

/**
 * Route path -> required permission. Order does not matter here because the
 * prefixes are disjoint (e.g. `^/admin` does not match `/super-admin`), but
 * keep broader prefixes after narrower ones if they ever overlap.
 */
export const ROUTE_PERMISSIONS: RoutePermission[] = [
  { pattern: /^\/dashboard/, permission: "dashboard:read" },
  { pattern: /^\/profile/, permission: "profile:read" },
  { pattern: /^\/admin/, permission: "users:read" },
  { pattern: /^\/super-admin/, permission: "settings:read" },
];