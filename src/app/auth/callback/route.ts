import { createServerSupabaseClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      // Create or update the user profile in DB
      const email = data.user.email || "";
      const metadata = data.user.user_metadata;
      const fullName = metadata?.full_name || metadata?.name || "";
      const avatarUrl = metadata?.avatar_url || "";
      const username = email.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "") + Math.floor(Math.random() * 1000);

      try {
        await prisma.user.upsert({
          where: { id: data.user.id },
          update: {
            email,
            fullName: fullName || null,
            avatarUrl: avatarUrl || null,
          },
          create: {
            id: data.user.id,
            email,
            username,
            fullName: fullName || null,
            avatarUrl: avatarUrl || null,
          },
        });
      } catch (err) {
        console.error("Error creating user profile:", err);
      }

      // Use the request origin for redirects to stay on the same domain
      const redirectUrl = new URL(next, request.url);
      return NextResponse.redirect(redirectUrl.toString());
    }
  }

  // Error - redirect to login with error
  return NextResponse.redirect(new URL(`/login?error=auth_failed`, request.url).toString());
}
