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
                onClick={() => setActiveTab("leads")}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "leads" 
                    ? "bg-uae-blue text-white" 
                    : "bg-white border border-sand-300 text-brand-dark hover:bg-sand-50"
                }`}
              >
                Leads
              </button>
              <button
                onClick={() => setActiveTab("gallery")}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "gallery" 
                    ? "bg-uae-gold text-white" 
                    : "bg-white border border-sand-300 text-brand-dark hover:bg-sand-50"
                }`}
              >
                Gallery
              </button>
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

        {/* Gallery Tab */}
        {activeTab === "gallery" && (
          <div className="space-y-6">
            {/* Gallery Header */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-brand-dark mb-1">
                    Gallery Management
                  </h2>
                  <p className="text-sm text-brand-muted">
                    Add and manage gallery images ({galleryImages.length} images)
                  </p>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-5 py-2.5 bg-uae-gold text-white rounded-lg text-sm font-medium hover:bg-uae-gold-dark transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Image
                </button>
              </div>
            </div>

            {/* Gallery Loading */}
            {galleryLoading ? (
              <div className="bg-white rounded-xl shadow-soft p-12 text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-uae-gold mx-auto mb-4"></div>
                <p className="text-brand-muted">Loading gallery...</p>
              </div>
            ) : (
              /* Gallery Grid */
              <div className="bg-white rounded-xl shadow-soft overflow-hidden">
                {galleryImages.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-sand-100 rounded-full flex items-center justify-center">
                      <svg className="w-10 h-10 text-sand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-brand-dark mb-2">No gallery images</h3>
                    <p className="text-brand-muted mb-4">Add your first image to get started.</p>
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="px-5 py-2.5 bg-uae-gold text-white rounded-lg text-sm font-medium hover:bg-uae-gold-dark transition-colors"
                    >
                      Add First Image
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6">
                    {galleryImages.map((image) => (
                      <div key={image.id || image.image_url} className="group relative rounded-lg overflow-hidden bg-sand-100">
                        <div className="aspect-[4/3] relative">
                          <Image
                            src={image.image_url}
                            alt={image.title || "Gallery image"}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEditClick(image)}
                              className="p-2 bg-uae-blue text-white rounded-full hover:bg-uae-blue-dark transition-colors"
                              title="Edit"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteImage(image.id)}
                              disabled={deletingId === image.id}
                              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors disabled:opacity-50"
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
                        </div>
                        <div className="p-3 bg-white">
                          <h4 className="font-medium text-brand-dark text-sm truncate">
                            {image.title || "Untitled"}
                          </h4>
                          <p className="text-xs text-brand-muted truncate">
                            {image.category}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Add Image Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full my-8">
              <div className="flex justify-between items-center p-6 pb-4 border-b border-sand-200 sticky top-0 bg-white rounded-t-xl">
                <h3 className="text-lg font-bold text-brand-dark">Add New Image</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1.5 hover:bg-sand-100 rounded-lg transition-colors bg-sand-50"
                >
                  <svg className="w-5 h-5 text-brand-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleAddImage} className="p-6 space-y-4 overflow-y-auto max-h-[60vh]">
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1">
                    Image <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    <input
                      type="url"
                      value={newImage.image_url}
                      onChange={(e) => setNewImage({ ...newImage, image_url: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                      className="block w-full px-3 py-2.5 border border-sand-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-uae-gold focus:border-uae-gold"
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
                        className="w-full px-3 py-2.5 border border-sand-300 rounded-lg text-sm bg-sand-50 text-brand-dark hover:bg-sand-100 transition-colors flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {uploadingFile ? "Uploading..." : "Upload from Computer"}
                      </button>
                    </div>
                    {newImage.image_url && (
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-sand-100">
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
                  <label className="block text-sm font-medium text-brand-dark mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newImage.title}
                    onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                    placeholder="Image title"
                    className="block w-full px-3 py-2.5 border border-sand-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-uae-gold focus:border-uae-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1">
                    Description
                  </label>
                  <textarea
                    value={newImage.description}
                    onChange={(e) => setNewImage({ ...newImage, description: e.target.value })}
                    placeholder="Image description"
                    rows={2}
                    className="block w-full px-3 py-2.5 border border-sand-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-uae-gold focus:border-uae-gold resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1">
                    Category
                  </label>
                  <select
                    value={newImage.category}
                    onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
                    className="block w-full px-3 py-2.5 border border-sand-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-uae-gold focus:border-uae-gold"
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
                    className="flex-1 px-5 py-2.5 border border-sand-300 text-brand-dark rounded-lg text-sm font-medium hover:bg-sand-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={addingImage || !newImage.image_url}
                    className="flex-1 px-5 py-2.5 bg-uae-gold text-white rounded-lg text-sm font-medium hover:bg-uae-gold-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full my-8">
              <div className="flex justify-between items-center p-6 pb-4 border-b border-sand-200 sticky top-0 bg-white rounded-t-xl">
                <h3 className="text-lg font-bold text-brand-dark">Edit Image</h3>
                <button
                  onClick={() => setEditingImage(null)}
                  className="p-1.5 hover:bg-sand-100 rounded-lg transition-colors bg-sand-50"
                >
                  <svg className="w-5 h-5 text-brand-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleUpdateImage} className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1">
                    Image <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    <input
                      type="url"
                      value={editImageData.image_url}
                      onChange={(e) => setEditImageData({ ...editImageData, image_url: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                      className="block w-full px-3 py-2.5 border border-sand-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-uae-gold focus:border-uae-gold"
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
                        className="w-full px-3 py-2.5 border border-sand-300 rounded-lg text-sm bg-sand-50 text-brand-dark hover:bg-sand-100 transition-colors flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {uploadingFile ? "Uploading..." : "Upload from Computer"}
                      </button>
                    </div>
                    {editImageData.image_url && (
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-sand-100">
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
                  <label className="block text-sm font-medium text-brand-dark mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editImageData.title}
                    onChange={(e) => setEditImageData({ ...editImageData, title: e.target.value })}
                    placeholder="Image title"
                    className="block w-full px-3 py-2.5 border border-sand-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-uae-gold focus:border-uae-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1">
                    Description
                  </label>
                  <textarea
                    value={editImageData.description}
                    onChange={(e) => setEditImageData({ ...editImageData, description: e.target.value })}
                    placeholder="Image description"
                    rows={2}
                    className="block w-full px-3 py-2.5 border border-sand-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-uae-gold focus:border-uae-gold resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1">
                    Category
                  </label>
                  <select
                    value={editImageData.category}
                    onChange={(e) => setEditImageData({ ...editImageData, category: e.target.value })}
                    className="block w-full px-3 py-2.5 border border-sand-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-uae-gold focus:border-uae-gold"
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
                    className="flex-1 px-5 py-2.5 border border-sand-300 text-brand-dark rounded-lg text-sm font-medium hover:bg-sand-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updatingImage}
                    className="flex-1 px-5 py-2.5 bg-uae-gold text-white rounded-lg text-sm font-medium hover:bg-uae-gold-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {updatingImage ? "Updating..." : "Update Image"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
