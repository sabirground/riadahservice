"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [step, setStep] = useState(0);

  const [leadData, setLeadData] = useState({
    service: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Welcome to Riadah Typing Office 🇦🇪\n\nPlease select a service:",
      options: [
        "Company Setup",
        "Visa Services",
        "Typing & Documentation",
        "Travel & Ticketing",
        "Other Services",
      ],
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Hide tooltip after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPhone = (phone) => /^[0-9+\-\s]{7,15}$/.test(phone);

  // ✅ Service selection
  const handleOptionClick = (option) => {
    if (submitted) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: option },
      {
        role: "assistant",
        content: `✅ You selected: "${option}"\n\nMay I know your full name?`,
      },
    ]);

    setLeadData((prev) => ({ ...prev, service: option }));
    setStep(1);
  };

  // ✅ Chat flow
  const handleSend = async () => {
    if (!input.trim() || submitted) return;

    const userInput = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userInput }]);
    setInput("");
    setIsTyping(true);

    let botReply = "";

    if (step === 1) {
      setLeadData((prev) => ({ ...prev, name: userInput }));
      botReply = "📧 Please enter your email address.";
      setStep(2);
    } else if (step === 2) {
      if (!isValidEmail(userInput)) {
        botReply = "⚠️ Please enter a valid email address.";
      } else {
        setLeadData((prev) => ({ ...prev, email: userInput }));
        botReply = "📞 Please share your contact number.";
        setStep(3);
      }
    } else if (step === 3) {
      if (!isValidPhone(userInput)) {
        botReply = "⚠️ Please enter a valid phone number.";
      } else {
        setLeadData((prev) => ({ ...prev, phone: userInput }));
        botReply = "✍️ Please describe your requirement briefly.";
        setStep(4);
      }
    } else if (step === 4) {
      const finalData = {
        ...leadData,
        message: userInput,
      };

      setLeadData(finalData);

      botReply =
        "✅ Thank you! Your request has been submitted.\nOur team will contact you shortly.";

      setSubmitted(true);
      setStep(5);

      await fetch("/api/enquiry/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...finalData,
          source: "chat"
        }),
      });
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: botReply }]);
      setIsTyping(false);
    }, 400);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  // Handle minimize - hides the chat but shows a small toggle button
  const handleMinimize = () => {
    setIsMinimized(true);
    setIsOpen(false);
  };

  // Handle close - hides everything, shows only the main chat button
  const handleClose = () => {
    setIsMinimized(false);
    setIsOpen(false);
  };

  // Handle reopen from minimized state
  const handleReopen = () => {
    setIsMinimized(false);
    setIsOpen(true);
  };

  // Toggle chat open/close
  const handleToggle = () => {
    if (isMinimized) {
      handleReopen();
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div id="chat-widget">
      {/* Minimized State Toggle - Shows when chat is minimized */}
      <AnimatePresence>
        {isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-[9999]"
          >
            <motion.button
              onClick={handleReopen}
              className="group relative w-16 h-16 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-full shadow-xl flex items-center justify-center hover:shadow-amber-500/40 hover:scale-105 transition-all duration-300 border-2 border-amber-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Premium minimized icon - chat bubbles */}
              <svg
                className="w-7 h-7 text-white drop-shadow-md"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              
              {/* Subtle shine effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            {/* Minimized tooltip */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute bottom-full left-0 mb-3 whitespace-nowrap"
            >
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl border border-slate-700">
                <p className="text-sm font-medium">Chat Ready</p>
                <p className="text-xs text-slate-400">Click to resume conversation</p>
                {/* Arrow */}
                <div className="absolute -bottom-2 left-6 w-4 h-4 bg-slate-800 transform rotate-45 border-r border-b border-slate-700"></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Button */}
      <div className="fixed bottom-24 right-6 z-[9999]">
        {/* Message Bubble Tooltip - Only show when chat is closed and not minimized */}
        <AnimatePresence>
          {!isOpen && !isMinimized && showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute bottom-full right-0 mb-3 whitespace-nowrap"
            >
              <div className="relative bg-gradient-to-r from-slate-800 to-slate-900 px-5 py-3 rounded-2xl shadow-xl border border-slate-700">
                <p className="text-sm font-semibold text-white">How can I assist you?</p>
                {/* Arrow pointing down */}
                <div className="absolute -bottom-2 right-6 w-4 h-4 bg-slate-800 transform rotate-45 border-r border-b border-slate-700"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          className="w-20 h-20 bg-transparent text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-amber-500/30 hover:scale-105 transition-all duration-300"
          onClick={handleToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? (
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <motion.div
              className="relative w-full h-full flex items-center justify-center"
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Premium Chat Icon - Preserved exactly as is */}
              <motion.div
                className="relative w-12 h-12"
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <img
                  src="/Images/chaticon3d-removebg-preview.png"
                  alt="Chat Icon"
                  className="w-full h-full relative z-10 object-contain"
                />
              </motion.div>
              
              {/* Subtle sparkle effect */}
              <motion.div
                className="absolute -top-2 -right-2 w-3 h-3 bg-amber-400 rounded-full shadow-lg"
                animate={{
                  scale: [0.5, 1, 0.5],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            </motion.div>
          )}
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-32 right-4 w-[95vw] sm:w-[420px] md:w-[440px] lg:w-[460px] h-[75vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-[9999] border border-amber-100"
            style={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(212, 175, 55, 0.1), 0 0 40px rgba(212, 175, 55, 0.05)"
            }}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Premium Header with UAE-inspired design */}
            <div className="bg-gradient-to-br from-slate-500 via-slate-700 to-slate-350 text-gold p-4 flex items-center justify-between shadow-lg border-b-2 border-amber-400/50">
              <div className="flex items-center gap-3">
                {/* Premium Chat Avatar */}
                <div className="relative">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.5)]"
                    animate={{
                      rotate: [0, 4, -4, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <img
                      src="/Images/chaticon3d-removebg-preview.png"
                      alt="Chat Avatar"
                      className="w-8 h-8 object-contain"
                    />
                  </motion.div>
                  {/* Online indicator */}
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 border-2 border-slate-900 rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-bold text-lg tracking-wide">Riadah Support</h3>
                  <p className="text-xs text-amber-400 font-medium">Riadah Business Desk</p>
                </div>
              </div>
              
              {/* Header Actions - Minimize and Close */}
              <div className="flex items-center gap-2">
                {/* Minimize Button */}
                <motion.button
                  onClick={handleMinimize}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Minimize"
                >
                  <svg className="w-5 h-5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </motion.button>
                
                {/* Close Button */}
                <motion.button
                  onClick={handleClose}
                  className="p-2 rounded-lg hover:bg-red-500/20 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Close"
                >
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Premium Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-slate-50 via-white to-amber-50/30">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`mb-4 max-w-[85%] ${
                    msg.role === "user" ? "ml-auto text-right" : "mr-auto"
                  }`}
                >
                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-slate-800 via-slate-800 to-slate-900 text-white shadow-md"
                        : "bg-white border border-amber-100 shadow-md"
                    }`}
                    style={msg.role === "user" ? {
                      boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)"
                    } : {
                      boxShadow: "0 2px 12px rgba(212, 175, 55, 0.08)"
                    }}
                  >
                    {msg.content}

                    {msg.options && !submitted && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {msg.options.map((opt, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleOptionClick(opt)}
                            className="px-4 py-2.5 text-xs font-semibold bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-900 rounded-full hover:shadow-lg hover:shadow-amber-500/30 hover:scale-105 transition-all duration-200 border border-amber-300"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <div className="flex gap-1">
                    <div className="w-2.5 h-2.5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2.5 h-2.5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2.5 h-2.5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full animate-bounce"></div>
                  </div>
                  <span className="font-medium">Bot is typing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Premium Input Area */}
            {!submitted && (
              <div className="p-4 bg-white border-t border-amber-100">
                <div className="flex gap-3">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-5 py-3.5 border-2 border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-3 focus:ring-amber-400/20 focus:border-amber-400 transition-all bg-slate-50"
                  />
                  <motion.button
                    onClick={handleSend}
                    className="px-6 py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-900 rounded-2xl text-sm font-bold hover:shadow-lg hover:shadow-amber-500/30 hover:scale-105 transition-all duration-200 border border-amber-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send
                  </motion.button>
                </div>
              </div>
            )}

            {/* Success State - Premium styling */}
            {submitted && (
              <div className="p-6 bg-gradient-to-b from-white to-amber-50/30 border-t border-amber-100">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h4 className="font-bold text-lg text-slate-800 mb-2">Request Submitted!</h4>
                  <p className="text-sm text-slate-600">Our team will contact you shortly.</p>
                  
                  {/* Start new conversation button */}
                  <motion.button
                    onClick={() => {
                      setSubmitted(false);
                      setStep(0);
                      setLeadData({
                        service: "",
                        name: "",
                        email: "",
                        phone: "",
                        message: "",
                      });
                      setMessages([
                        {
                          role: "assistant",
                          content:
                            "👋 Welcome to Riadah Typing Office 🇦🇪\n\nPlease select a service:",
                          options: [
                            "Company Setup",
                            "Visa Services",
                            "Typing & Documentation",
                            "Travel & Ticketing",
                            "Other Services",
                          ],
                        },
                      ]);
                    }}
                    className="mt-4 px-6 py-2.5 text-sm font-semibold text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-full transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start New Conversation
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
