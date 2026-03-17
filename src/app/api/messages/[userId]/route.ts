import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const { userId: otherUserId } = await params;

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: user.id, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: user.id }
        ]
      },
      orderBy: { createdAt: "asc" }
    });

    // Mark unread messages from the other user as read
    await prisma.message.updateMany({
      where: {
        senderId: otherUserId,
        receiverId: user.id,
        isRead: false,
      },
      data: { isRead: true }
    });

    const formattedMessages = messages.map(msg => ({
      id: msg.id,
      senderId: msg.senderId === user.id ? "me" : msg.senderId,
      text: msg.content,
      time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: msg.isRead
    }));

    return NextResponse.json({ messages: formattedMessages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const body = await request.json();
    const { content } = body;
    const { userId: receiverId } = await params;

    if (!content || !receiverId) {
      return NextResponse.json({ error: "Missing content or receiver" }, { status: 400 });
    }

    const message = await prisma.message.create({
      data: {
        content,
        senderId: user.id,
        receiverId
      }
    });

    return NextResponse.json({ 
      message: {
        id: message.id,
        senderId: "me",
        text: message.content,
        time: new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: message.isRead
      }
    });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
