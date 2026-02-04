import { GoogleGenerativeAI } from "@google/generative-ai";

/* ===============================
   1. BUSINESS DATA (FROM YOUR SITE ONLY)
   =============================== */

const BUSINESS_DATA = {
  companyName: "Riadh Typing & Typing Services",
  description:
    "Riadh Typing & Typing Services is a premier service provider in the United Arab Emirates, specializing in comprehensive document processing, visa services, and business setup solutions. With years of expertise and a commitment to excellence, we streamline complex bureaucratic processes for individuals and businesses across the UAE.",

  contact: {
    phone: "+971XXXXXXXXX",
    whatsapp: "+971XXXXXXXXX"
  },

  services: [
    {
      category: "Visa Services",
      items: [
        "New Residency Visa",
        "Renew Residency Visa",
        "Cancel Residency Visa",
        "Golden Visa Nomination",
        "Golden Visa Full Process",
        "Transfer Visa To New Passport",
        "Data Modification",
        "New Born Visa",
        "Dependents On Hold"
      ]
    },
    {
      category: "Business Setup / Trading License",
      items: [
        "New Business Consultancy",
        "Renew Trade License",
        "Amend Trade License",
        "Cancel Trade License"
      ]
    },
    {
      category: "Trade Mark Registration",
      items: ["Trade Mark Registration"]
    },
    {
      category: "Domestic Visa Services",
      items: [
        "New Residency Visa",
        "Absconding Report",
        "Cancel Residency Visa",
        "Renew Residency Visa"
      ]
    },
    {
      category: "Visit / Tourist Visa",
      items: ["UAE Tourist Visa", "Saudi Arabia Visa"]
    },
    {
      category: "Accounting & Book Keeping",
      items: ["Tax Registration"]
    },
    {
      category: "Translation & Attestation",
      items: ["Attestation", "Translation"]
    },
    {
      category: "Notary Public",
      items: [
        "Power Of Attorney & Pledges",
        "Commercial Contract",
        "Declaration"
      ]
    },
    {
      category: "Vehicles & Drivers",
      items: [
        "Pay Traffic Fines",
        "Traffic Fines Discount",
        "Mawaqif Residential Permit",
        "Vehicle Insurance",
        "Vehicle Registration Renewal",
        "Black Points Transfer",
        "International Driving License",
        "Vehicle Ownership Transfer",
        "Driving License Renewal"
      ]
    },
    {
      category: "Other Services",
      items: [
        "General Liability Insurance",
        "Property Insurance",
        "Health Insurance",
        "Visa Medical Test",
        "Emirates ID Services"
      ]
    }
  ],

  documentRequirements: {
    "New Residency Visa": [
      "Passport copy (valid 6+ months)",
      "Passport size photo (white background)",
      "Emirates ID (if available)",
      "Entry permit / change status",
      "Medical test result",
      "Emirates ID application form",
      "Trade license (for employment visas)"
    ],
    "Renew Residency Visa": [
      "Passport copy",
      "Current residency visa copy",
      "Tenancy contract (Ejari)",
      "Medical test result",
      "Emirates ID",
      "Labor contract"
    ],
    "Cancel Residency Visa": [
      "Passport copy",
      "Original Emirates ID",
      "Visa cancellation form"
    ],
    "Golden Visa Nomination": [
      "Passport copy",
      "Current residency visa",
      "CV / Resume",
      "Qualification certificates",
      "Bank statement / income proof (if required)",
      "Qualification / experience documents (if applicable)"
    ],
    "Golden Visa Full Process": [
      "Passport copy",
      "Current visa or status",
      "CV / Resume",
      "Qualification certificates",
      "Tenancy contract",
      "Qualification / tax / salary documents (as per category)"
    ],
    "Transfer Visa To New Passport": [
      "New passport copy",
      "Old passport copy",
      "Current visa copy",
      "Emirates ID"
    ],
    "Data Modification": [
      "Passport copy",
      "Current visa copy",
      "Emirates ID",
      "Correction request details"
    ],
    "New Born Visa": [
      "Birth certificate",
      "Parents passport copies",
      "Parents visa copies",
      "Hospital birth notification"
    ],
    "Dependents On Hold": [
      "Passport copy",
      "Current visa copy",
      "Sponsor documents"
    ],
    "New Business Consultancy": [
      "Passport copy of owner",
      "Visa copy",
      "Proposed company name",
      "Business activity details"
    ],
    "Renew Trade License": [
      "Current trade license copy",
      "Passport copy of owner"
    ],
    "Amend Trade License": [
      "Current trade license copy",
      "Passport copy of owner",
      "Amendment details"
    ],
    "Cancel Trade License": [
      "Current trade license copy",
      "Passport copy of owner"
    ],
    "Trade Mark Registration": [
      "Logo / brand name",
      "Passport copy",
      "Business license copy"
    ],
    "Domestic Visa Services": [
      "Sponsor passport copy",
      "Applicant passport copy",
      "Relationship proof"
    ],
    "Absconding Report": [
      "Passport copy",
      "Visa copy"
    ],
    "UAE Tourist Visa": [
      "Passport copy",
      "Photo",
      "Travel details"
    ],
    "Saudi Arabia Visa": [
      "Passport copy",
      "Photo",
      "Travel details"
    ],
    "Tax Registration": [
      "Business license copy",
      "Emirates ID"
    ],
    "Attestation": [
      "Original documents",
      "Passport copy"
    ],
    "Translation": [
      "Original documents",
      "Passport copy"
    ],
    "Power Of Attorney & Pledges": [
      "Original documents",
      "Passport copy"
    ],
    "Commercial Contract": [
      "Original documents",
      "Passport copy"
    ],
    "Declaration": [
      "Original documents",
      "Passport copy"
    ],
    "Pay Traffic Fines": [
      "Driving license copy",
      "Emirates ID"
    ],
    "Traffic Fines Discount": [
      "Driving license copy",
      "Emirates ID"
    ],
    "Mawaqif Residential Permit": [
      "Emirates ID",
      "Residence proof"
    ],
    "Vehicle Insurance": [
      "Vehicle registration copy",
      "Emirates ID"
    ],
    "Vehicle Registration Renewal": [
      "Vehicle registration copy",
      "Insurance copy"
    ],
    "Black Points Transfer": [
      "Driving license copy",
      "Emirates ID"
    ],
    "International Driving License": [
      "Original driving license",
      "Passport copy",
      "Photo"
    ],
    "Vehicle Ownership Transfer": [
      "Vehicle registration copy",
      "Passport copies of both parties"
    ],
    "Driving License Renewal": [
      "Current driving license",
      "Passport copy",
      "Eye test certificate"
    ],
    "General Liability Insurance": [
      "Business license copy",
      "Passport copy"
    ],
    "Property Insurance": [
      "Property documents",
      "Passport copy"
    ],
    "Health Insurance": [
      "Passport copy",
      "Visa copy"
    ],
    "Visa Medical Test": [
      "Passport copy",
      "Visa application form"
    ],
    "Emirates ID Services": [
      "Passport copy",
      "Visa copy",
      "Photo"
    ]
  },

  processingTimes: {
    "New Residency Visa": "3-5 business days",
    "Renew Residency Visa": "2-4 business days",
    "Cancel Residency Visa": "1-2 business days",
    "Golden Visa Nomination": "10-15 business days",
    "Golden Visa Full Process": "15-25 business days",
    "Transfer Visa To New Passport": "2-3 business days",
    "Data Modification": "1-3 business days",
    "New Born Visa": "3-5 business days",
    "Dependents On Hold": "2-4 business days",
    "New Business Consultancy": "5-10 business days",
    "Renew Trade License": "2-3 business days",
    "Amend Trade License": "2-4 business days",
    "Cancel Trade License": "3-5 business days",
    "Trade Mark Registration": "15-30 business days",
    "Domestic Visa Services": "3-5 business days",
    "Absconding Report": "1-2 business days",
    "UAE Tourist Visa": "3-5 business days",
    "Saudi Arabia Visa": "5-7 business days",
    "Tax Registration": "3-5 business days",
    "Attestation": "3-7 business days (varies by document type)",
    "Translation": "2-4 business days",
    "Power Of Attorney & Pledges": "1-2 business days",
    "Commercial Contract": "1-2 business days",
    "Declaration": "1-2 business days",
    "Pay Traffic Fines": "Same day",
    "Traffic Fines Discount": "2-3 business days",
    "Mawaqif Residential Permit": "1-2 business days",
    "Vehicle Insurance": "Same day",
    "Vehicle Registration Renewal": "1-2 business days",
    "Black Points Transfer": "1-2 business days",
    "International Driving License": "1-2 business days",
    "Vehicle Ownership Transfer": "1-2 business days",
    "Driving License Renewal": "1-2 business days",
    "General Liability Insurance": "3-5 business days",
    "Property Insurance": "3-5 business days",
    "Health Insurance": "3-5 business days",
    "Visa Medical Test": "1-2 business days",
    "Emirates ID Services": "2-3 business days"
  }
};

/* ===============================
    2. SYSTEM PROMPT (LOCKS THE AI)
    =============================== */

const SYSTEM_PROMPT = `
You are a friendly and professional customer service assistant for Riadh Typing & Typing Services (UAE). Your goal is to provide helpful, accurate information about our services in a warm and approachable manner.

STRICT RULES:
- Answer ONLY using the business information provided.
- Do NOT add new services, documents, processing times, or advice.
- Rephrasing is allowed but meaning must stay the same.
- Reply in the SAME language as the user.
- Share contact details ONLY if the user asks for help, contact, call, WhatsApp, or support.
- If the question is unrelated, reply politely that you can help only with our document processing, visa services, and business setup solutions.
- If information is missing, say: "Please contact our team for further assistance."
- Keep responses concise, clear, and user-friendly.
- Use positive language and maintain a helpful tone.
- Start responses with friendly emojis to make them more approachable.
- Keep the conversation flowing naturally, like talking to a friend.
- Use simple, easy-to-understand language.
`;

/* ===============================
   3. SIMPLE RESPONSE SYSTEM (FALLBACK)
   =============================== */

function getSimpleResponse(message) {
  const lowerMsg = message.toLowerCase();

  // Greeting responses
  if (lowerMsg.includes("hello") || lowerMsg.includes("hi") || lowerMsg.includes("hey")) {
    return "👋 Hello! I'm here to help you with Riadh Typing & Typing Services. How can I assist you today? Whether it's visa services, business setup, or document processing, I'm here to help!";
  }

  if (lowerMsg.includes("thank")) {
    return "😊 You're very welcome! If you have any more questions, feel free to ask. I'm here to help!";
  }

  // Service related queries
  if (lowerMsg.includes("service") || lowerMsg.includes("services")) {
    return "🌟 We offer a wide range of services including Visa Services, Business Setup, Trade Mark Registration, Domestic Visa Services, Visit/Tourist Visa, Accounting & Book Keeping, Translation & Attestation, Notary Public, Vehicles & Drivers services, and other miscellaneous services. Which service are you interested in exploring?";
  }

  if (lowerMsg.includes("visa")) {
    return "📋 We provide comprehensive visa services including New Residency Visa, Renew Residency Visa, Cancel Residency Visa, Golden Visa Nomination, Golden Visa Full Process, Transfer Visa To New Passport, Data Modification, New Born Visa, and Dependents On Hold. What specific visa service do you need help with?";
  }

  if (lowerMsg.includes("business") || lowerMsg.includes("company") || lowerMsg.includes("trade license")) {
    return "💼 Our business setup services include New Business Consultancy, Renew Trade License, Amend Trade License, and Cancel Trade License. We can assist with all aspects of business establishment in the UAE. Would you like to know more about any specific service?";
  }

  if (lowerMsg.includes("document") || lowerMsg.includes("required")) {
    return "📄 Document requirements vary by service type. For example, a New Residency Visa requires passport copy, passport size photo, Emirates ID (if available), entry permit, medical test result, Emirates ID application form, and trade license (for employment visas). Please specify which service you're inquiring about for detailed document requirements!";
  }

  if (lowerMsg.includes("time") || lowerMsg.includes("process") || lowerMsg.includes("how long")) {
    return "⏰ Processing times vary by service type. For example, a New Residency Visa typically takes 3-5 business days, while a Golden Visa Full Process takes 15-25 business days. Please specify which service you're interested in for exact processing times!";
  }

  // Contact information
  if (lowerMsg.includes("contact") || lowerMsg.includes("phone") || lowerMsg.includes("whatsapp") || lowerMsg.includes("call") || lowerMsg.includes("support")) {
    return "📞 You can contact Riadh Typing & Typing Services through our WhatsApp at +971528003934. Our team is ready to assist you with any queries!";
  }

  // Default response
  return "✨ I'm here to help you with Riadh Typing & Typing Services. We offer visa services, business setup, document processing, and more. Could you please specify which service you're interested in?";
}

/* ===============================
   3. API HANDLER (VERCEL SAFE)
   =============================== */

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return new Response(
        JSON.stringify({ reply: "Please enter a valid message." }),
        { status: 400 }
      );
    }

    // Use only the simple response system to avoid API costs and limits
    const simpleReply = getSimpleResponse(message);
    
    return new Response(
      JSON.stringify({ reply: simpleReply }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(
      JSON.stringify({
        reply: "I'm here to help you with Riadh Typing & Typing Services. We offer visa services, business setup, document processing, and more. Could you please specify which service you're interested in?"
      }),
      { status: 500 }
    );
  }
}
