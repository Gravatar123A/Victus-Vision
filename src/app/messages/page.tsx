"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Send, Paperclip, Search, Phone, Video, MoreVertical, Smile, ArrowLeft, Check, CheckCheck } from "lucide-react";
import { conversations, chatMessages } from "@/lib/mock-data";

export default function MessagesPage() {
  const [selectedConvo, setSelectedConvo] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] overflow-hidden" style={{ height: "calc(100vh - 160px)" }}>
        <div className="flex h-full">
          {/* Conversations List */}
          <div className={`${showSidebar ? "block" : "hidden"} md:block w-full md:w-80 border-r border-[var(--border-color)] flex-col`} style={{ display: showSidebar ? "flex" : undefined }}>
            <div className="p-4 border-b border-[var(--border-color)]">
              <h2 className="font-display font-semibold text-lg mb-3">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                <input type="text" placeholder="Search conversations..." className="w-full pl-10 pr-4 py-2 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--border-color)] focus:outline-none focus:border-primary" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map(convo => (
                <button
                  key={convo.id}
                  onClick={() => { setSelectedConvo(convo); setShowSidebar(false); }}
                  className={`w-full flex items-center gap-3 p-4 hover:bg-[var(--surface-alt)] transition-colors text-left ${selectedConvo.id === convo.id ? "bg-[var(--surface-alt)]" : ""}`}
                >
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white text-sm font-bold">{convo.user.name.charAt(0)}</div>
                    {convo.user.online && <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-[var(--surface)]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate">{convo.user.name}</p>
                      <span className="text-[10px] text-[var(--muted)] shrink-0">{convo.time}</span>
                    </div>
                    <p className="text-xs text-[var(--muted)] truncate mt-0.5">{convo.lastMessage}</p>
                  </div>
                  {convo.unread > 0 && (
                    <span className="w-5 h-5 rounded-full gradient-bg text-white text-[10px] flex items-center justify-center font-bold shrink-0">{convo.unread}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`${!showSidebar ? "flex" : "hidden"} md:flex flex-col flex-1`}>
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)]">
              <div className="flex items-center gap-3">
                <button onClick={() => setShowSidebar(true)} className="md:hidden p-1"><ArrowLeft className="w-5 h-5" /></button>
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center text-white text-sm font-bold">{selectedConvo.user.name.charAt(0)}</div>
                  {selectedConvo.user.online && <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-success rounded-full border-2 border-[var(--surface)]" />}
                </div>
                <div>
                  <p className="text-sm font-medium">{selectedConvo.user.name}</p>
                  <p className="text-xs text-success">{selectedConvo.user.online ? "Online" : "Offline"}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 rounded-xl hover:bg-[var(--surface-alt)] transition-colors"><Phone className="w-4 h-4 text-[var(--muted)]" /></button>
                <button className="p-2 rounded-xl hover:bg-[var(--surface-alt)] transition-colors"><Video className="w-4 h-4 text-[var(--muted)]" /></button>
                <button className="p-2 rounded-xl hover:bg-[var(--surface-alt)] transition-colors"><MoreVertical className="w-4 h-4 text-[var(--muted)]" /></button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg, i) => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={`flex ${msg.senderId === "me" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[70%] p-3 rounded-2xl text-sm ${msg.senderId === "me" ? "gradient-bg text-white rounded-br-md" : "bg-[var(--surface-alt)] border border-[var(--border-color)] rounded-bl-md"}`}>
                    <p>{msg.text}</p>
                    <div className={`flex items-center gap-1 mt-1 ${msg.senderId === "me" ? "justify-end" : ""}`}>
                      <span className={`text-[10px] ${msg.senderId === "me" ? "text-white/60" : "text-[var(--muted)]"}`}>{msg.time}</span>
                      {msg.senderId === "me" && <CheckCheck className="w-3 h-3 text-white/60" />}
                    </div>
                  </div>
                </motion.div>
              ))}
              {/* Typing Indicator */}
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl bg-[var(--surface-alt)] border border-[var(--border-color)] rounded-bl-md">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-[var(--muted)] animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-[var(--muted)] animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-[var(--muted)] animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-[var(--border-color)]">
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-xl hover:bg-[var(--surface-alt)] transition-colors"><Paperclip className="w-4 h-4 text-[var(--muted)]" /></button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--surface-alt)] border border-[var(--border-color)] focus:outline-none focus:border-primary transition-colors pr-10"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2"><Smile className="w-4 h-4 text-[var(--muted)]" /></button>
                </div>
                <button className="p-2.5 rounded-xl gradient-bg text-white hover:opacity-90 transition-opacity"><Send className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
