import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

const protectedRoutes = [
  "/account-success",
  "/add-profile-info",
  "/add-acct-info",
  "/invoice",
  "/invoice/**",
  "/shared-invoice",
  "/notification",
  "/settings",
  "/upgrade",
  "/overview",
];
const publicRoutes = [
  "/sign-in",
  "/sign-up",
  "/email-verification",
  "/email-verification-info",
  "/forgot-password",
  "/new-password",
  "/success-message",
  "/verify",
  "/verification"
];

const isProtectedRoute = (path: string) =>
  protectedRoutes.some((prefix) => path.startsWith(prefix));

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  // const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = cookies().get("accessToken")?.value;
  const session = cookie ? jwtDecode(cookie) : null;

  if (isProtectedRoute(path) && !session) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }

  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL("/add-profile-info", req.nextUrl));
  }

  return NextResponse.next();
}