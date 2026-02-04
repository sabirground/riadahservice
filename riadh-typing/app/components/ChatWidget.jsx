"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! 👋 I'm here to help you with Riadh Typing & Typing Services. How can I assist you today? Whether it's visa services, business setup, or document processing, I'm here to help!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/enquiry/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.content }),
      });

      const data = await response.json();
      const assistantMessage = { role: "assistant", content: data.reply };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        role: "assistant",
        content: "Sorry, something went wrong. Please try again or contact us directly on WhatsApp.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  // Handle chat widget trigger from Windows views
  useEffect(() => {
    const handleOpenChat = (e) => {
      if (e.detail === "open-chat") {
        setIsOpen(true);
      }
    };

    window.addEventListener("open-chat", handleOpenChat);
    return () => window.removeEventListener("open-chat", handleOpenChat);
  }, []);

  return (
    <>
      {/* Chat Button - Professional UAE-style design */}
      <motion.button
        className="fixed bottom-24 right-8 md:bottom-28 w-16 h-16 md:w-18 md:h-18 bg-gradient-to-r from-uae-blue to-uae-blue-dark text-white rounded-2xl shadow-glow-uae flex items-center justify-center z-[9999] hover:scale-110 transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-uae-gold text-uae-blue rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">
            !
          </span>
        )}
      </motion.button>

      {/* Chat Window - Flat, modern design optimized for UAE version */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
  className="
    fixed bottom-32 right-4 md:right-8 md:bottom-36
    w-[95vw] sm:w-[380px] lg:w-[420px]
    h-[75vh] max-h-[600px]
    bg-white z-[9999]
    rounded-2xl shadow-lg
    flex flex-col overflow-hidden
  "

            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-uae-blue to-uae-blue-dark text-white p-5 border-b-2 border-uae-gold">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/30">
                    <svg className="w-5 h-5 text-uae-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm md:text-base">Riadh Typing Services</h3>
                    <p className="text-xs text-white/70 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      Online 24/7
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Chat Messages */}
           <div className="flex-1 overflow-y-auto p-4 bg-sand-50">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`mb-4 max-w-[85%] ${
                    message.role === "user" ? "ml-auto" : "mr-auto"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div
                    className={`p-4 rounded-xl ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-uae-blue to-uae-blue-dark text-white rounded-tr-sm shadow-glow-gold"
                        : "bg-white text-brand-text shadow-soft rounded-tl-sm border border-sand-200"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  className="mb-4 mr-auto max-w-[85%]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-white text-brand-text p-4 rounded-xl shadow-soft rounded-tl-sm border border-sand-200">
                    <div className="flex space-x-2">
                      <motion.div
                        className="w-2 h-2 bg-uae-gold rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-uae-gold rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-uae-gold rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white border-t border-sand-200">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message... (supports all languages)"
                  className="flex-1 px-5 py-3 border border-sand-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-uae-gold/50 focus:border-uae-gold transition-all duration-200"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className={`px-5 py-3 rounded-full transition-all duration-200 ${
                    input.trim() && !isTyping
                      ? "bg-gradient-to-r from-uae-blue to-uae-blue-dark text-white hover:shadow-glow-gold hover:scale-105"
                      : "bg-sand-300 text-sand-500 cursor-not-allowed"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-brand-muted text-center mt-2">
                Powered by Riadah Typing Office | Quick Support
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
