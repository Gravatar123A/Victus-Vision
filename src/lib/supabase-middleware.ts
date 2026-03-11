import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  // Edge runtime safe check: simply check if the Supabase auth cookie exists.
  // The actual JWT validation will happen when the server components fetch data.
  // The cookie format is usually: sb-[project-ref]-auth-token
  const hasAuthCookie = request.cookies.getAll().some(cookie => cookie.name.startsWith('sb-') && cookie.name.endsWith('-auth-token'));

  // Protected routes
  const protectedPaths = ["/dashboard", "/messages", "/favorites", "/admin", "/orders", "/freelance", "/products", "/new-gig", "/new-product"];
  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !hasAuthCookie) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Redirect logged-in users away from auth pages
  const authPaths = ["/login", "/signup"];
  const isAuthPage = authPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isAuthPage && hasAuthCookie) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
