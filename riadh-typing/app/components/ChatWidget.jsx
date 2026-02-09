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
        className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black rounded-full shadow-lg flex items-center justify-center z-[9999]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✖" : "💬"}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-32 right-4 w-[95vw] sm:w-[380px] h-[70vh] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden z-[9999]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            {/* Header */}
            <div className="bg-black text-white p-4 flex items-center gap-2">
              <img
                src="/logo.png"
                alt="Riadah"
                className="w-8 h-8 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-sm">Riadah Support</h3>
                <p className="text-xs text-gray-300">Dubai Business Desk</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`mb-3 max-w-[80%] ${
                    msg.role === "user" ? "ml-auto text-right" : "mr-auto"
                  }`}
                >
                  <div
                    className={`p-3 rounded-xl text-sm ${
                      msg.role === "user"
                        ? "bg-yellow-500 text-black"
                        : "bg-white border shadow-sm"
                    }`}
                  >
                    {msg.content}

                    {msg.options && !submitted && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {msg.options.map((opt, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleOptionClick(opt)}
                            className="px-3 py-1 text-xs bg-black text-white rounded-full hover:bg-gray-800"
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
                <div className="text-xs text-gray-500">Bot is typing...</div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            {!submitted && (
              <div className="p-3 border-t flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type here..."
                  className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none"
                />
                <button
                  onClick={handleSend}
                  className="px-4 py-2 bg-black text-white rounded-lg text-sm"
                >
                  Send
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
