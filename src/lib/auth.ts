// Permission-based session helpers backed by mock users.
//
// These are client-side only: the session spans a `user_permissions` cookie
// (read by the proxy for route protection) and the full user object in
// `localStorage` (read by components to render the current user).

/** The mock personas available at login, used as a lookup key only. */
export type Role = "user" | "admin" | "super_admin";

export type Permission =
  | "dashboard:read"
  | "profile:read"
  | "users:read"
  | "users:write"
  | "settings:read"
  | "settings:write";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  /** Human-readable persona label (does not drive access). */
  role: string;
  /** Granular permissions that determine what the user can access. */
  permissions: Permission[];
  avatarUrl?: string;
}

export const USER_PERMISSIONS_COOKIE = "user_permissions";
export const SESSION_STORAGE_KEY = "user_session";
export const SESSION_MAX_AGE = 86400; // seconds

export const MOCK_USERS: MockUser[] = [
  {
    id: "user-1",
    name: "Alex Morgan",
    email: "alex@example.com",
    role: "user",
    permissions: ["dashboard:read", "profile:read"],
  },
  {
    id: "admin-1",
    name: "Jordan Lee",
    email: "jordan@example.com",
    role: "admin",
    permissions: [
      "dashboard:read",
      "profile:read",
      "users:read",
      "users:write",
    ],
  },
  {
    id: "super-admin-1",
    name: "Sam Rivera",
    email: "sam@example.com",
    role: "super_admin",
    permissions: [
      "dashboard:read",
      "profile:read",
      "users:read",
      "users:write",
      "settings:read",
      "settings:write",
    ],
  },
];

function isPermission(value: unknown): value is Permission {
  return (
    value === "dashboard:read" ||
    value === "profile:read" ||
    value === "users:read" ||
    value === "users:write" ||
    value === "settings:read" ||
    value === "settings:write"
  );
}

function getUserByRole(role: Role): MockUser {
  const user = MOCK_USERS.find((candidate) => candidate.role === role);
  if (!user) {
    throw new Error(`No mock user registered for role "${role}".`);
  }
  return user;
}

/** Sign in as the given role: persists the permission cookie and the session. */
export function mockLogin(role: Role): MockUser {
  const user = getUserByRole(role);

  const permissionCookie = user.permissions.join(",");
  document.cookie = `${USER_PERMISSIONS_COOKIE}=${permissionCookie}; max-age=${SESSION_MAX_AGE}; path=/; samesite=lax`;
  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));

  return user;
}

/** Sign out: clears the permission cookie and the stored user session. */
export function mockLogout(): void {
  document.cookie = `${USER_PERMISSIONS_COOKIE}=; max-age=0; path=/`;
  window.localStorage.removeItem(SESSION_STORAGE_KEY);
}

/** Return the current logged-in user, or `null` when there is no valid session. */
export function getCurrentUser(): MockUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as MockUser;
    if (
      !parsed ||
      typeof parsed.id !== "string" ||
      typeof parsed.name !== "string" ||
      typeof parsed.email !== "string" ||
      typeof parsed.role !== "string" ||
      !Array.isArray(parsed.permissions) ||
      !parsed.permissions.every(isPermission)
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}