# RouteShield — Next.js 16 Permission-Based Access Control (PBAC) Boilerplate

RouteShield is a lightweight, zero-dependency Permission-Based Access Control (PBAC) boilerplate built for Next.js 16 (App Router). It provides edge-level route protection and dynamic UI component filtering using the `Resource:Action` permission model (`dashboard:read`, `users:write`).

It is designed to run seamlessly **without a backend during early UI development**, while offering a drop-in upgrade path when transitioning to a real authentication server or API.

---

## Table of Contents

1. [When to Use This Boilerplate](#when-to-use-this-boilerplate)
2. [How It Works](#how-it-works)
3. [Architecture & Copy/Paste Components](#architecture--copypaste-components)
4. [Getting Started (Local Development)](#getting-started-local-development)
5. [How to Use & Customize in Your Project](#how-to-use--customize-in-your-project)
6. [Migrating / Integrating with a Real Backend](#migrating--integrating-with-a-real-backend)

---

## When to Use This Boilerplate

- **Building Next.js 16 Apps:** You need route protection compatible with Next.js 16's `proxy.ts` convention.
- **Role & Permission Systems:** Your app requires granular permission controls (e.g., standard users, account managers, admins, super admins).
- **Backend-Less Prototyping:** You want to design dynamic navbars and protected dashboard views before your backend team finishes the API or JWT setup.
- **Decoupled Security:** You want a clean separation between route access control and backend data security.

---

## How It Works

RouteShield secures your frontend across three complementary layers:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        1. Edge Guard (src/proxy.ts)                    │
│   Intercepts every URL navigation before pages render.                 │
│   Reads 'user_permissions' cookie and blocks address-bar bypasses.     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   2. Central Config (src/config/navigation.ts)         │
│   Maps routes and UI links to required granular permission strings.    │
│   Example: '/admin/users'  --> 'users:read'                            │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│               3. Dynamic UI Layer (TopNavbar / SideNavbar)             │
│   Filters navigation items on the fly based on active permissions.     │
│   Only renders authorized links in the DOM.                            │
└────────────────────────────────────────────────────────────────────────┘
```

1. **The `Resource:Action` Format:** Every privilege is expressed as a permission string formatted as `resource:action` (e.g., `users:read`, `settings:write`).
2. **Edge Proxy Guard (`src/proxy.ts`):** Whenever a user enters a URL directly in the address bar, Next.js executes `proxy.ts` at the network edge. It parses the active `user_permissions` cookie and redirects unauthorized requests to `/unauthorized`.
3. **Dynamic Menu Filtering:** The Top and Side Navbars inspect the user's active permissions array and strip unauthorized links before rendering the DOM.

---

## Architecture & Copy/Paste Components

If you are incorporating RouteShield into an existing Next.js project, copy over these core files:

```
src/
├── lib/
│   └── auth.ts                <-- Mock authentication, cookie management, session utilities
├── config/
│   └── navigation.ts          <-- Central mapping of permissions to routes & nav items
├── proxy.ts                   <-- Next.js 16 edge route protection guard
├── components/
│   └── layout/
│       ├── TopNavbar.tsx      <-- Permission-aware top navigation header
│       └── SideNavbar.tsx     <-- Permission-aware side navigation sidebar
└── app/
    └── unauthorized/
        └── page.tsx           <-- Access denied fallback view
```

---

## Getting Started (Local Development)

### 1. Installation

Clone your project repository and install dependencies using `pnpm`:

```bash
pnpm install
```

### 2. Start the Development Server

```bash
pnpm dev
```

Navigate to `http://localhost:3000` in your browser.

### 3. Testing Mock Personas

The public landing page (`src/app/page.tsx`) contains quick-login buttons to test different access levels:

- **Standard User:** Receives `['dashboard:read', 'profile:read']`.
- **Admin:** Receives `['dashboard:read', 'profile:read', 'users:read', 'users:write']`.
- **Super Admin:** Receives all permissions including `['settings:read', 'settings:write']`.

---

## How to Use & Customize in Your Project

### 1. Adding a New Protected Route

To protect a new page (e.g., `/reports`), complete these two steps:

1. **Define the permission in `src/lib/auth.ts`:**

   ```typescript
   export type Permission =
     | "dashboard:read"
     | "profile:read"
     | "users:read"
     | "users:write"
     | "reports:read" // <-- Added
     | "settings:read";
   ```

2. **Add the route pattern to `src/config/navigation.ts`:**
   ```typescript
   export const ROUTE_PERMISSIONS: {
     pattern: RegExp;
     requiredPermission: Permission;
   }[] = [
     { pattern: /^\/reports(\/.*)?$/, requiredPermission: "reports:read" },
     // ...other routes
   ];
   ```

### 2. Adding a Navigation Item

To display the new route in the dynamic sidebar/topbar:

```typescript
// src/config/navigation.ts
export const NAVIGATION_ITEMS: NavItem[] = [
  {
    title: "Reports",
    href: "/reports",
    requiredPermission: "reports:read",
  },
];
```

---

## Migrating / Integrating with a Real Backend

When transitioning from the mock setup to a real production backend (NestJS, Node/Express, Supabase, NextAuth, Auth0, etc.), **no refactoring of your frontend navigation logic is required**.

Follow these integration steps:

### 1. Replace Cookie Assignment with Backend Session/JWT

When a user logs in via your API, return a signed JWT or set an `HttpOnly` cookie containing the user's granted permissions list:

```json
{
  "user": {
    "id": "usr_99",
    "email": "jane@example.com",
    "permissions": ["dashboard:read", "profile:read", "users:read"]
  }
}
```

### 2. Update `src/proxy.ts` for Token Verification

Instead of reading a raw client cookie, decode and verify the signed backend JWT or session token inside `proxy.ts`:

```typescript
// src/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROUTE_PERMISSIONS } from "@/config/navigation";
import { verifyJwt } from "@/lib/jwt"; // Your JWT validation helper

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("session_token")?.value;

  // Validate token signature
  const session = token ? await verifyJwt(token) : null;
  const userPermissions = session?.permissions || [];

  const matchedRule = ROUTE_PERMISSIONS.find((rule) =>
    rule.pattern.test(pathname),
  );

  if (matchedRule) {
    if (!userPermissions.includes(matchedRule.requiredPermission)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/super-admin/:path*",
    "/profile/:path*",
  ],
};
```

### 3. Enforce API-Level Authorization

Remember: Frontend proxy route protection prevents users from _seeing unauthorized UI routes_. True security requires enforcing permission checks on your API endpoints:

```typescript
// Example: Real API Handler (Backend)
export async function GET(req: Request) {
  const user = await getAuthUser(req);

  if (!user.permissions.includes('users:read')) {
    return new Response('Forbidden', { status: 403 });
  }

  return Response.json({ users: [...] });
}
```

---

## Command Reference

| Command      | Description                             |
| :----------- | :-------------------------------------- |
| `pnpm dev`   | Starts local Next.js development server |
| `pnpm build` | Builds the application for production   |
| `pnpm start` | Runs the compiled production build      |
| `pnpm lint`  | Runs ESLint analysis                    |
