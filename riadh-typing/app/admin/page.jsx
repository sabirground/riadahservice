"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [exporting, setExporting] = useState(false);

  // 🔐 Check login
  useEffect(() => {
    const auth = localStorage.getItem("admin-auth");
    if (!auth) router.push("/admin/login");
  }, [router]);

  // 📥 Fetch leads
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch("/api/enquiry/admin/login/leads");
        const data = await res.json();
        // Ensure we have an array
        setLeads(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching leads:", error);
        setLeads([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  // 🔍 Filter leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      !searchTerm ||
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter =
      filterType === "all" ||
      (filterType === "chat" && lead.source === "chat") ||
      (filterType === "enquiry" && (!lead.source || lead.source === "enquiry")) ||
      (filterType === "get-quote" && lead.source === "get-quote");

    const leadDate = new Date(lead.created_at);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "today" && leadDate >= today) ||
      (dateFilter === "week" && leadDate >= weekAgo && leadDate < today) ||
      (dateFilter === "month" && leadDate >= monthAgo && leadDate < today);

    return matchesSearch && matchesFilter && matchesDate;
  });

  // 📥 Export to Excel
  const exportToExcel = async () => {
    setExporting(true);
    try {
      // Create CSV content
      const headers = ["Service", "Name", "Email", "Phone", "Message", "Date", "Source"];
      const rows = filteredLeads.map((lead) => [
        lead.service,
        lead.name,
        lead.email,
        lead.phone,
        lead.message,
        new Date(lead.created_at).toLocaleString(),
        lead.source || "enquiry"
      ]);

      const csvContent = [
        headers.join(","),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
      ].join("\n");

      // Create and download file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `riadh-leads-${new Date().toISOString().split("T")[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Export error:", error);
    } finally {
      setExporting(false);
    }
  };

  // 📊 Stats
  const filteredStats = {
    total: filteredLeads.length,
    chat: filteredLeads.filter(lead => lead.source === "chat").length,
    enquiry: filteredLeads.filter(lead => !lead.source || lead.source === "enquiry").length,
    getQuote: filteredLeads.filter(lead => lead.source === "get-quote").length
  };

  return (
    <div className="min-h-screen bg-sand-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-soft p-6 mb-6 transition-all duration-300 hover:shadow-soft-lg">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-brand-dark mb-1">
                Riadah Typing Office Dashboard
              </h1>
              <p className="text-body-sm text-brand-muted">Riadah CRM Admin Panel</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={exportToExcel}
                disabled={exporting || filteredLeads.length === 0}
                className="px-5 py-2.5 bg-uae-blue text-white rounded-lg text-sm font-medium hover:bg-uae-blue-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {exporting ? "Exporting..." : "Export Excel"}
              </button>
              <button
                onClick={() => router.push("/admin/login")}
                className="px-5 py-2.5 bg-white border border-sand-300 text-brand-dark rounded-lg text-sm font-medium hover:bg-sand-50 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

         {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-soft p-6 transition-all duration-300 hover:shadow-soft-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body-sm text-brand-muted font-medium mb-1">Total Leads</p>
                  <p className="text-3xl font-bold text-brand-dark">{filteredStats.total}</p>
                </div>
                <div className="bg-uae-blue/10 rounded-lg p-3">
                  <svg className="w-6 h-6 text-uae-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-soft p-6 transition-all duration-300 hover:shadow-soft-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body-sm text-brand-muted font-medium mb-1">Chat Leads</p>
                  <p className="text-3xl font-bold text-brand-dark">{filteredStats.chat}</p>
                </div>
                <div className="bg-green-100 rounded-lg p-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-soft p-6 transition-all duration-300 hover:shadow-soft-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body-sm text-brand-muted font-medium mb-1">Enquiry Leads</p>
                  <p className="text-3xl font-bold text-brand-dark">{filteredStats.enquiry}</p>
                </div>
                <div className="bg-gold-100 rounded-lg p-3">
                  <svg className="w-6 h-6 text-uae-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-soft p-6 transition-all duration-300 hover:shadow-soft-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body-sm text-brand-muted font-medium mb-1">Get Quote Leads</p>
                  <p className="text-3xl font-bold text-brand-dark">{filteredStats.getQuote}</p>
                </div>
                <div className="bg-purple-100 rounded-lg p-3">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-brand-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search leads by name, email, phone, service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-sand-300 rounded-lg text-sm bg-white placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-uae-gold focus:border-uae-gold transition-all"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2.5 border border-sand-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-uae-gold focus:border-uae-gold transition-all"
                >
                  <option value="all">All Leads</option>
                  <option value="chat">Chat Leads</option>
                  <option value="enquiry">Enquiry Leads</option>
                  <option value="get-quote">Get Quote Leads</option>
                </select>
            </div>
            <div className="w-full md:w-48">
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2.5 border border-sand-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-uae-gold focus:border-uae-gold transition-all"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
            </div>
          </div>
        </div>

        {/* Leads Table */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-soft p-12 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-uae-gold mx-auto mb-4"></div>
            <p className="text-brand-muted">Loading leads...</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-sand-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-brand-muted uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-brand-muted uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-brand-muted uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-brand-muted uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-brand-muted uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-brand-muted uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-brand-muted uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-sand-200">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-brand-muted">
                        <div className="flex flex-col items-center">
                          <svg className="h-10 w-10 text-sand-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                          <p className="text-sm">No leads found matching your criteria</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead, i) => (
                      <tr key={i} className="hover:bg-sand-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand-dark">
                          {lead.service}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-dark">
                          {lead.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-muted">
                          {lead.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-muted">
                          <a
                            href={`tel:${lead.phone}`}
                            className="text-uae-blue hover:text-uae-blue-dark transition-colors"
                          >
                            {lead.phone}
                          </a>
                        </td>
                        <td className="px-6 py-4 text-sm text-brand-muted">
                          <div className="max-w-xs truncate" title={lead.message}>
                            {lead.message}
                          </div>
                        </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded ${
                              lead.source === "chat" 
                                ? "bg-green-100 text-green-800" 
                                : lead.source === "get-quote"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-gold-100 text-gold-800"
                            }`}>
                              {lead.source === "chat" ? "Chat" : lead.source === "get-quote" ? "Get Quote" : "Enquiry"}
                            </span>
                          </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-muted">
                          {new Date(lead.created_at).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
             <div className="bg-sand-50 px-6 py-3 border-t border-sand-200">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-brand-muted">
                    Showing <span className="font-medium">{filteredLeads.length}</span> of{" "}
                    <span className="font-medium">{leads.length}</span> leads
                  </p>
                  {(filterType !== "all" || dateFilter !== "all" || searchTerm) && (
                    <button
                      onClick={() => {
                        setFilterType("all");
                        setDateFilter("all");
                        setSearchTerm("");
                      }}
                      className="text-sm text-uae-blue hover:text-uae-blue-dark transition-colors"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              </div>
          </div>
        )}
      </div>
    </div>
  );
}
