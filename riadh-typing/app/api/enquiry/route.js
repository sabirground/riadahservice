import nodemailer from "nodemailer";
import documents from "@/app/lib/serviceDocuments.js";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, mobile, countryCode, address, message, services } = body;

    // Validate input formats
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{7,15}$/;
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;

    if (!name || !email || !mobile || !services) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing required fields" }),
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid email format" }),
        { status: 400 }
      );
    }

    if (!mobileRegex.test(mobile.replace(/\D/g, ''))) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid mobile number format" }),
        { status: 400 }
      );
    }

    if (!nameRegex.test(name)) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid name format" }),
        { status: 400 }
      );
    }

    const servicesList = Array.isArray(services)
      ? services.join(", ")
      : services;

    // ✅ GET DOCUMENTS FROM lib FOLDER
    let requiredDocs = [];

    if (Array.isArray(services)) {
      services.forEach(service => {
        if (documents[service]) {
          requiredDocs.push(...documents[service]);
        }
      });
    } else {
      requiredDocs = documents[services] || [];
    }

    requiredDocs = [...new Set(requiredDocs)];

    const docsHTML = requiredDocs.length
      ? requiredDocs.map(doc => `<li>${doc}</li>`).join("")
      : "<li>Our team will share documents soon.</li>";

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_PORT == "465",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ ADMIN EMAIL
    await transporter.sendMail({
      from: `"Website Enquiry" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `New Enquiry - ${servicesList}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Enquiry - Riadah Services</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 700px;
                    margin: 40px auto;
                    background: #ffffff;
                    border-radius: 16px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                }
                .header {
                    background: linear-gradient(135deg, #0066cc 0%, #003366 100%);
                    padding: 30px;
                    text-align: center;
                    color: white;
                }
                .header h1 {
                    margin: 0;
                    font-size: 28px;
                    font-weight: 700;
                    letter-spacing: 1px;
                }
                .header .subtitle {
                    font-size: 14px;
                    opacity: 0.9;
                    margin-top: 8px;
                }
                .content {
                    padding: 40px;
                }
                .enquiry-title {
                    color: #003366;
                    font-size: 22px;
                    margin-bottom: 25px;
                    padding-bottom: 15px;
                    border-bottom: 2px solid #e6f0ff;
                }
                .info-section {
                    margin-bottom: 25px;
                }
                .info-label {
                    font-weight: 600;
                    color: #0066cc;
                    display: inline-block;
                    width: 120px;
                    font-size: 14px;
                }
                .info-value {
                    color: #333333;
                    font-size: 14px;
                    line-height: 1.6;
                }
                .services-list {
                    background: #f8f9ff;
                    padding: 15px;
                    border-radius: 8px;
                    margin: 10px 0;
                    color: #003366;
                    font-weight: 500;
                }
                .message-box {
                    background: #f0f4f8;
                    padding: 15px;
                    border-radius: 8px;
                    margin: 10px 0;
                    color: #333;
                    line-height: 1.6;
                    font-style: italic;
                }
                .footer {
                    background: #f8f9fa;
                    padding: 25px;
                    text-align: center;
                    font-size: 12px;
                    color: #666;
                    border-top: 1px solid #e9ecef;
                }
                .footer .company-info {
                    margin-bottom: 10px;
                }
                .footer .contact-details {
                    font-size: 11px;
                    color: #888;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Riadah Services</h1>
                    <div class="subtitle">Professional Business Solutions in the UAE</div>
                </div>
                <div class="content">
                    <h2 class="enquiry-title">📧 New Website Enquiry</h2>
                    
                    <div class="info-section">
                        <span class="info-label">Name:</span>
                        <span class="info-value">${name}</span>
                    </div>
                    
                    <div class="info-section">
                        <span class="info-label">Mobile:</span>
                        <span class="info-value">${countryCode} ${mobile}</span>
                    </div>
                    
                    <div class="info-section">
                        <span class="info-label">Email:</span>
                        <span class="info-value">${email}</span>
                    </div>

                    
                    <div class="info-section">
                        <span class="info-label">Services:</span>
                        <div class="services-list">${servicesList}</div>
                    </div>
                    
                    <div class="info-section">
                        <span class="info-label">Message:</span>
                        <div class="message-box">${message || "N/A"}</div>
                    </div>
                </div>
                <div class="footer">
                    <div class="company-info">
                        Riadah Services - Your Trusted Partner for Business Setup in the UAE
                    </div>
                    <div class="contact-details">
                        Office: Dubai, United Arab Emirates | Phone: +971 52 800 3934 | Email: riadahtyping@gmail.com
                    </div>
                </div>
            </div>
        </body>
        </html>
      `,
    });

    // ✅ AUTO REPLY WITH DOCUMENTS
    await transporter.sendMail({
      from: `"Riadah Services" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Enquiry & Required Documents",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your Enquiry - Riadah Services</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 700px;
                    margin: 40px auto;
                    background: #ffffff;
                    border-radius: 16px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                }
                .header {
                    background: linear-gradient(135deg, #0066cc 0%, #003366 100%);
                    padding: 30px;
                    text-align: center;
                    color: white;
                }
                .header h1 {
                    margin: 0;
                    font-size: 28px;
                    font-weight: 700;
                    letter-spacing: 1px;
                }
                .header .subtitle {
                    font-size: 14px;
                    opacity: 0.9;
                    margin-top: 8px;
                }
                .content {
                    padding: 40px;
                }
                .greeting {
                    color: #003366;
                    font-size: 20px;
                    margin-bottom: 20px;
                    font-weight: 600;
                }
                .enquiry-info {
                    background: #f8f9ff;
                    padding: 20px;
                    border-radius: 12px;
                    margin-bottom: 25px;
                    border-left: 4px solid #0066cc;
                }
                .enquiry-info h3 {
                    margin-top: 0;
                    color: #003366;
                    font-size: 16px;
                }
                .services-list {
                    color: #0066cc;
                    font-weight: 500;
                    margin-top: 10px;
                }
                .documents-section {
                    margin-bottom: 25px;
                }
                .documents-section h3 {
                    color: #003366;
                    font-size: 18px;
                    margin-bottom: 15px;
                    display: flex;
                    align-items: center;
                }
                .documents-section h3::before {
                    content: "📄";
                    margin-right: 10px;
                }
                .documents-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .documents-list li {
                    background: #f0f4f8;
                    margin: 8px 0;
                    padding: 12px 15px;
                    border-radius: 8px;
                    color: #333;
                    font-size: 14px;
                    border-left: 3px solid #0066cc;
                    transition: all 0.3s ease;
                }
                .documents-list li:hover {
                    background: #e6f0ff;
                    transform: translateX(5px);
                }
                .call-to-action {
                    background: linear-gradient(135deg, #0066cc 0%, #003366 100%);
                    color: white;
                    padding: 20px;
                    border-radius: 12px;
                    text-align: center;
                    margin: 25px 0;
                }
                .call-to-action p {
                    margin: 0;
                    font-size: 14px;
                    line-height: 1.6;
                }
                .team-signature {
                    margin-top: 30px;
                    padding-top: 20px;
                    border-top: 1px solid #e9ecef;
                }
                .team-signature p {
                    margin: 5px 0;
                    color: #666;
                    font-size: 14px;
                }
                .team-name {
                    font-weight: 600;
                    color: #003366;
                }
                .footer {
                    background: #f8f9fa;
                    padding: 25px;
                    text-align: center;
                    font-size: 12px;
                    color: #666;
                    border-top: 1px solid #e9ecef;
                }
                .footer .company-info {
                    margin-bottom: 10px;
                    font-weight: 500;
                }
                .footer .contact-details {
                    font-size: 11px;
                    color: #888;
                    margin-top: 10px;
                }
                .social-links {
                    margin-top: 15px;
                    font-size: 11px;
                    color: #888;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Riadah Services</h1>
                    <div class="subtitle">Professional Business Solutions in the UAE</div>
                </div>
                <div class="content">
                    <div class="greeting">Dear ${name},</div>
                    
                    <p style="color: #333; line-height: 1.6; font-size: 14px;">
                        Thank you for reaching out to Riadah Services! We have received your enquiry and 
                        our team is currently reviewing it. We appreciate your interest in our services.
                    </p>
                    
                    <div class="enquiry-info">
                        <h3>Your Enquiry Details:</h3>
                        <div class="services-list">${servicesList}</div>
                    </div>
                    
                    <div class="documents-section">
                        <h3>Required Documents</h3>
                        <ul class="documents-list">${docsHTML}</ul>
                    </div>
                    
                    <div class="call-to-action">
                        <p>
                            <strong>Next Steps:</strong> Please prepare the required documents listed above. 
                            Our team will contact you within 24-48 hours to discuss your requirements further 
                            and guide you through the process.
                        </p>
                    </div>
                    
                    <div class="team-signature">
                        <p>Best regards,</p>
                        <p class="team-name">Riadah Services Team</p>
                        <p>Professional Business Setup & Consultancy</p>
                    </div>
                </div>
                <div class="footer">
                    <div class="company-info">
                        Riadah Services - Your Trusted Partner for Business Setup in the UAE
                    </div>
                    <div class="contact-details">
                        Office: Dubai, United Arab Emirates | Phone: +971 52 800 3934 | Email: riadahtyping@gmail.com
                    </div>
                    <div class="social-links">
                        Follow us on: LinkedIn | Instagram | Facebook
                    </div>
                </div>
            </div>
        </body>
        </html>
      `,
    });

    return new Response(
      JSON.stringify({ success: true, message: "Enquiry sent successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Enquiry API Error:", error);
    const errorResponse = { 
      success: false, 
      message: "Server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    };
    try {
      return new Response(
        JSON.stringify(errorResponse),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    } catch (stringifyError) {
      console.error("Error stringifying response:", stringifyError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Server error"
        }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  }
}
