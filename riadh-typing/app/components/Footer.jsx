import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Company */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Riadah Services
            </h3>
            <p className="text-sm leading-relaxed">
              Professional business services in the UAE. We deliver reliable,
              compliant, and high-quality solutions for individuals and
              businesses.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/our-team" className="hover:text-white">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/get-quote" className="hover:text-white">
                  Get Free Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">
              Our Services
            </h4>
            <ul className="space-y-3 text-sm">
              <li>Typing Services</li>
              <li>PRO Services</li>
              <li>Business Setup</li>
              <li>Document Clearing</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm">
              <li><a href="https://www.google.com/maps/search/?api=1&query=Khalifa+Street%2C+Behind+Al+Falah+Plaza+Al+Ain+U.A.E" target="_blank" rel="noopener noreferrer" className="hover:text-white">📍 Khalifa Street, Behind Al Falah Plaza Al Ain U.A.E</a></li>
              <li><a href="https://wa.me/message/666A6V5SX3VWJ1" target="_blank" rel="noopener noreferrer" className="hover:text-white">📱 WhatsApp: +971 05 800 3934</a></li>
              <li><a href="mailto:riadahtyping@gmail.com" className="hover:text-white">✉️ riadahtyping@gmail.com</a></li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="https://www.instagram.com/riadah_typing_office/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M12.017 0C8.396 0 7.609.034 6.298.078c-1.31.044-2.204.222-2.988.476A5.96 5.96 0 001.464 1.464a5.96 5.96 0 00-.476 1.31C.222 3.558.044 4.452.044 5.762.034 7.073 0 7.86 0 11.481c0 3.621.034 4.408.078 5.719.044 1.31.222 2.204.476 2.988a5.96 5.96 0 001.31.476c.784.254 1.678.432 2.988.476 1.31.044 2.097.078 5.719.078 3.621 0 4.408-.034 5.719-.078 1.31-.044 2.204-.222 2.988-.476a5.96 5.96 0 001.31-.476c.254-.784.432-1.678.476-2.988.044-1.31.078-2.097.078-5.719 0-3.621-.034-4.408-.078-5.719-.044-1.31-.222-2.204-.476-2.988a5.96 5.96 0 00-.476-1.31A5.96 5.96 0 0020.526.476c-.784-.254-1.678-.432-2.988-.476C16.227.034 15.44 0 11.819 0h-.802zm.034 1.917c3.546 0 3.967.013 5.369.077.698.032 1.088.148 1.345.246.33.128.569.282.818.531.249.249.403.488.531.818.098.257.214.647.246 1.345.064 1.402.077 1.823.077 5.369s-.013 3.967-.077 5.369c-.032.698-.148 1.088-.246 1.345-.128.33-.282.569-.531.818a2.19 2.19 0 01-.818.531c-.257.098-.647.214-1.345.246-1.402.064-1.823.077-5.369.077s-3.967-.013-5.369-.077c-.698-.032-1.088-.148-1.345-.246a2.19 2.19 0 01-.818-.531 2.19 2.19 0 01-.531-.818c-.098-.257-.214-.647-.246-1.345C1.95 15.448 1.937 15.027 1.917 11.481c0-3.546.013-3.967.077-5.369.032-.698.148-1.088.246-1.345.128-.33.282-.569.531-.818.249-.249.488-.403.818-.531.257-.098.647-.214 1.345-.246 1.402-.064 1.823-.077 5.369-.077zm0 1.917a7.564 7.564 0 100 15.128 7.564 7.564 0 000-15.128zm0 12.481a4.917 4.917 0 110-9.834 4.917 4.917 0 010 9.834zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/p/Riadah-Typing-office-100089900881176/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-700 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-sm">
          <p>
            © {new Date().getFullYear()} RiadH Services. All rights reserved.
          </p>

          <p className="mt-3 md:mt-0">
            Designed for UAE Business Standards 🇦🇪
          </p>
        </div>
      </div>
    </footer>
  );
}
