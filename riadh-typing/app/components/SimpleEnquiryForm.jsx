"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SimpleEnquiryForm = ({ preSelectedServices = [] }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Country data with dial codes (comprehensive list of major countries)
  const countries = [
    { name: "United Arab Emirates", code: "AE", dialCode: "+971" },
    { name: "India", code: "IN", dialCode: "+91" },
    { name: "Pakistan", code: "PK", dialCode: "+92" },
    { name: "United Kingdom", code: "GB", dialCode: "+44" },
    { name: "United States", code: "US", dialCode: "+1" },
    { name: "Canada", code: "CA", dialCode: "+1" },
    { name: "Australia", code: "AU", dialCode: "+61" },
    { name: "Germany", code: "DE", dialCode: "+49" },
    { name: "France", code: "FR", dialCode: "+33" },
    { name: "Italy", code: "IT", dialCode: "+39" },
    { name: "Spain", code: "ES", dialCode: "+34" },
    { name: "Netherlands", code: "NL", dialCode: "+31" },
    { name: "Switzerland", code: "CH", dialCode: "+41" },
    { name: "Japan", code: "JP", dialCode: "+81" },
    { name: "China", code: "CN", dialCode: "+86" },
    { name: "South Korea", code: "KR", dialCode: "+82" },
    { name: "Singapore", code: "SG", dialCode: "+65" },
    { name: "Malaysia", code: "MY", dialCode: "+60" },
    { name: "Saudi Arabia", code: "SA", dialCode: "+966" },
    { name: "Qatar", code: "QA", dialCode: "+974" },
    { name: "Kuwait", code: "KW", dialCode: "+965" },
    { name: "Oman", code: "OM", dialCode: "+968" },
    { name: "Bahrain", code: "BH", dialCode: "+973" },
    { name: "Egypt", code: "EG", dialCode: "+20" },
    { name: "Jordan", code: "JO", dialCode: "+962" },
    { name: "Lebanon", code: "LB", dialCode: "+961" },
    { name: "Syria", code: "SY", dialCode: "+963" },
    { name: "Iraq", code: "IQ", dialCode: "+964" },
    { name: "Iran", code: "IR", dialCode: "+98" },
    { name: "Turkey", code: "TR", dialCode: "+90" },
    { name: "South Africa", code: "ZA", dialCode: "+27" },
    { name: "Nigeria", code: "NG", dialCode: "+234" },
    { name: "Kenya", code: "KE", dialCode: "+254" },
    { name: "Ghana", code: "GH", dialCode: "+233" },
    { name: "Tanzania", code: "TZ", dialCode: "+255" },
    { name: "Brazil", code: "BR", dialCode: "+55" },
    { name: "Mexico", code: "MX", dialCode: "+52" },
    { name: "Argentina", code: "AR", dialCode: "+54" },
    { name: "Colombia", code: "CO", dialCode: "+57" },
    { name: "Peru", code: "PE", dialCode: "+51" },
    { name: "Chile", code: "CL", dialCode: "+56" },
    { name: "Venezuela", code: "VE", dialCode: "+58" },
    { name: "Cuba", code: "CU", dialCode: "+53" },
    { name: "Dominican Republic", code: "DO", dialCode: "+1" },
    { name: "Haiti", code: "HT", dialCode: "+509" },
    { name: "Jamaica", code: "JM", dialCode: "+1" },
    { name: "Puerto Rico", code: "PR", dialCode: "+1" },
    { name: "Panama", code: "PA", dialCode: "+507" },
    { name: "Costa Rica", code: "CR", dialCode: "+506" },
    { name: "El Salvador", code: "SV", dialCode: "+503" },
    { name: "Guatemala", code: "GT", dialCode: "+502" },
    { name: "Honduras", code: "HN", dialCode: "+504" },
    { name: "Nicaragua", code: "NI", dialCode: "+505" },
    { name: "Belize", code: "BZ", dialCode: "+501" },
  ];

  const [selectedCountry, setSelectedCountry] = useState(countries.find(c => c.code === 'AE') || countries[0]);

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      // Send to main enquiry endpoint
      const { address, ...dataWithoutAddress } = data;
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...dataWithoutAddress, 
          countryCode: selectedCountry.dialCode,
          services: ["General Enquiry"]
        }),
      });

      // Also send to leads endpoint for Supabase storage
      try {
        await fetch("/api/enquiry/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service: "General Enquiry",
            name: data.name,
            email: data.email,
            phone: `${selectedCountry.dialCode} ${data.mobile}`,
            message: data.message,
            source: "hero-enquiry"
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

  const inputClasses =
    "w-full px-3 py-2.5 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/80 text-blue-900 placeholder-blue-500/60 backdrop-blur-sm sm:px-4 sm:py-3.5";

  const labelClasses =
    "flex items-center text-sm font-semibold text-blue-800 mb-2";

  const errorClasses = "text-red-500 text-sm flex items-center mt-1.5";

  const selectClasses =
    "px-3 py-2.5 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/80 text-blue-800 cursor-pointer backdrop-blur-sm sm:px-4 sm:py-3.5";

  return (
    <AnimatePresence mode="wait">
      {isSubmitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="bg-white/95 backdrop-blur-lg rounded-2xl p-4 sm:p-8"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
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
            <h2 className="text-3xl font-bold text-blue-900 mb-3">
              Thank You!
            </h2>
            <p className="text-blue-600">
              Your enquiry has been submitted successfully. We will contact you
              soon.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-200"
          >
            <h3 className="font-semibold text-blue-900 mb-4">
              Submission Details:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong className="text-blue-700">Name:</strong>{" "}
                {submittedData.name}
              </div>
              <div>
                <strong className="text-blue-700">Mobile:</strong>{" "}
                {selectedCountry.dialCode} {submittedData.mobile}
              </div>
              <div className="md:col-span-2">
                <strong className="text-blue-700">Message:</strong>{" "}
                {submittedData.message || "N/A"}
              </div>
            </div>
          </motion.div>

          <motion.button
            onClick={() => {
              setIsSubmitted(false);
              setSubmittedData(null);
              reset();
            }}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
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
          transition={{ duration: 0.3 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            {/* Name */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.2 }}
            >
              <label className={labelClasses}>
                <svg
                  className="w-4 h-4 mr-2 text-blue-600"
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

            {/* Email */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.2 }}
            >
              <label className={labelClasses}>
                <svg
                  className="w-4 h-4 mr-2 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Email Address
              </label>
              <input
                type="email"
                {...register("email", { 
                  required: "Email is required",
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                })}
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
                  {errors.email.message || "Please enter a valid email address"}
                </p>
              )}
            </motion.div>

            {/* Mobile Number */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.2 }}
            >
              <label className={labelClasses}>
                <svg
                  className="w-4 h-4 mr-2 text-blue-600"
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
              <div className="flex gap-2">
                <select
                  value={selectedCountry.code}
                  onChange={(e) => {
                    const country = countries.find(c => c.code === e.target.value);
                    if (country) {
                      setSelectedCountry(country);
                    }
                  }}
                  className={`${selectClasses} w-32 sm:w-36`}
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.dialCode} ({country.code})
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  {...register("mobile", { 
                    required: "Mobile number is required",
                    pattern: /^\d{6,15}$/,
                    message: "Please enter a valid mobile number"
                  })}
                  className={inputClasses}
                  placeholder="Enter mobile number"
                />
              </div>
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
                  {errors.mobile.message || "Please enter a valid mobile number"}
                </p>
              )}
            </motion.div>

            {/* Message */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.2 }}
            >
              <label className={labelClasses}>
                <svg
                  className="w-4 h-4 mr-2 text-blue-600"
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
                Message
              </label>
              <textarea
                {...register("message")}
                className={`${inputClasses} min-h-[100px] sm:min-h-[120px]`}
                placeholder="Tell us about your requirements"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className={`w-full font-bold py-3 px-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-lg sm:py-4 sm:px-6 ${
                isLoading 
                  ? "bg-blue-400 cursor-not-allowed" 
                  : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
              }`}
              whileHover={!isLoading ? { scale: 1.01, y: -1 } : {}}
              whileTap={!isLoading ? { scale: 0.99 } : {}}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin sm:w-5 sm:h-5" />
                  Submitting...
                </div>
              ) : (
                "Submit Enquiry"
              )}
            </motion.button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SimpleEnquiryForm;
