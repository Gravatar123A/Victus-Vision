import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function GET(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find all distinct users the current user has chatted with
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: user.id },
          { receiverId: user.id }
        ]
      },
      include: {
        sender: { select: { id: true, username: true, fullName: true, avatarUrl: true } },
        receiver: { select: { id: true, username: true, fullName: true, avatarUrl: true } }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    const conversationMap = new Map();

    messages.forEach((msg) => {
      const isSender = msg.senderId === user.id;
      const otherUser = isSender ? msg.receiver : msg.sender;
      
      if (!conversationMap.has(otherUser.id)) {
        conversationMap.set(otherUser.id, {
          user: {
            id: otherUser.id,
            name: otherUser.fullName || otherUser.username,
            avatarUrl: otherUser.avatarUrl,
            online: true, 
          },
          lastMessage: msg.content,
          time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          unread: !isSender && !msg.isRead ? 1 : 0, 
        });
      } else {
        if (!isSender && !msg.isRead) {
          const convo = conversationMap.get(otherUser.id);
          convo.unread += 1;
        }
      }
    });

    const conversations = Array.from(conversationMap.values());
    
    return NextResponse.json({ conversations });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
