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

      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // Error - redirect to login with error
  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
