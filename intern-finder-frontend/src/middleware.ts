import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define which routes need protection
const protectedRoutes = ["/client", "/talent", "/dashboard", "/profile", "/settings"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // token saved in cookies

  // Check if current path is protected
  const isProtected = protectedRoutes.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !token) {
    // redirect to login if no token
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Apply middleware only to specific routes
export const config = {
  matcher: ["/client/:path*",  "/talent/:path*", "/dashboard/:path*", "/profile/:path*", "/settings/:path*"],
};
