"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET ?? "fallback-secret-change-me";

const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

function checkRateLimit(ip: string): string | null {
  const now = Date.now();
  const entry = loginAttempts.get(ip);

  if (entry) {
    if (now > entry.resetAt) {
      loginAttempts.delete(ip);
      return null;
    }
    if (entry.count >= MAX_ATTEMPTS) {
      return "Too many login attempts. Try again later.";
    }
  }
  return null;
}

function recordAttempt(ip: string) {
  const now = Date.now();
  const entry = loginAttempts.get(ip);

  if (entry && now <= entry.resetAt) {
    entry.count++;
  } else {
    loginAttempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  }
}

export async function login(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const ip = "global";

  const rateLimitError = checkRateLimit(ip);
  if (rateLimitError) {
    return { error: rateLimitError };
  }

  const admin = await prisma.adminUser.findUnique({
    where: { username },
  });

  if (!admin) {
    recordAttempt(ip);
    return { error: "Invalid credentials" };
  }

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    recordAttempt(ip);
    return { error: "Invalid credentials" };
  }

  loginAttempts.delete(ip);

  const token = jwt.sign(
    { id: admin.id, username: admin.username },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  const cookieStore = await cookies();
  cookieStore.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  redirect("/admin/login");
}

export async function checkAuth(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    if (!token) return false;
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}
