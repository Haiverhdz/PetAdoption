import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get("cookie") || "";
    const match = cookie.match(/authToken=([^;]+)/);
    const token = match ? match[1] : null;

    if (!token) return NextResponse.json({ user: null }, { status: 401 });

    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      name: string;
      email: string;
      role: string;
    };

    return NextResponse.json({ user: decoded });
  } catch (err) {
    console.error("JWT inválido:", err);
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
