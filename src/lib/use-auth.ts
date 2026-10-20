"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, type MockUser } from "@/lib/auth";

/**
 * Current logged-in user, read from the client-only session.
 *
 * Reads in an effect so the server render and the initial client render agree
 * (both `null`), avoiding a hydration mismatch on reload while logged in.
 */
export function useCurrentUser(): MockUser | null {
  const [user, setUser] = useState<MockUser | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  return user;
}