import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createServerSupabaseClient } from "@/lib/supabase-server";

// GET — list all active products, optionally filtered
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

    const products = await prisma.product.findMany({
      where,
      include: {
        seller: { select: { id: true, username: true, fullName: true, avatarUrl: true, level: true, isVerified: true } },
        category: { select: { id: true, name: true, icon: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST — create a new product (requires auth)
export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { title, description, price, categoryId, tags, fileUrl, thumbnail } = body;

    if (!title || !description || price === undefined || !categoryId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log("Creating product for user:", user.id, "with data:", body);

    let category = await prisma.category.findUnique({ where: { name: categoryId } });
    if (!category) {
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(categoryId);
      if (isUUID) {
        category = await prisma.category.findUnique({ where: { id: categoryId } });
      }
      if (!category) {
        category = await prisma.category.create({
          data: { name: categoryId, icon: "Package" },
        });
      }
    }

    // Ensure user exists in Prisma DB
    let dbUser = await prisma.user.findUnique({ where: { id: user.id } });
    if (!dbUser) {
      const baseUsername = user.email?.split("@")[0] || "user";
      await prisma.user.create({
        data: {
          id: user.id,
          email: user.email || "",
          username: `${baseUsername}_${user.id.slice(0, 5)}`,
        }
      });
    }

    const product = await prisma.product.create({
      data: {
        title,
        description,
        price: parseFloat(price) || 0,
        tags: tags || [],
        fileUrl: fileUrl || null,
        thumbnail: thumbnail || null,
        sellerId: user.id,
        categoryId: category.id,
      },
      include: {
        seller: { select: { id: true, username: true, fullName: true, avatarUrl: true } },
        category: true,
      },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { isSeller: true },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
