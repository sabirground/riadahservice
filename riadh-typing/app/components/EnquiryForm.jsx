"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { rawServices } from "../data/services.js";
import serviceDocuments from "@/app/lib/serviceDocuments.js";

const EnquiryForm = ({ preSelectedServices = [] }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { services: preSelectedServices },
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedServices, setSelectedServices] = useState(preSelectedServices);
  
  // Services dropdown state
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [servicesSearchTerm, setServicesSearchTerm] = useState('');

  const onSubmit = async (data) => {

    // Log form data for debugging
    console.log("Form submission data:", {
      ...data,
      countryCode: selectedCountry.dialCode,
      selectedServices,
    });

    // Validate services
    if (!selectedServices || selectedServices.length === 0) {
      alert("Please select at least one service");
      return;
    }

    setIsLoading(true);

     try {
      // Send to main enquiry endpoint
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...data, 
          countryCode: selectedCountry.dialCode, 
          services: selectedServices 
        }),
      });

      // Also send to leads endpoint for Supabase storage
      try {
        // Determine source based on current page
        const isGetQuotePage = window.location.pathname === "/get-quote";
        await fetch("/api/enquiry/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service: selectedServices.join(", "),
            name: data.name,
            email: data.email,
            phone: `${selectedCountry.dialCode} ${data.mobile}`,
            message: data.message,
            source: isGetQuotePage ? "get-quote" : "enquiry" // Set source based on page
          }),
        });
      } catch (leadError) {
        console.error("Lead API error:", leadError);
      }

      let result;
      try {
        result = await response.json();
      } catch (parseError) {
        console.error("Error parsing response:", parseError);
        result = { message: "Invalid response from server" };
      }

      if (response.ok && result.success) {
        setIsSubmitted(true);
        setSubmittedData(data);
      } else {
        console.error("Enquiry submission failed:", result);
        alert(`Failed to submit enquiry: ${result?.message || "Please try again"}`);
      }
    } catch (error) {
      console.error("Enquiry submission error:", error);
      alert(`An error occurred: ${error.message || "Please check your internet connection and try again"}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Country data with dial codes (comprehensive list of major countries)
  const countries = [
    { name: "Afghanistan", code: "AF", dialCode: "+93", format: /^\d{9}$/ },
    { name: "Albania", code: "AL", dialCode: "+355", format: /^\d{8,9}$/ },
    { name: "Algeria", code: "DZ", dialCode: "+213", format: /^\d{9}$/ },
    { name: "Andorra", code: "AD", dialCode: "+376", format: /^\d{6}$/ },
    { name: "Angola", code: "AO", dialCode: "+244", format: /^\d{9}$/ },
    { name: "Argentina", code: "AR", dialCode: "+54", format: /^\d{10}$/ },
    { name: "Armenia", code: "AM", dialCode: "+374", format: /^\d{8}$/ },
    { name: "Australia", code: "AU", dialCode: "+61", format: /^\d{9}$/ },
    { name: "Austria", code: "AT", dialCode: "+43", format: /^\d{9}$/ },
    { name: "Azerbaijan", code: "AZ", dialCode: "+994", format: /^\d{9}$/ },
    { name: "Bahrain", code: "BH", dialCode: "+973", format: /^\d{8}$/ },
    { name: "Bangladesh", code: "BD", dialCode: "+880", format: /^\d{10}$/ },
    { name: "Belarus", code: "BY", dialCode: "+375", format: /^\d{9}$/ },
    { name: "Belgium", code: "BE", dialCode: "+32", format: /^\d{9}$/ },
    { name: "Benin", code: "BJ", dialCode: "+229", format: /^\d{8}$/ },
    { name: "Bhutan", code: "BT", dialCode: "+975", format: /^\d{8}$/ },
    { name: "Bolivia", code: "BO", dialCode: "+591", format: /^\d{8}$/ },
    { name: "Bosnia and Herzegovina", code: "BA", dialCode: "+387", format: /^\d{8}$/ },
    { name: "Botswana", code: "BW", dialCode: "+267", format: /^\d{7}$/ },
    { name: "Brazil", code: "BR", dialCode: "+55", format: /^\d{10,11}$/ },
    { name: "Brunei", code: "BN", dialCode: "+673", format: /^\d{7}$/ },
    { name: "Bulgaria", code: "BG", dialCode: "+359", format: /^\d{9}$/ },
    { name: "Burkina Faso", code: "BF", dialCode: "+226", format: /^\d{8}$/ },
    { name: "Burundi", code: "BI", dialCode: "+257", format: /^\d{8}$/ },
    { name: "Cambodia", code: "KH", dialCode: "+855", format: /^\d{9}$/ },
    { name: "Cameroon", code: "CM", dialCode: "+237", format: /^\d{9}$/ },
    { name: "Canada", code: "CA", dialCode: "+1", format: /^\d{10}$/ },
    { name: "Cape Verde", code: "CV", dialCode: "+238", format: /^\d{7}$/ },
    { name: "Central African Republic", code: "CF", dialCode: "+236", format: /^\d{7}$/ },
    { name: "Chad", code: "TD", dialCode: "+235", format: /^\d{8}$/ },
    { name: "Chile", code: "CL", dialCode: "+56", format: /^\d{9}$/ },
    { name: "China", code: "CN", dialCode: "+86", format: /^\d{11}$/ },
    { name: "Colombia", code: "CO", dialCode: "+57", format: /^\d{10}$/ },
    { name: "Comoros", code: "KM", dialCode: "+269", format: /^\d{7}$/ },
    { name: "Congo", code: "CG", dialCode: "+242", format: /^\d{9}$/ },
    { name: "Costa Rica", code: "CR", dialCode: "+506", format: /^\d{8}$/ },
    { name: "Croatia", code: "HR", dialCode: "+385", format: /^\d{8}$/ },
    { name: "Cuba", code: "CU", dialCode: "+53", format: /^\d{8}$/ },
    { name: "Cyprus", code: "CY", dialCode: "+357", format: /^\d{8}$/ },
    { name: "Czech Republic", code: "CZ", dialCode: "+420", format: /^\d{9}$/ },
    { name: "Denmark", code: "DK", dialCode: "+45", format: /^\d{8}$/ },
    { name: "Djibouti", code: "DJ", dialCode: "+253", format: /^\d{8}$/ },
    { name: "Dominican Republic", code: "DO", dialCode: "+1", format: /^\d{10}$/ },
    { name: "Ecuador", code: "EC", dialCode: "+593", format: /^\d{9}$/ },
    { name: "Egypt", code: "EG", dialCode: "+20", format: /^\d{10}$/ },
    { name: "El Salvador", code: "SV", dialCode: "+503", format: /^\d{8}$/ },
    { name: "Equatorial Guinea", code: "GQ", dialCode: "+240", format: /^\d{7}$/ },
    { name: "Eritrea", code: "ER", dialCode: "+291", format: /^\d{7}$/ },
    { name: "Estonia", code: "EE", dialCode: "+372", format: /^\d{7,8}$/ },
    { name: "Ethiopia", code: "ET", dialCode: "+251", format: /^\d{9}$/ },
    { name: "Fiji", code: "FJ", dialCode: "+679", format: /^\d{7}$/ },
    { name: "Finland", code: "FI", dialCode: "+358", format: /^\d{8}$/ },
    { name: "France", code: "FR", dialCode: "+33", format: /^\d{9}$/ },
    { name: "Gabon", code: "GA", dialCode: "+241", format: /^\d{8}$/ },
    { name: "Gambia", code: "GM", dialCode: "+220", format: /^\d{7}$/ },
    { name: "Georgia", code: "GE", dialCode: "+995", format: /^\d{9}$/ },
    { name: "Germany", code: "DE", dialCode: "+49", format: /^\d{10}$/ },
    { name: "Ghana", code: "GH", dialCode: "+233", format: /^\d{9}$/ },
    { name: "Greece", code: "GR", dialCode: "+30", format: /^\d{10}$/ },
    { name: "Guatemala", code: "GT", dialCode: "+502", format: /^\d{8}$/ },
    { name: "Guinea", code: "GN", dialCode: "+224", format: /^\d{8}$/ },
    { name: "Guinea-Bissau", code: "GW", dialCode: "+245", format: /^\d{7}$/ },
    { name: "Guyana", code: "GY", dialCode: "+592", format: /^\d{7}$/ },
    { name: "Haiti", code: "HT", dialCode: "+509", format: /^\d{8}$/ },
    { name: "Honduras", code: "HN", dialCode: "+504", format: /^\d{8}$/ },
    { name: "Hungary", code: "HU", dialCode: "+36", format: /^\d{9}$/ },
    { name: "Iceland", code: "IS", dialCode: "+354", format: /^\d{7}$/ },
    { name: "India", code: "IN", dialCode: "+91", format: /^\d{10}$/ },
    { name: "Indonesia", code: "ID", dialCode: "+62", format: /^\d{10,12}$/ },
    { name: "Iran", code: "IR", dialCode: "+98", format: /^\d{10}$/ },
    { name: "Iraq", code: "IQ", dialCode: "+964", format: /^\d{10}$/ },
    { name: "Ireland", code: "IE", dialCode: "+353", format: /^\d{9}$/ },
    { name: "Israel", code: "IL", dialCode: "+972", format: /^\d{9}$/ },
    { name: "Italy", code: "IT", dialCode: "+39", format: /^\d{10}$/ },
    { name: "Ivory Coast", code: "CI", dialCode: "+225", format: /^\d{8}$/ },
    { name: "Jamaica", code: "JM", dialCode: "+1", format: /^\d{10}$/ },
    { name: "Japan", code: "JP", dialCode: "+81", format: /^\d{10}$/ },
    { name: "Jordan", code: "JO", dialCode: "+962", format: /^\d{9}$/ },
    { name: "Kazakhstan", code: "KZ", dialCode: "+7", format: /^\d{10}$/ },
    { name: "Kenya", code: "KE", dialCode: "+254", format: /^\d{9}$/ },
    { name: "Kiribati", code: "KI", dialCode: "+686", format: /^\d{5}$/ },
    { name: "Kuwait", code: "KW", dialCode: "+965", format: /^\d{8}$/ },
    { name: "Kyrgyzstan", code: "KG", dialCode: "+996", format: /^\d{9}$/ },
    { name: "Laos", code: "LA", dialCode: "+856", format: /^\d{9}$/ },
    { name: "Latvia", code: "LV", dialCode: "+371", format: /^\d{8}$/ },
    { name: "Lebanon", code: "LB", dialCode: "+961", format: /^\d{8}$/ },
    { name: "Lesotho", code: "LS", dialCode: "+266", format: /^\d{8}$/ },
    { name: "Liberia", code: "LR", dialCode: "+231", format: /^\d{7}$/ },
    { name: "Libya", code: "LY", dialCode: "+218", format: /^\d{9}$/ },
    { name: "Liechtenstein", code: "LI", dialCode: "+423", format: /^\d{7}$/ },
    { name: "Lithuania", code: "LT", dialCode: "+370", format: /^\d{8}$/ },
    { name: "Luxembourg", code: "LU", dialCode: "+352", format: /^\d{9}$/ },
    { name: "Madagascar", code: "MG", dialCode: "+261", format: /^\d{9}$/ },
    { name: "Malawi", code: "MW", dialCode: "+265", format: /^\d{8}$/ },
    { name: "Malaysia", code: "MY", dialCode: "+60", format: /^\d{9}$/ },
    { name: "Maldives", code: "MV", dialCode: "+960", format: /^\d{7}$/ },
    { name: "Mali", code: "ML", dialCode: "+223", format: /^\d{8}$/ },
    { name: "Malta", code: "MT", dialCode: "+356", format: /^\d{8}$/ },
    { name: "Marshall Islands", code: "MH", dialCode: "+692", format: /^\d{4}$/ },
    { name: "Mauritania", code: "MR", dialCode: "+222", format: /^\d{8}$/ },
    { name: "Mauritius", code: "MU", dialCode: "+230", format: /^\d{8}$/ },
    { name: "Mexico", code: "MX", dialCode: "+52", format: /^\d{10}$/ },
    { name: "Micronesia", code: "FM", dialCode: "+691", format: /^\d{7}$/ },
    { name: "Moldova", code: "MD", dialCode: "+373", format: /^\d{8}$/ },
    { name: "Monaco", code: "MC", dialCode: "+377", format: /^\d{8}$/ },
    { name: "Mongolia", code: "MN", dialCode: "+976", format: /^\d{8}$/ },
    { name: "Montenegro", code: "ME", dialCode: "+382", format: /^\d{8}$/ },
    { name: "Morocco", code: "MA", dialCode: "+212", format: /^\d{9}$/ },
    { name: "Mozambique", code: "MZ", dialCode: "+258", format: /^\d{9}$/ },
    { name: "Myanmar", code: "MM", dialCode: "+95", format: /^\d{9}$/ },
    { name: "Namibia", code: "NA", dialCode: "+264", format: /^\d{9}$/ },
    { name: "Nauru", code: "NR", dialCode: "+674", format: /^\d{4}$/ },
    { name: "Nepal", code: "NP", dialCode: "+977", format: /^\d{9}$/ },
    { name: "Netherlands", code: "NL", dialCode: "+31", format: /^\d{9}$/ },
    { name: "New Zealand", code: "NZ", dialCode: "+64", format: /^\d{8}$/ },
    { name: "Nicaragua", code: "NI", dialCode: "+505", format: /^\d{8}$/ },
    { name: "Niger", code: "NE", dialCode: "+227", format: /^\d{8}$/ },
    { name: "Nigeria", code: "NG", dialCode: "+234", format: /^\d{10}$/ },
    { name: "North Korea", code: "KP", dialCode: "+850", format: /^\d{8}$/ },
    { name: "Norway", code: "NO", dialCode: "+47", format: /^\d{8}$/ },
    { name: "Oman", code: "OM", dialCode: "+968", format: /^\d{8}$/ },
    { name: "Pakistan", code: "PK", dialCode: "+92", format: /^\d{10,11}$/ },
    { name: "Palau", code: "PW", dialCode: "+680", format: /^\d{7}$/ },
    { name: "Palestine", code: "PS", dialCode: "+970", format: /^\d{9}$/ },
    { name: "Panama", code: "PA", dialCode: "+507", format: /^\d{8}$/ },
    { name: "Papua New Guinea", code: "PG", dialCode: "+675", format: /^\d{9}$/ },
    { name: "Paraguay", code: "PY", dialCode: "+595", format: /^\d{9}$/ },
    { name: "Peru", code: "PE", dialCode: "+51", format: /^\d{9}$/ },
    { name: "Philippines", code: "PH", dialCode: "+63", format: /^\d{10,11}$/ },
    { name: "Poland", code: "PL", dialCode: "+48", format: /^\d{9}$/ },
    { name: "Portugal", code: "PT", dialCode: "+351", format: /^\d{9}$/ },
    { name: "Qatar", code: "QA", dialCode: "+974", format: /^\d{8}$/ },
    { name: "Romania", code: "RO", dialCode: "+40", format: /^\d{9}$/ },
    { name: "Russia", code: "RU", dialCode: "+7", format: /^\d{10}$/ },
    { name: "Rwanda", code: "RW", dialCode: "+250", format: /^\d{9}$/ },
    { name: "Saint Kitts and Nevis", code: "KN", dialCode: "+1", format: /^\d{10}$/ },
    { name: "Saint Lucia", code: "LC", dialCode: "+1", format: /^\d{10}$/ },
    { name: "Saint Vincent and the Grenadines", code: "VC", dialCode: "+1", format: /^\d{10}$/ },
    { name: "Samoa", code: "WS", dialCode: "+685", format: /^\d{5}$/ },
    { name: "San Marino", code: "SM", dialCode: "+378", format: /^\d{8}$/ },
    { name: "Sao Tome and Principe", code: "ST", dialCode: "+239", format: /^\d{6}$/ },
    { name: "Saudi Arabia", code: "SA", dialCode: "+966", format: /^\d{9}$/ },
    { name: "Senegal", code: "SN", dialCode: "+221", format: /^\d{9}$/ },
    { name: "Serbia", code: "RS", dialCode: "+381", format: /^\d{8}$/ },
    { name: "Seychelles", code: "SC", dialCode: "+248", format: /^\d{7}$/ },
    { name: "Sierra Leone", code: "SL", dialCode: "+232", format: /^\d{8}$/ },
    { name: "Singapore", code: "SG", dialCode: "+65", format: /^\d{8}$/ },
    { name: "Slovakia", code: "SK", dialCode: "+421", format: /^\d{9}$/ },
    { name: "Slovenia", code: "SI", dialCode: "+386", format: /^\d{8}$/ },
    { name: "Solomon Islands", code: "SB", dialCode: "+677", format: /^\d{5}$/ },
    { name: "Somalia", code: "SO", dialCode: "+252", format: /^\d{8}$/ },
    { name: "South Africa", code: "ZA", dialCode: "+27", format: /^\d{9}$/ },
    { name: "South Korea", code: "KR", dialCode: "+82", format: /^\d{10}$/ },
    { name: "South Sudan", code: "SS", dialCode: "+211", format: /^\d{9}$/ },
    { name: "Spain", code: "ES", dialCode: "+34", format: /^\d{9}$/ },
    { name: "Sri Lanka", code: "LK", dialCode: "+94", format: /^\d{9,10}$/ },
    { name: "Sudan", code: "SD", dialCode: "+249", format: /^\d{9}$/ },
    { name: "Suriname", code: "SR", dialCode: "+597", format: /^\d{7}$/ },
    { name: "Swaziland", code: "SZ", dialCode: "+268", format: /^\d{8}$/ },
    { name: "Sweden", code: "SE", dialCode: "+46", format: /^\d{9}$/ },
    { name: "Switzerland", code: "CH", dialCode: "+41", format: /^\d{9}$/ },
    { name: "Syria", code: "SY", dialCode: "+963", format: /^\d{9}$/ },
    { name: "Taiwan", code: "TW", dialCode: "+886", format: /^\d{9}$/ },
    { name: "Tajikistan", code: "TJ", dialCode: "+992", format: /^\d{9}$/ },
    { name: "Tanzania", code: "TZ", dialCode: "+255", format: /^\d{9}$/ },
    { name: "Thailand", code: "TH", dialCode: "+66", format: /^\d{9}$/ },
    { name: "Timor-Leste", code: "TL", dialCode: "+670", format: /^\d{8}$/ },
    { name: "Togo", code: "TG", dialCode: "+228", format: /^\d{8}$/ },
    { name: "Tonga", code: "TO", dialCode: "+676", format: /^\d{5}$/ },
    { name: "Trinidad and Tobago", code: "TT", dialCode: "+1", format: /^\d{10}$/ },
    { name: "Tunisia", code: "TN", dialCode: "+216", format: /^\d{8}$/ },
    { name: "Turkey", code: "TR", dialCode: "+90", format: /^\d{10}$/ },
    { name: "Turkmenistan", code: "TM", dialCode: "+993", format: /^\d{8}$/ },
    { name: "Tuvalu", code: "TV", dialCode: "+688", format: /^\d{4}$/ },
    { name: "Uganda", code: "UG", dialCode: "+256", format: /^\d{9}$/ },
    { name: "Ukraine", code: "UA", dialCode: "+380", format: /^\d{9}$/ },
    { name: "United Arab Emirates", code: "AE", dialCode: "+971", format: /^\d{9}$/ },
    { name: "United Kingdom", code: "GB", dialCode: "+44", format: /^\d{10,11}$/ },
    { name: "United States", code: "US", dialCode: "+1", format: /^\d{10}$/ },
    { name: "Uruguay", code: "UY", dialCode: "+598", format: /^\d{9}$/ },
    { name: "Uzbekistan", code: "UZ", dialCode: "+998", format: /^\d{9}$/ },
    { name: "Vanuatu", code: "VU", dialCode: "+678", format: /^\d{7}$/ },
    { name: "Vatican City", code: "VA", dialCode: "+379", format: /^\d{8}$/ },
    { name: "Venezuela", code: "VE", dialCode: "+58", format: /^\d{10}$/ },
    { name: "Vietnam", code: "VN", dialCode: "+84", format: /^\d{9}$/ },
    { name: "Yemen", code: "YE", dialCode: "+967", format: /^\d{8}$/ },
    { name: "Zambia", code: "ZM", dialCode: "+260", format: /^\d{9}$/ },
    { name: "Zimbabwe", code: "ZW", dialCode: "+263", format: /^\d{9}$/ },
  ];

  const inputClasses =
    "w-full px-4 py-3.5 border-2 border-sand-200 rounded-xl focus:border-gold-400 focus:ring-2 focus:ring-gold-200 transition-all duration-300 bg-sand-50/50 text-slate-800 placeholder-slate-400";

  const labelClasses =
    "flex items-center text-sm font-semibold text-slate-700 mb-2";

  const errorClasses = "text-red-500 text-sm flex items-center mt-1.5";

  const selectClasses =
    "px-4 py-3.5 border-2 border-sand-200 rounded-xl focus:border-gold-400 focus:ring-2 focus:ring-gold-200 transition-all duration-300 bg-sand-50/50 text-slate-800 cursor-pointer";

  // Country search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  // Filter countries based on search term
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.dialCode.includes(searchTerm)
  );

  // Handle country selection
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setShowDropdown(false);
    setSearchTerm("");
  };

  // Handle search input
  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
    setShowDropdown(true);
  };

  return (
    <AnimatePresence mode="wait">
      {isSubmitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="glass-card p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow-gold"
            >
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              Thank You!
            </h2>
            <p className="text-slate-600">
              Your enquiry has been submitted successfully. We will contact you
              soon.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-sand-50 rounded-xl p-6 mb-8 border border-sand-200"
          >
            <h3 className="font-semibold text-slate-900 mb-4">
              Submission Details:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong className="text-slate-700">Name:</strong>{" "}
                {submittedData.name}
              </div>
              <div>
                <strong className="text-slate-700">Mobile:</strong>{" "}
                {submittedData.countryCode} {submittedData.mobile}
              </div>
              <div className="md:col-span-2">
                <strong className="text-slate-700">Address:</strong>{" "}
                {submittedData.address}
              </div>
              <div className="md:col-span-2">
                <strong className="text-slate-700">Email:</strong>{" "}
                {submittedData.email}
              </div>
              <div className="md:col-span-2">
                <strong className="text-slate-700">Message:</strong>{" "}
                {submittedData.message || "N/A"}
              </div>
              <div className="md:col-span-2">
                <strong className="text-slate-700">Services:</strong>{" "}
                {submittedData.services.join(", ")}
              </div>
            </div>
          </motion.div>

          <motion.button
            onClick={() => {
              setIsSubmitted(false);
              setSubmittedData(null);
              reset();
            }}
            className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-glow-primary"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            Submit Another Enquiry
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name and Mobile Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className={labelClasses}>
                  <svg
                    className="w-4 h-4 mr-2 text-gold-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Full Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className={inputClasses}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className={errorClasses}>
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.name.message}
                  </p>
                )}
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                <label className={labelClasses}>
                  <svg
                    className="w-4 h-4 mr-2 text-gold-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Mobile Number
                </label>
                <div className="flex flex-col gap-3">
                  <div className="w-full relative">
                    {/* Custom dropdown with search for all views */}
                    <div
                      className={`${selectClasses} appearance-none pr-10 cursor-pointer flex items-center justify-between`}
                      onClick={() => setShowDropdown(!showDropdown)}
                    >
                      <span className="truncate">{selectedCountry.dialCode} ({selectedCountry.name})</span>
                      <svg
                        className="w-4 h-4 text-slate-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>

                    {showDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-sand-200 rounded-xl shadow-lg max-h-60 overflow-y-auto z-50">
                        <input
                          type="text"
                          className="w-full px-4 py-3 border-b border-sand-200 focus:outline-none focus:ring-2 focus:ring-gold-200 rounded-t-lg"
                          placeholder="Search country..."
                          value={searchTerm}
                          onChange={handleSearchInput}
                          onFocus={(e) => e.target.select()}
                        />
                        {filteredCountries.map((country, index) => (
                          <div
                            key={index}
                            className="px-4 py-3 hover:bg-sand-100 cursor-pointer transition-colors"
                            onClick={() => handleCountrySelect(country)}
                          >
                            {country.dialCode} ({country.name})
                          </div>
                        ))}
                        {filteredCountries.length === 0 && (
                          <div className="px-4 py-3 text-slate-500">
                            No country found
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="w-full">
                    <input
                      type="tel"
                      {...register("mobile", {
                        required: "Mobile number is required",
                        validate: (value) => {
                          if (!selectedCountry.format.test(value)) {
                            return `Mobile number format invalid for ${selectedCountry.name}`;
                          }
                          return true;
                        },
                      })}
                      className={inputClasses}
                      placeholder="Enter mobile number"
                    />
                    {errors.mobile && (
                      <p className={errorClasses}>
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.mobile.message}
                      </p>
                    )}
                  </div>
                </div>
                <input
                  type="hidden"
                  {...register("countryCode")}
                  value={selectedCountry.dialCode}
                />
              </motion.div>
            </div>

            {/* Address */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className={labelClasses}>
                <svg
                  className="w-4 h-4 mr-2 text-gold-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Address
              </label>
              <textarea
                {...register("address", { required: "Address is required" })}
                className={`${inputClasses} resize-none`}
                rows="3"
                placeholder="Enter your complete address"
              />
              {errors.address && (
                <p className={errorClasses}>
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.address.message}
                </p>
              )}
            </motion.div>

            {/* Email */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <label className={labelClasses}>
                <svg
                  className="w-4 h-4 mr-2 text-gold-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Email Address
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className={inputClasses}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className={errorClasses}>
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.email.message}
                </p>
              )}
            </motion.div>

            {/* Message */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className={labelClasses}>
                <svg
                  className="w-4 h-4 mr-2 text-gold-500"
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
                Message (Optional)
              </label>
              <textarea
                {...register("message")}
                className={`${inputClasses} resize-none`}
                rows="4"
                placeholder="Tell us more about your requirements..."
              />
            </motion.div>

            {/* Services */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <label className={labelClasses}>
                <svg
                  className="w-4 h-4 mr-2 text-gold-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                Services Required
              </label>
              
              {/* Professional Multi-Select Dropdown */}
              <div className="relative">
                <div 
                  className={`${selectClasses} min-h-[56px] flex flex-wrap items-center gap-2 cursor-pointer`}
                  onClick={() => setShowServicesDropdown(!showServicesDropdown)}
                >
                  {selectedServices.length > 0 ? (
                    selectedServices.map((service, index) => (
                      <span 
                        key={index}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium border border-primary/20"
                      >
                        {service}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const updatedServices = selectedServices.filter(s => s !== service);
                            setSelectedServices(updatedServices);
                          }}
                          className="ml-1 text-primary/60 hover:text-primary"
                        >
                          ×
                        </button>
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400">Select services...</span>
                  )}
                  <svg
                    className={`w-4 h-4 text-slate-500 ml-auto transition-transform ${showServicesDropdown ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                {showServicesDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-sand-200 rounded-xl shadow-lg max-h-80 overflow-y-auto z-50"
                  >
                    {/* Search Input */}
                    <div className="p-4 border-b border-sand-200">
                      <input
                        type="text"
                        placeholder="Search services..."
                        value={servicesSearchTerm}
                        onChange={(e) => setServicesSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-sand-200 rounded-lg focus:border-gold-400 focus:ring-2 focus:ring-gold-200 transition-all duration-300"
                        onFocus={(e) => e.target.select()}
                      />
                    </div>

                    {/* Services List */}
                    <div className="p-2">
                      {rawServices.map((group, index) => {
                        const filteredItems = group.items.filter(item => 
                          item.toLowerCase().includes(servicesSearchTerm.toLowerCase())
                        );
                        
                        if (filteredItems.length === 0) return null;

                        return (
                          <div key={index} className="mb-4">
                            <h4 className="font-semibold text-primary bg-sand-50 px-3 py-2 rounded-lg mb-2 text-sm">
                              {group.category}
                            </h4>
                            <div className="space-y-1">
                              {filteredItems.map((item, i) => (
                                <label
                                  key={i}
                                  className="flex items-center px-3 py-2 rounded-lg cursor-pointer hover:bg-sand-100 transition-colors"
                                >
                                  <input
                                    type="checkbox"
                                    checked={selectedServices.includes(item)}
                                    onChange={(e) => {
                                      let updatedServices;
                                      if (e.target.checked) {
                                        updatedServices = [...selectedServices, item];
                                      } else {
                                        updatedServices = selectedServices.filter(s => s !== item);
                                      }
                                      setSelectedServices(updatedServices);
                                    }}
                                    className="w-4 h-4 text-primary border-sand-300 rounded focus:ring-primary/20"
                                  />
                                  <span className="ml-3 text-sm text-slate-700">{item}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Action Buttons */}
                    <div className="p-4 border-t border-sand-200 flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedServices([]);
                          setShowServicesDropdown(false);
                          setServicesSearchTerm('');
                        }}
                        className="flex-1 px-4 py-2 text-slate-600 border-2 border-sand-200 rounded-lg hover:bg-sand-50 transition-colors text-sm font-medium"
                      >
                        Clear All
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowServicesDropdown(false);
                          setServicesSearchTerm('');
                        }}
                        className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
                      >
                        Done
                      </button>
                    </div>
                  </motion.div>
                )}


              </div>

              {selectedServices.length > 0 && (
                <div className="mt-3 text-sm text-slate-700">
                  <p className="font-semibold mb-1">Required Documents:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {[
                      ...new Set(
                        selectedServices.flatMap(
                          (s) => serviceDocuments[s] || serviceDocuments.Default
                        )
                      ),
                    ].map((doc, i) => (
                      <li key={i}>{doc}</li>
                    ))}
                  </ul>
                </div>
              )}
              {errors.services && (
                <p className={errorClasses}>
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.services.message}
                </p>
              )}
            </motion.div>

            {/* CAPTCHA will be enabled after domain setup */}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-glow-primary disabled:opacity-70 disabled:cursor-not-allowed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              whileHover={{ scale: isLoading ? 1 : 1.01 }}
              whileTap={{ scale: isLoading ? 1 : 0.99 }}
            >
              <span className="flex items-center justify-center">
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    Submit Enquiry
                  </>
                )}
              </span>
            </motion.button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnquiryForm;
