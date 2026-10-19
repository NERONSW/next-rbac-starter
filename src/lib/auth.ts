// Role-based session helpers backed by mock users.
//
// These are client-side only: the session spans a `user_role` cookie (read by
// the proxy for route protection) and the full user object in `localStorage`
// (read by components to render the current user).

export type Role = "user" | "admin" | "super_admin";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
}

export const USER_ROLE_COOKIE = "user_role";
export const SESSION_STORAGE_KEY = "rbac.mock_user";
export const SESSION_MAX_AGE = 86400; // seconds

export const MOCK_USERS: MockUser[] = [
  {
    id: "user-1",
    name: "Alex Morgan",
    email: "alex@example.com",
    role: "user",
  },
  {
    id: "admin-1",
    name: "Jordan Lee",
    email: "jordan@example.com",
    role: "admin",
  },
  {
    id: "super-admin-1",
    name: "Sam Rivera",
    email: "sam@example.com",
    role: "super_admin",
  },
];

function isRole(value: unknown): value is Role {
  return value === "user" || value === "admin" || value === "super_admin";
}

function getUserByRole(role: Role): MockUser {
  const user = MOCK_USERS.find((candidate) => candidate.role === role);
  if (!user) {
    throw new Error(`No mock user registered for role "${role}".`);
  }
  return user;
}

/** Sign in as the given role: persists the role cookie and the user session. */
export function mockLogin(role: Role): MockUser {
  const user = getUserByRole(role);

  document.cookie = `${USER_ROLE_COOKIE}=${role}; max-age=${SESSION_MAX_AGE}; path=/; samesite=lax`;
  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));

  return user;
}

/** Sign out: clears the role cookie and the stored user session. */
export function mockLogout(): void {
  document.cookie = `${USER_ROLE_COOKIE}=; max-age=0; path=/`;
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
      !isRole(parsed.role)
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}