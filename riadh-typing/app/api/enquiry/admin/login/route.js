import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin-auth", process.env.ADMIN_SECRET_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400, // 1 day
    });
    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
