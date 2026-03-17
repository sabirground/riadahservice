"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminDashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [exporting, setExporting] = useState(false);
  
  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Gallery state
  const [activeTab, setActiveTab] = useState("leads");
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newImage, setNewImage] = useState({ image_url: "", title: "", description: "", category: "general" });
  const [addingImage, setAddingImage] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingImage, setEditingImage] = useState(null);
  const [editImageData, setEditImageData] = useState({ image_url: "", title: "", description: "", category: "general" });
  const [updatingImage, setUpdatingImage] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);

  // 🔐 Check login
  useEffect(() => {
    const auth = localStorage.getItem("admin-auth");
    if (!auth) router.push("/admin/login");
  }, [router]);

  // 📥 Fetch gallery images
  const fetchGalleryImages = async () => {
    setGalleryLoading(true);
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setGalleryImages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching gallery:", error);
      setGalleryImages([]);
    } finally {
      setGalleryLoading(false);
    }
  };

  // Add new gallery image
  const handleAddImage = async (e) => {
    e.preventDefault();
    if (!newImage.image_url) return;
    
    setAddingImage(true);
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newImage),
      });
      
      if (res.ok) {
        const addedImage = await res.json();
        setGalleryImages([addedImage, ...galleryImages]);
        setShowAddModal(false);
        setNewImage({ image_url: "", title: "", description: "", category: "general" });
      }
    } catch (error) {
      console.error("Error adding image:", error);
    } finally {
      setAddingImage(false);
    }
  };

  // Delete gallery image
  const handleDeleteImage = async (id) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    
    setDeletingId(id);
    try {
      const res = await fetch(`/api/gallery?id=${id}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        setGalleryImages(galleryImages.filter((img) => img.id !== id));
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    } finally {
      setDeletingId(null);
    }
  };

  // Handle file upload from computer
  const handleFileUpload = async (e, isEdit = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    setUploadingFile(true);
    try {
      // Convert to base64 for storage
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result;
        if (isEdit) {
          setEditImageData({ ...editImageData, image_url: base64 });
        } else {
          setNewImage({ ...newImage, image_url: base64 });
        }
        setUploadingFile(false);
      };
      reader.onerror = () => {
        alert("Failed to read file");
        setUploadingFile(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file");
      setUploadingFile(false);
    }
  };

  // Open edit modal
  const handleEditClick = (image) => {
    setEditingImage(image);
    setEditImageData({
      image_url: image.image_url || "",
      title: image.title || "",
      description: image.description || "",
      category: image.category || "general"
    });
  };

  // Update gallery image
  const handleUpdateImage = async (e) => {
    e.preventDefault();
    
    if (!editingImage?.id) {
      alert("No image selected for editing");
      return;
    }
    
    setUpdatingImage(true);
    try {
      const res = await fetch(`/api/gallery?id=${editingImage.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editImageData),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        // Refresh the gallery to get updated data
        await fetchGalleryImages();
        setEditingImage(null);
        setEditImageData({ image_url: "", title: "", description: "", category: "general" });
        alert("Image updated successfully!");
      } else {
        console.error("Update failed:", data);
        alert(data.error || "Failed to update image");
      }
    } catch (error) {
      console.error("Error updating image:", error);
      alert("Failed to update image. Please try again.");
    } finally {
      setUpdatingImage(false);
    }
  };

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

  // Fetch gallery when tab changes
  useEffect(() => {
    if (activeTab === "gallery") {
      fetchGalleryImages();
    }
  }, [activeTab]);

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

  // Navigation items
  const navItems = [
    { id: "leads", label: "Leads", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
    { id: "gallery", label: "Gallery", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="h-full bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl flex flex-col">
          {/* Logo */}
          <div className="h-20 flex items-center justify-center px-4 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 relative flex-shrink-0">
                <Image
                  src="/Images/logo.png-removebg-preview.png"
                  alt="Riadah Logo"
                  fill
                  className="object-contain"
                />
              </div>
              {sidebarOpen && (
                <div className="overflow-hidden">
                  <h1 className="text-white font-bold text-lg whitespace-nowrap">Riadah Admin</h1>
                  <p className="text-slate-400 text-xs whitespace-nowrap">CRM Panel</p>
                </div>
              )}
            </div>
          </div>

          {/* Toggle Sidebar Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-amber-500 hover:bg-amber-600 rounded-full flex items-center justify-center shadow-lg transition-colors z-50"
          >
            {sidebarOpen ? (
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            ) : (
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>

          {/* Navigation */}
          <nav className="flex-1 py-4 px-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/25'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                } ${!sidebarOpen && 'justify-center'}`}
              >
                <svg className={`w-5 h-5 flex-shrink-0 ${activeTab === item.id ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {sidebarOpen && <span className="font-medium whitespace-nowrap">{item.label}</span>}
              </button>
            ))}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-slate-700/50">
            <button
              onClick={() => router.push("/admin/login")}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 ${!sidebarOpen && 'justify-center'}`}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              {sidebarOpen && <span className="font-medium whitespace-nowrap">Logout</span>}
            </button>
            {!sidebarOpen && (
              <button 
                onClick={() => setSidebarOpen(true)}
                className="w-full flex justify-center pt-2"
              >
                <svg className="w-5 h-5 text-slate-400 hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {activeTab === 'leads' ? 'Leads Management' : 'Gallery Management'}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  {activeTab === 'leads' 
                    ? 'Manage and track all your customer inquiries' 
                    : 'Manage your gallery images and categories'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {activeTab === 'leads' && (
                  <button
                    onClick={exportToExcel}
                    disabled={exporting || filteredLeads.length === 0}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg text-sm font-medium hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {exporting ? 'Exporting...' : 'Export CSV'}
                  </button>
                )}
                {activeTab === 'gallery' && (
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg text-sm font-medium hover:from-amber-600 hover:to-amber-700 transition-all shadow-sm hover:shadow-md"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Image
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Leads */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">All Time</span>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">Total Leads</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">{filteredStats.total}</p>
            </div>

            {/* Chat Leads */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Live</span>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">Chat Leads</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">{filteredStats.chat}</p>
            </div>

            {/* Enquiry Leads */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Forms</span>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">Enquiry Leads</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">{filteredStats.enquiry}</p>
            </div>

            {/* Get Quote */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/25 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-violet-600 bg-violet-50 px-2 py-1 rounded-full">Quick</span>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">Get Quote</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">{filteredStats.getQuote}</p>
            </div>
          </div>

          {/* Search and Filter */}
          {activeTab === 'leads' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search by name, email, phone, service..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-48">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="block w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  >
                    <option value="all">All Sources</option>
                    <option value="chat">Chat Leads</option>
                    <option value="enquiry">Enquiry Leads</option>
                    <option value="get-quote">Get Quote</option>
                  </select>
                </div>
                <div className="w-full lg:w-48">
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="block w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Leads Table */}
          {activeTab === 'leads' && (
            <>
              {loading ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
                  <p className="text-gray-500">Loading leads...</p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Service
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Phone
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Message
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Source
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {filteredLeads.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="px-6 py-16 text-center">
                              <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                  <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                  </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">No leads found</h3>
                                <p className="text-gray-500 text-sm">Try adjusting your search or filter criteria</p>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          filteredLeads.map((lead, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition-colors duration-150">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-700">
                                  {lead.service}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                    {lead.name.charAt(0).toUpperCase()}
                                  </div>
                                  <span className="ml-3 text-sm font-medium text-gray-900">{lead.name}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {lead.email}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <a
                                  href={`tel:${lead.phone}`}
                                  className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                  </svg>
                                  {lead.phone}
                                </a>
                              </td>
                              <td className="px-6 py-4">
                                <div className="max-w-xs truncate text-sm text-gray-600" title={lead.message}>
                                  {lead.message}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                  lead.source === "chat" 
                                    ? "bg-emerald-100 text-emerald-700" 
                                    : lead.source === "get-quote"
                                    ? "bg-violet-100 text-violet-700"
                                    : "bg-amber-100 text-amber-700"
                                }`}>
                                  {lead.source === "chat" ? (
                                    <><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"></span>Chat</>
                                  ) : lead.source === "get-quote" ? (
                                    <><span className="w-1.5 h-1.5 bg-violet-500 rounded-full mr-1.5"></span>Get Quote</>
                                  ) : (
                                    <><span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1.5"></span>Enquiry</>
                                  )}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  {new Date(lead.created_at).toLocaleDateString()}
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                  {filteredLeads.length > 0 && (
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                        <p className="text-sm text-gray-600">
                          Showing <span className="font-semibold text-gray-900">{filteredLeads.length}</span> of{" "}
                          <span className="font-semibold text-gray-900">{leads.length}</span> leads
                        </p>
                        {(filterType !== "all" || dateFilter !== "all" || searchTerm) && (
                          <button
                            onClick={() => {
                              setFilterType("all");
                              setDateFilter("all");
                              setSearchTerm("");
                            }}
                            className="inline-flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700 font-medium transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Clear filters
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              {/* Gallery Stats */}
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-white text-xl font-bold mb-1">Gallery Overview</h2>
                    <p className="text-slate-400 text-sm">Manage and organize your image gallery</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-white">{galleryImages.length}</p>
                    <p className="text-slate-400 text-sm">Total Images</p>
                  </div>
                </div>
              </div>

              {/* Gallery Loading */}
              {galleryLoading ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
                  <p className="text-gray-500">Loading gallery...</p>
                </div>
              ) : galleryImages.length === 0 ? (
                /* Empty Gallery */
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-16 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No gallery images yet</h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">Start building your gallery by adding your first image. You can upload from your computer or add image URLs.</p>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl text-sm font-medium hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-500/25 hover:shadow-xl"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Your First Image
                  </button>
                </div>
              ) : (
                /* Gallery Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {galleryImages.map((image) => (
                    <div key={image.id || image.image_url} className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all duration-300">
                      <div className="relative aspect-[4/3] bg-gray-100">
                        <Image
                          src={image.image_url}
                          alt={image.title || "Gallery image"}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4 gap-2">
                          <button
                            onClick={() => handleEditClick(image)}
                            className="p-2.5 bg-white/90 backdrop-blur-sm text-gray-900 rounded-xl hover:bg-white transition-colors shadow-lg"
                            title="Edit"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteImage(image.id)}
                            disabled={deletingId === image.id}
                            className="p-2.5 bg-white/90 backdrop-blur-sm text-red-600 rounded-xl hover:bg-white transition-colors shadow-lg disabled:opacity-50"
                          >
                            {deletingId === image.id ? (
                              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                            ) : (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            )}
                          </button>
                        </div>
                        {image.category && (
                          <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-lg">
                            {image.category}
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 text-sm truncate">
                          {image.title || "Untitled Image"}
                        </h4>
                        {image.description && (
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {image.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Add Image Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-scale-in">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Add New Image</h3>
                <p className="text-sm text-gray-500">Upload or add image URL</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-200 rounded-xl transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleAddImage} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Image <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  <input
                    type="url"
                    value={newImage.image_url}
                    onChange={(e) => setNewImage({ ...newImage, image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="block w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={uploadingFile}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <button
                      type="button"
                      disabled={uploadingFile}
                      className="w-full px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-600 hover:border-amber-400 hover:bg-amber-50/50 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {uploadingFile ? "Uploading..." : "Click to Upload from Computer"}
                    </button>
                  </div>
                  {newImage.image_url && (
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                      <img
                        src={newImage.image_url}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={newImage.title}
                  onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                  placeholder="Image title"
                  className="block w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Description
                </label>
                <textarea
                  value={newImage.description}
                  onChange={(e) => setNewImage({ ...newImage, description: e.target.value })}
                  placeholder="Image description"
                  rows={3}
                  className="block w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Category
                </label>
                <select
                  value={newImage.category}
                  onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
                  className="block w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                >
                  <option value="general">General</option>
                  <option value="lobby">Lobby</option>
                  <option value="reception">Reception</option>
                  <option value="office">Office</option>
                  <option value="meeting">Meeting Room</option>
                  <option value="lounge">Lounge</option>
                  <option value="atrium">Atrium</option>
                  <option value="business">Business Center</option>
                  <option value="conference">Conference Hall</option>
                  <option value="interior">Interior</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-5 py-3 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addingImage || !newImage.image_url}
                  className="flex-1 px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl text-sm font-medium hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {addingImage ? "Adding..." : "Add Image"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Image Modal */}
      {editingImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-scale-in">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Edit Image</h3>
                <p className="text-sm text-gray-500">Update image details</p>
              </div>
              <button
                onClick={() => setEditingImage(null)}
                className="p-2 hover:bg-gray-200 rounded-xl transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleUpdateImage} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Image <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  <input
                    type="url"
                    value={editImageData.image_url}
                    onChange={(e) => setEditImageData({ ...editImageData, image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="block w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, true)}
                      disabled={uploadingFile}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <button
                      type="button"
                      disabled={uploadingFile}
                      className="w-full px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-600 hover:border-amber-400 hover:bg-amber-50/50 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {uploadingFile ? "Uploading..." : "Click to Upload from Computer"}
                    </button>
                  </div>
                  {editImageData.image_url && (
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                      <img
                        src={editImageData.image_url}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={editImageData.title}
                  onChange={(e) => setEditImageData({ ...editImageData, title: e.target.value })}
                  placeholder="Image title"
                  className="block w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Description
                </label>
                <textarea
                  value={editImageData.description}
                  onChange={(e) => setEditImageData({ ...editImageData, description: e.target.value })}
                  placeholder="Image description"
                  rows={3}
                  className="block w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Category
                </label>
                <select
                  value={editImageData.category}
                  onChange={(e) => setEditImageData({ ...editImageData, category: e.target.value })}
                  className="block w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                >
                  <option value="general">General</option>
                  <option value="lobby">Lobby</option>
                  <option value="reception">Reception</option>
                  <option value="office">Office</option>
                  <option value="meeting">Meeting Room</option>
                  <option value="lounge">Lounge</option>
                  <option value="atrium">Atrium</option>
                  <option value="business">Business Center</option>
                  <option value="conference">Conference Hall</option>
                  <option value="interior">Interior</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingImage(null)}
                  className="flex-1 px-5 py-3 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updatingImage}
                  className="flex-1 px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl text-sm font-medium hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {updatingImage ? "Updating..." : "Update Image"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add animation styles */}
      <style jsx global>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scaleIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
