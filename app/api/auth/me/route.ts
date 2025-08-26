import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const token = req.headers.get("cookie"); 

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
  const user = {
    id: "123",
    name: "Haiver",
    email: "haiver@example.com",
    role: "user",
  };

  return NextResponse.json({ user });
}
