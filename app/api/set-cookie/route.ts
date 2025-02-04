import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { accessToken, exp } = await req.json();

    if (!accessToken) {
      return NextResponse.json({ error: "Token missing" }, { status: 400 });
    }

    const response = NextResponse.json({ message: "Cookie set successfully" });

    response.headers.set(
      "Set-Cookie",
      `accessToken=${accessToken}; Path=/; HttpOnly; Secure; Expires=${exp}; SameSite=Strict`
    );

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
