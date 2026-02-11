"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
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

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

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

        try {
          console.log("Sending lead data to Supabase:", finalData);
          const response = await fetch("/api/enquiry/leads", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...finalData,
              source: "chat" // Mark as chat lead
            }),
          });
          
          const result = await response.json();
          console.log("Lead API response:", result);
        } catch (err) {
          console.error("Lead API error:", err);
        }
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: botReply }]);
      setIsTyping(false);
    }, 400);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div id="chat-widget">
      {/* Chat Button */}
      <motion.button
        className="fixed bottom-24 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center z-[9999] hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          "✖"
        ) : (
          <img
            src="/Images/chaticon.jpg"
            alt="Chat"
            className="w-10 h-10 rounded-full object-cover"
          />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-32 right-4 w-[95vw] sm:w-[400px] h-[75vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-[9999] border border-gray-100"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <img
                  src="/Images/logo.png-removebg-preview.png"
                  alt="Riadah"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
                />
                <div>
                  <h3 className="font-semibold text-base">Riadah Support</h3>
                  <p className="text-xs text-blue-100">Abu Dhabi Al Ain Business Desk</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-blue-100">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-gray-100">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`mb-4 max-w-[85%] ${
                    msg.role === "user" ? "ml-auto text-right" : "mr-auto"
                  }`}
                >
                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
                        : "bg-white border border-gray-200 shadow-sm"
                    }`}
                  >
                    {msg.content}

                    {msg.options && !submitted && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {msg.options.map((opt, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleOptionClick(opt)}
                            className="px-4 py-2 text-xs bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:shadow-md hover:scale-105 transition-all duration-200"
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
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                  </div>
                  <span>Bot is typing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            {!submitted && (
              <div className="p-4 bg-white border-t border-gray-100">
                <div className="flex gap-3">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <button
                    onClick={handleSend}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full text-sm font-medium hover:shadow-md hover:scale-105 transition-all duration-200"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
