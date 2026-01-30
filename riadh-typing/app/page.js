import Link from "next/link";
import services from "./data/services.js";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white to-slate-100">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div>
            <h1 className="font-bold text-slate-900 mb-4">
              Professional Business Services in UAE
            </h1>

            <p className="text-lg text-slate-600 mb-6 max-w-xl">
              We provide reliable, affordable, and professional services tailored
              for businesses and individuals across the UAE. Quality, trust, and
              timely delivery — guaranteed.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/get-quote" className="btn btn-primary">
                Get Free Quote
              </Link>

              <Link
                href="/services"
                className="btn border border-slate-300 hover:bg-slate-200"
              >
                Our Services
              </Link>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <ul className="space-y-4 text-slate-700">
                <li className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[var(--secondary)]"></span>
                  Trusted UAE Business Partner
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[var(--secondary)]"></span>
                  Experienced & Professional Team
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[var(--secondary)]"></span>
                  Fast Response & Support
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[var(--secondary)]"></span>
                  Competitive Pricing
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="relative bg-cover bg-center py-16" style={{backgroundImage: "url('/Images/dubaivisachange.webp')"}}>
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/70 to-orange-500/70"></div>
        <div className="relative container text-center">
          <h2 className="mb-4 font-semibold text-white">
            Serving Clients Across the UAE
          </h2>
          <p className="max-w-2xl mx-auto text-gray-100">
            From Dubai to Abu Dhabi, Sharjah to Ajman — we support businesses with
            dependable services that help you grow with confidence.
          </p>
        </div>
      </section>

       <section className="section">
         <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">Our Services</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
           {services.map((service, index) => (
             <a
               key={index}
               href={`/services#${service.slug}`}
               className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden block"
             >
               <img
                 src={service.image}
                 alt={service.title}
                 className="w-full h-48 object-cover"
               />
               <div className="p-4">
                 <h3 className="text-xl font-semibold text-slate-800">{service.title}</h3>
               </div>
             </a>
           ))}
         </div>
       </section>
       {/* UAE Trust Section */}
<section className="relative bg-cover bg-center" style={{backgroundImage: "url('/Images/lobby.jpeg')"}}>
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
  <div className="relative container">
    <div className="text-center mb-12">
      <h2 className="font-semibold text-white mb-3">
        Trusted Business Partner in the UAE
      </h2>
      <p className="text-gray-300 max-w-2xl mx-auto">
        We follow UAE regulations and deliver reliable services with transparency,
        professionalism, and commitment.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Card 1 */}
      <div className="card text-center bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
          <span className="text-2xl">🏢</span>
        </div>
        <h3 className="font-semibold text-slate-900 mb-2">
          UAE Registered
        </h3>
        <p className="text-slate-600 text-sm">
          Fully compliant with UAE business and government regulations.
        </p>
      </div>

      {/* Card 2 */}
      <div className="card text-center bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
          <span className="text-2xl">🤝</span>
        </div>
        <h3 className="font-semibold text-slate-900 mb-2">
          Trusted by Clients
        </h3>
        <p className="text-slate-600 text-sm">
          Serving individuals and businesses across the UAE with trust.
        </p>
      </div>

      {/* Card 3 */}
      <div className="card text-center bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
          <span className="text-2xl">⏱️</span>
        </div>
        <h3 className="font-semibold text-slate-900 mb-2">
          Fast Processing
        </h3>
        <p className="text-slate-600 text-sm">
          Quick response time with accurate and timely service delivery.
        </p>
      </div>

      {/* Card 4 */}
      <div className="card text-center bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
          <span className="text-2xl">⭐</span>
        </div>
        <h3 className="font-semibold text-slate-900 mb-2">
          Quality Assured
        </h3>
        <p className="text-slate-600 text-sm">
          High-quality service standards with complete customer satisfaction.
        </p>
      </div>
    </div>
  </div>
</section>

     </>
   );
 }
