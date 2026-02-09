"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/enquiry/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        localStorage.setItem("admin-auth", "true");
        router.push("/admin");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sand-50">
      <div className="bg-white rounded-xl shadow-soft p-8 w-[380px] transition-all duration-300 hover:shadow-soft-lg">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-uae-blue rounded-lg flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:scale-105">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-brand-dark mb-2">
            Riadah Admin Panel
          </h2>
          <p className="text-body-sm text-brand-muted">
            Riadah Typing Office Dashboard
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="admin@riadh.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-2.5 border border-sand-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-uae-gold focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-2.5 border border-sand-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-uae-gold focus:border-transparent transition-all"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-uae-blue text-white py-2.5 rounded-lg text-sm font-medium hover:bg-uae-blue-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Signing in...
              </div>
            ) : (
              "Login"
            )}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-brand-muted">
            Powered by Riadah Typing Office & Typing Services
          </p>
        </div>
      </div>
    </div>
  );
}
