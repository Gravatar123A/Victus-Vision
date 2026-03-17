"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Send, Paperclip, Search, Phone, Video, MoreVertical, Smile, ArrowLeft, Check, CheckCheck, Loader2, MessageSquare } from "lucide-react";

interface User {
  id: string;
  name: string;
  avatarUrl: string | null;
  online: boolean;
}

interface Conversation {
  user: User;
  lastMessage: string;
  time: string;
  unread: number;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  time: string;
  isRead: boolean;
}

function MessagesContent() {
  const searchParams = useSearchParams();
  const targetUserId = searchParams.get("userId");
  
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConvo, setSelectedConvo] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const [loadingConvos, setLoadingConvos] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (selectedConvo) {
      fetchMessages(selectedConvo.user.id);
    } else {
      setMessages([]);
    }
  }, [selectedConvo]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle URL param userId
  useEffect(() => {
    if (targetUserId && !loadingConvos) {
      const existing = conversations.find(c => c.user.id === targetUserId);
      if (existing) {
        setSelectedConvo(existing);
        setShowSidebar(false);
      } else {
        fetchUserInfo(targetUserId);
      }
    }
  }, [targetUserId, loadingConvos, conversations]);

  const fetchUserInfo = async (userId: string) => {
    try {
      const res = await fetch(`/api/auth/profile?userId=${userId}`);
      if (res.ok) {
        const data = await res.json();
        const profile = data.profile;
        if (profile) {
          const newConvo: Conversation = {
            user: {
              id: profile.id,
              name: profile.username || profile.email.split("@")[0],
              avatarUrl: profile.avatarUrl,
              online: false
            },
            lastMessage: "Start a new conversation",
            time: "Now",
            unread: 0
          };
          setSelectedConvo(newConvo);
          setShowSidebar(false);
        }
      }
    } catch (err) {
      console.error("Error fetching user info:", err);
    }
  };

  const fetchConversations = async () => {
    try {
      const res = await fetch("/api/messages/conversations");
      if (res.ok) {
        const data = await res.json();
        setConversations(data.conversations);
        if (!targetUserId && data.conversations.length > 0 && !selectedConvo) {
            setSelectedConvo(data.conversations[0]);
            setShowSidebar(false);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingConvos(false);
    }
  };

  const fetchMessages = async (userId: string) => {
    setLoadingMessages(true);
    try {
      const res = await fetch(`/api/messages/${userId}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMessages(false);
    }
  };

  const sendMessage = async () => {
    if (!messageInput.trim() || !selectedConvo) return;
    setSending(true);
    try {
      const res = await fetch(`/api/messages/${selectedConvo.user.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: messageInput })
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, data.message]);
        setMessageInput("");
        fetchConversations();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] overflow-hidden" style={{ height: "calc(100vh - 160px)" }}>
        <div className="flex h-full">
          {/* Conversations List */}
          <div className={`${showSidebar ? "flex" : "hidden md:flex"} w-full md:w-80 border-r border-[var(--border-color)] flex-col`}>
            <div className="p-4 border-b border-[var(--border-color)]">
              <h2 className="font-display font-semibold text-lg mb-3">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                <input type="text" placeholder="Search conversations..." className="w-full pl-10 pr-4 py-2 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--border-color)] focus:outline-none focus:border-primary" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {loadingConvos ? (
                <div className="flex items-center justify-center h-full"><Loader2 className="w-6 h-6 text-[var(--muted)] animate-spin" /></div>
              ) : conversations.length === 0 && !selectedConvo ? (
                <div className="flex flex-col flex-1 items-center justify-center p-8 text-center text-[var(--muted)]"><p className="text-sm">No messages yet.</p></div>
              ) : (
                <>
                  {selectedConvo && !conversations.some(c => c.user.id === selectedConvo.user.id) && (
                    <div className="p-4 bg-primary/5 border-b border-primary/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white text-sm font-bold">{selectedConvo.user.name.charAt(0)}</div>
                        <div><p className="text-sm font-bold text-primary">New Chat</p><p className="text-xs text-[var(--muted)]">{selectedConvo.user.name}</p></div>
                      </div>
                    </div>
                  )}
                  {conversations.map(convo => (
                    <button key={convo.user.id} onClick={() => { setSelectedConvo(convo); setShowSidebar(false); }} className={`w-full flex items-center gap-3 p-4 hover:bg-[var(--surface-alt)] transition-colors text-left ${selectedConvo?.user.id === convo.user.id ? "bg-[var(--surface-alt)]" : ""}`}>
                      <div className="relative shrink-0">
                        {convo.user.avatarUrl ? (
                          <img src={convo.user.avatarUrl} alt="" className="w-10 h-10 rounded-xl object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white text-sm font-bold">{convo.user.name.charAt(0)}</div>
                        )}
                        {convo.user.online && <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-[var(--surface)]" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between"><p className="text-sm font-medium truncate">{convo.user.name}</p> <span className="text-[10px] text-[var(--muted)] shrink-0">{convo.time}</span></div>
                        <p className="text-xs text-[var(--muted)] truncate mt-0.5">{convo.lastMessage}</p>
                      </div>
                      {convo.unread > 0 && <span className="w-5 h-5 rounded-full gradient-bg text-white text-[10px] flex items-center justify-center font-bold shrink-0">{convo.unread}</span>}
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`${!showSidebar ? "flex" : "hidden md:flex"} flex-col flex-1`}>
            {selectedConvo ? (
              <>
                <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)]">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setShowSidebar(true)} className="md:hidden p-1"><ArrowLeft className="w-5 h-5" /></button>
                    <div className="relative">
                      {selectedConvo.user.avatarUrl ? (
                        <img src={selectedConvo.user.avatarUrl} alt="" className="w-9 h-9 rounded-xl object-cover" />
                      ) : (
                        <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center text-white text-sm font-bold">{selectedConvo.user.name.charAt(0)}</div>
                      )}
                      {selectedConvo.user.online && <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-success rounded-full border-2 border-[var(--surface)]" />}
                    </div>
                    <div><p className="text-sm font-medium">{selectedConvo.user.name}</p><p className="text-xs text-success">{selectedConvo.user.online ? "Online" : "Offline"}</p></div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans">
                  {loadingMessages ? (
                    <div className="flex items-center justify-center h-full"><Loader2 className="w-6 h-6 text-[var(--muted)] animate-spin" /></div>
                  ) : messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-[var(--muted)]"><p className="text-sm">Say hi to start the conversation!</p></div>
                  ) : (
                    messages.map((msg, i) => (
                      <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.05, 0.5) }} className={`flex ${msg.senderId === "me" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[70%] p-3 rounded-2xl text-sm ${msg.senderId === "me" ? "gradient-bg text-white rounded-br-md" : "bg-[var(--surface-alt)] border border-[var(--border-color)] rounded-bl-md"}`}>
                          <p className="whitespace-pre-wrap">{msg.text}</p>
                          <div className={`flex items-center gap-1 mt-1 ${msg.senderId === "me" ? "justify-end" : ""}`}>
                            <span className={`text-[10px] ${msg.senderId === "me" ? "text-white/60" : "text-[var(--muted)]"}`}>{msg.time}</span>
                            {msg.senderId === "me" && <CheckCheck className="w-3 h-3 text-white/60" />}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t border-[var(--border-color)]">
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-xl hover:bg-[var(--surface-alt)] transition-colors"><Paperclip className="w-4 h-4 text-[var(--muted)]" /></button>
                    <div className="flex-1 relative">
                      <input type="text" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="Type a message..." className="w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--border-color)] focus:outline-none focus:border-primary transition-colors pr-10" disabled={sending} />
                      <button className="absolute right-3 top-1/2 -translate-y-1/2"><Smile className="w-4 h-4 text-[var(--muted)]" /></button>
                    </div>
                    <button onClick={sendMessage} disabled={sending} className="p-2.5 rounded-xl gradient-bg text-white hover:opacity-90 transition-opacity disabled:opacity-50"><Send className="w-4 h-4" /></button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-[var(--muted)]">
                <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
                <p className="text-sm font-medium">Select a conversation</p>
                <p className="text-xs mt-1">Choose an existing conversation or start a new one.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MessagesPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[400px] h-screen"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>}>
      <MessagesContent />
    </Suspense>
  );
}
