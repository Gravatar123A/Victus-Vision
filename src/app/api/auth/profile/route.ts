import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    let profile = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!profile) {
      return NextResponse.json({ profile: null }, { status: 200 });
    }

    return NextResponse.json({ profile });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, email, username, fullName, avatarUrl } = body;

    if (!id || !email || !username) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if username is taken
    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUsername && existingUsername.id !== id) {
      return NextResponse.json({ error: "Username already taken" }, { status: 409 });
    }

    const profile = await prisma.user.upsert({
      where: { id },
      update: {
        email,
        username,
        fullName: fullName || null,
        avatarUrl: avatarUrl || null,
      },
      create: {
        id,
        email,
        username,
        fullName: fullName || null,
        avatarUrl: avatarUrl || null,
      },
    });

    return NextResponse.json({ profile });
  } catch (error) {
    console.error("Error upserting profile:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
