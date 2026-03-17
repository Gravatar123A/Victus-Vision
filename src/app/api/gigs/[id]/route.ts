import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        seller: {
          select: {
            id: true,
            username: true,
            fullName: true,
            avatarUrl: true,
            level: true,
            isVerified: true,
            bio: true,
            joinedAt: true,
          },
        },
        category: true,
      },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ service });
  } catch (error) {
    console.error("Error fetching service:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
