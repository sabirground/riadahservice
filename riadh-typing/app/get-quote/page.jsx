import EnquiryForm from "@/app/components/EnquiryForm";
import Link from "next/link";

export default function GetQuotePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-white to-slate-100">
        <div className="container text-center max-w-3xl">
          <h1 className="font-bold text-slate-900 mb-4">
            Get a Free Quote
          </h1>
          <p className="text-lg text-slate-600">
            Tell us your requirements and our team will get back to you with a
            customized solution tailored for UAE standards.
          </p>

          <div className="mt-6">
            <Link
              href="/services"
              className="text-[var(--primary)] font-semibold hover:underline"
            >
              View Our Services →
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Highlights */}
      <section>
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="card">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold text-slate-900 mb-1">
                Quick Response
              </h3>
              <p className="text-slate-600 text-sm">
                We usually respond within 24 hours.
              </p>
            </div>

            <div className="card">
              <div className="text-3xl mb-2">💼</div>
              <h3 className="font-semibold text-slate-900 mb-1">
                Professional Team
              </h3>
              <p className="text-slate-600 text-sm">
                Experienced professionals following UAE regulations.
              </p>
            </div>

            <div className="card">
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="font-semibold text-slate-900 mb-1">
                100% Confidential
              </h3>
              <p className="text-slate-600 text-sm">
                Your information is safe and secure with us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <EnquiryForm />
    </>
  );
}
