import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("token");
  const pages = ["/admin-panel"];
  if (pages.includes(request.nextUrl.pathname) && !session) {
    return NextResponse.redirect(new URL("/wpsadmin", request.url));
  }
}
