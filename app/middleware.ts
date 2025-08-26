import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Solo proteger /dashboard
  if (pathname.startsWith("/dashboard")) {
    const token = req.cookies.get("authToken")?.value;

    if (!token) return NextResponse.redirect(new URL("/login", req.url));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      // opcional: agregar decoded al request si quieres
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // protege todo lo que esté dentro de /dashboard
};
