'use client';

import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { rawServices } from '../data/services.js';

const EnquiryForm = ({ preSelectedServices = [] }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { services: preSelectedServices }
  });
  const recaptchaRef = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const onSubmit = async (data) => {
    const token = recaptchaRef.current.getValue();
    if (!token) {
      alert('Please complete the CAPTCHA');
      return;
    }

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, captcha: token }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setSubmittedData(data);
      } else {
        alert('Failed to submit enquiry. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <section className="bg-gradient-to-br from-emerald-50 via-white to-green-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {isSubmitted ? (
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-emerald-100">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-emerald-900 mb-2">Thank You!</h2>
                <p className="text-emerald-700">Your enquiry has been submitted successfully. We will contact you soon.</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-emerald-900 mb-4">Submission Details:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div><strong className="text-emerald-800">Name:</strong> {submittedData.name}</div>
                  <div><strong className="text-emerald-800">Mobile:</strong> {submittedData.mobile}</div>
                  <div className="md:col-span-2"><strong className="text-emerald-800">Address:</strong> {submittedData.address}</div>
                  <div className="md:col-span-2"><strong className="text-emerald-800">Email:</strong> {submittedData.email}</div>
                  <div className="md:col-span-2"><strong className="text-emerald-800">Message:</strong> {submittedData.message || 'N/A'}</div>
                  <div className="md:col-span-2"><strong className="text-emerald-800">Services:</strong> {submittedData.services.join(', ')}</div>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setSubmittedData(null);
                  reset();
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-emerald-100">
              {/* Header */}
              <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-8 md:p-12">
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Enquire Now
                  </h2>
                  <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
                    Get in touch with us for professional business services across the UAE. Your trusted partner for all your needs.
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="p-8 md:p-12">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name and Mobile Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-semibold text-emerald-900">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Full Name
                      </label>
                      <input
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-emerald-50/50"
                        placeholder="Enter your full name"
                      />
                      {errors.name && <p className="text-red-600 text-sm flex items-center"><svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-semibold text-emerald-900">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        {...register('mobile', {
                          required: 'Mobile number is required',
                          pattern: {
                            value: /^\d{10}$/,
                            message: 'Mobile number must be 10 digits'
                          }
                        })}
                        className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-emerald-50/50"
                        placeholder="Enter 10-digit mobile number"
                      />
                      {errors.mobile && <p className="text-red-600 text-sm flex items-center"><svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{errors.mobile.message}</p>}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-emerald-900">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Address
                    </label>
                    <textarea
                      {...register('address', { required: 'Address is required' })}
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-emerald-50/50 resize-none"
                      rows="3"
                      placeholder="Enter your complete address"
                    />
                    {errors.address && <p className="text-red-600 text-sm flex items-center"><svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{errors.address.message}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-emerald-900">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email Address
                    </label>
                    <input
                      type="email"
                      {...register('email', { required: 'Email is required' })}
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-emerald-50/50"
                      placeholder="Enter your email address"
                    />
                    {errors.email && <p className="text-red-600 text-sm flex items-center"><svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{errors.email.message}</p>}
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-emerald-900">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Message (Optional)
                    </label>
                    <textarea
                      {...register('message')}
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-emerald-50/50 resize-none"
                      rows="4"
                      placeholder="Tell us more about your requirements..."
                    />
                  </div>

                  {/* Services */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-emerald-900">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      Services Required
                    </label>
                    <select
                      multiple
                      {...register('services', { required: 'Please select at least one service' })}
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-emerald-50/50 min-h-[120px]"
                    >
                      {rawServices.map((group, index) => (
                        <optgroup key={index} label={group.category} className="font-semibold text-emerald-800">
                          {group.items.map((item, i) => (
                            <option key={i} value={item} className="py-1">
                              {item}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    {errors.services && <p className="text-red-600 text-sm flex items-center"><svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{errors.services.message}</p>}
                  </div>

                  {/* ReCAPTCHA */}
                  <div className="flex justify-center py-4">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey="YOUR_RECAPTCHA_SITE_KEY" // Replace with your actual site key
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 shadow-lg"
                  >
                    <span className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Submit Enquiry
                    </span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EnquiryForm;