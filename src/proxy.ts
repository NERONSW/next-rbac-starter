// Edge route protection: guard the authenticated/role-restricted areas.
//
// Runs before the App Router resolves a request, so it reads the `user_role`
// cookie directly (the localStorage session lives in the browser and is not
// available here).

import { NextResponse, type NextRequest } from "next/server";
import { ROUTE_PERMISSIONS } from "@/config/navigation";
import type { Role } from "@/lib/auth";

const UNAUTHORIZED_URL = "/unauthorized";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieRole = request.cookies.get("user_role")?.value;

  const route = ROUTE_PERMISSIONS.find((permission) =>
    permission.pattern.test(pathname),
  );

  // Authorized only when a permission rule covers the path and the cookie
  // holds a role that rule allows. An invalid/foreign cookie value fails the
  // `includes` check the same way an absent one does.
  const authorized = Boolean(
    route && cookieRole && route.roles.includes(cookieRole as Role),
  );

  if (!authorized) {
    const url = request.nextUrl.clone();
    url.pathname = UNAUTHORIZED_URL;
    url.search = "";
    return NextResponse.redirect(url);
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