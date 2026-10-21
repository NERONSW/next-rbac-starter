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
  requiredPermission: Permission;
}

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    requiredPermission: "dashboard:read",
  },
  { title: "Profile", href: "/profile", requiredPermission: "profile:read" },
  {
    title: "User Management",
    href: "/admin/users",
    requiredPermission: "users:read",
  },
  {
    title: "System Settings",
    href: "/super-admin/settings",
    requiredPermission: "settings:read",
  },
];

export interface RoutePermission {
  /** Regex tested against the request pathname. */
  pattern: RegExp;
  /** Permission required to access matching routes. */
  requiredPermission: Permission;
}

/**
 * Route path -> required permission. Order does not matter here because the
 * prefixes are disjoint (e.g. `^/admin` does not match `/super-admin`), but
 * keep broader prefixes after narrower ones if they ever overlap.
 */
export const ROUTE_PERMISSIONS: RoutePermission[] = [
  { pattern: /^\/dashboard/, requiredPermission: "dashboard:read" },
  { pattern: /^\/profile/, requiredPermission: "profile:read" },
  { pattern: /^\/admin/, requiredPermission: "users:read" },
  { pattern: /^\/super-admin/, requiredPermission: "settings:read" },
];