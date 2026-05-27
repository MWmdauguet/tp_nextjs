import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const session = request.cookies.get("session");

    if(!session) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const { user } = JSON.parse(session.value);

    console.log(user);

    if (user.role !== "admin" && request.nextUrl.pathname === '/products/2') {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
}

export const config = {
  matcher: ["/products/2"],
};