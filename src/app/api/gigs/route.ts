import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createServerSupabaseClient } from "@/lib/supabase-server";

// GET — list all active gigs (services), optionally filtered by category/search
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const sellerId = searchParams.get("sellerId");

  try {
    const where: Record<string, unknown> = { isActive: true };
    if (category) where.categoryId = category;
    if (sellerId) where.sellerId = sellerId;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const gigs = await prisma.service.findMany({
      where,
      include: {
        seller: { select: { id: true, username: true, fullName: true, avatarUrl: true, level: true, isVerified: true } },
        category: { select: { id: true, name: true, icon: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ gigs });
  } catch (error) {
    console.error("Error fetching gigs:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST — create a new gig (requires auth)
export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { title, description, price, deliveryDays, categoryId, tags } = body;

    if (!title || !description || !price || !deliveryDays || !categoryId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Ensure category exists, create if not
    let category = await prisma.category.findUnique({ where: { id: categoryId } });
    if (!category) {
      category = await prisma.category.findUnique({ where: { name: categoryId } });
      if (!category) {
        category = await prisma.category.create({
          data: { name: categoryId, icon: "Code2" },
        });
      }
    }

    const gig = await prisma.service.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        deliveryDays: parseInt(deliveryDays),
        tags: tags || [],
        sellerId: user.id,
        categoryId: category.id,
      },
      include: {
        seller: { select: { id: true, username: true, fullName: true, avatarUrl: true } },
        category: true,
      },
    });

    // Mark user as seller
    await prisma.user.update({
      where: { id: user.id },
      data: { isSeller: true },
    });

    return NextResponse.json({ gig }, { status: 201 });
  } catch (error) {
    console.error("Error creating gig:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
