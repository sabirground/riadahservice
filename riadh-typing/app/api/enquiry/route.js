import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, address, mobile, email, services, message, captcha } = await request.json();

    // Validate reCAPTCHA
    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: captcha,
      }),
    });

    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success) {
      return new Response(JSON.stringify({ error: 'reCAPTCHA verification failed' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Prepare email content
    const emailContent = `
      New Enquiry Submission:

      Name: ${name}
      Address: ${address}
      Mobile: ${mobile}
      Email: ${email}
      Selected Services: ${Array.isArray(selectedServices) ? selectedServices.join(', ') : selectedServices}
      Message: ${message}
    `;

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: 'New Enquiry from Website',
      text: emailContent,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing enquiry:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}