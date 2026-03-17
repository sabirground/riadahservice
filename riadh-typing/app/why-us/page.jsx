"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function WhyUs() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-noise" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="container">
          <div className="hero-inner">
            {/* LEFT */}
            <div className="hero-left">
              <div className="hero-tag">
                <span className="eyebrow">Why Choose Riadah Services</span>
              </div>
              <h1 className="hero-h1">
                Your <span>Trusted Partner</span>
                <br />
                For Business in the UAE
              </h1>
              <p className="hero-sub">
                Over a decade of experience helping entrepreneurs, investors, and
                businesses navigate UAE regulations with confidence — from company
                formation to visa services.
              </p>
              <Link href="/get-quote" className="hero-cta">
                <span className="cta-box">
                  <span className="cta-icon">📋</span>
                  <span className="cta-text">Get Your Free Consultation</span>
                  <span className="cta-arrow">→</span>
                </span>
              </Link>

              <div className="hero-stats">
                <div>
                  <div className="stat-val">10+</div>
                  <div className="stat-lbl">Years Experience</div>
                </div>
                <div>
                  <div className="stat-val">5K+</div>
                  <div className="stat-lbl">Happy Clients</div>
                </div>
                <div>
                  <div className="stat-val">100%</div>
                  <div className="stat-lbl">Government Compliant</div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div>
              <div className="hero-card">
                <div className="hero-card-title">What sets us apart</div>
                <ul className="check-list">
                  <li>
                    <span className="check-icon">✓</span>
                    UAE-registered firm operating under full government compliance
                  </li>
                  <li>
                    <span className="check-icon">✓</span>
                    Fast-track company formation & visa processing
                  </li>
                  <li>
                    <span className="check-icon">✓</span>
                    Dedicated PRO team fluent in Arabic & English
                  </li>
                  <li>
                    <span className="check-icon">✓</span>
                    Transparent, fixed pricing — no hidden fees
                  </li>
                  <li>
                    <span className="check-icon">✓</span>
                    Single point of contact for all your requirements
                  </li>
                  <li>
                    <span className="check-icon">✓</span>
                    24-hour support & real-time status updates
                  </li>
                </ul>
                <div className="hero-badge">
                  <span className="hero-badge-icon">🏛️</span>
                  <div className="hero-badge-text">
                    <strong>UAE Government Approved</strong>
                    Licensed typing centre — Abu Dhabi- Al Ain
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="intro">
        <div className="container">
          <div className="intro-inner">
            <div>
              <div className="intro-label">
                <span className="eyebrow">Our Story</span>
              </div>
              <h2 className="intro-h2">
                Built on <em>Trust,</em>
                <br />
                Driven by Results
              </h2>
              <span className="gold-line gold-line-left" />
              <p className="intro-p">
                Riadah Typing Office was founded with a single mission: to make
                doing business in the UAE straightforward, fast, and
                stress-free. Since our inception, we have guided thousands of
                entrepreneurs through every step of their UAE journey.
              </p>
              <p className="intro-p">
                From visa applications and Emirates ID processing to trade licence
                renewals and PRO services — our team handles the complexity so
                you can focus on growing your business.
              </p>
              <div className="intro-quote">
                "We don't just process documents. We build long-term partnerships
                with every client we serve."
              </div>
            </div>

            <div className="mini-pillars">
              <div className="pillar-row">
                <div className="pillar-icon-wrap">🎯</div>
                <div>
                  <div className="pillar-title">Client-First Philosophy</div>
                  <div className="pillar-desc">
                    Every decision we make is guided by what's best for your
                    business. Your success is our metric.
                  </div>
                </div>
              </div>
              <div className="pillar-row">
                <div className="pillar-icon-wrap">⚡</div>
                <div>
                  <div className="pillar-title">Speed Without Compromise</div>
                  <div className="pillar-desc">
                    We leverage established government relationships to deliver
                    fast results without cutting corners.
                  </div>
                </div>
              </div>
              <div className="pillar-row">
                <div className="pillar-icon-wrap">🔒</div>
                <div>
                  <div className="pillar-title">Confidentiality Guaranteed</div>
                  <div className="pillar-desc">
                    Your business data and personal information are handled with
                    the highest level of discretion.
                  </div>
                </div>
              </div>
              <div className="pillar-row">
                <div className="pillar-icon-wrap">📋</div>
                <div>
                  <div className="pillar-title">Regulatory Expertise</div>
                  <div className="pillar-desc">
                    Our team stays current on all UAE legislation so your
                    business always remains compliant.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reasons Section */}
      <section className="reasons">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">6 Reasons to Choose Us</span>
            </div>
            <h2 className="section-h2">
              The Riadah <span>Advantage</span>
            </h2>
            <span className="gold-line" />
            <p className="section-sub">
              Thousands of businesses across the UAE choose Riadah because we
              deliver consistent excellence at every stage of the process.
            </p>
          </div>

          <div className="reasons-grid">
            <div className="reason-card">
              <div className="reason-num">01</div>
              <div className="reason-icon">🏢</div>
              <div className="reason-title">
                Government-Registered Typing Office
              </div>
              <div className="reason-text">
                We are a fully licensed typing office operating under UAE
                government authority — ensuring every document we process carries
                full legal validity.
              </div>
            </div>

            <div className="reason-card">
              <div className="reason-num">02</div>
              <div className="reason-icon">🌐</div>
              <div className="reason-title">Bilingual Expert Team</div>
              <div className="reason-text">
                Our consultants are fluent in Arabic and English, bridging
                communication gaps and ensuring precision in every application
                and form.
              </div>
            </div>

            <div className="reason-card">
              <div className="reason-num">03</div>
              <div className="reason-icon">⚡</div>
              <div className="reason-title">Industry-Leading Turnaround</div>
              <div className="reason-text">
                We have pre-established channels with key UAE government
                departments enabling significantly faster processing than
                standard timelines.
              </div>
            </div>

            <div className="reason-card">
              <div className="reason-num">04</div>
              <div className="reason-icon">💎</div>
              <div className="reason-title">Transparent Fixed Pricing</div>
              <div className="reason-text">
                No surprises. No hidden fees. Our clear pricing structure means
                you know exactly what you're paying before we begin any service.
              </div>
            </div>

            <div className="reason-card">
              <div className="reason-num">05</div>
              <div className="reason-icon">🤝</div>
              <div className="reason-title">End-to-End Support</div>
              <div className="reason-text">
                From your first enquiry to final document delivery, a dedicated
                consultant manages your case and keeps you informed at every
                milestone.
              </div>
            </div>

            <div className="reason-card">
              <div className="reason-num">06</div>
              <div className="reason-icon">📱</div>
              <div className="reason-title">Always-On Accessibility</div>
              <div className="reason-text">
                Reach us via WhatsApp, phone, or in-person. Our support team is
                available 7 days a week to address your queries without delay.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process">
        <div className="container">
          <div className="section-head">
            <div>
              <span
                className="eyebrow"
                style={{
                  color: "#f0c96b",
                  borderColor: "rgba(212,160,23,.35)",
                  background: "rgba(212,160,23,.08)",
                }}
              >
                How It Works
              </span>
            </div>
            <h2 className="section-h2" style={{ color: "#ffffff" }}>
              Simple. <span style={{ color: "#f0c96b" }}>Seamless.</span> Swift.
            </h2>
            <span className="gold-line" />
            <p className="section-sub" style={{ color: "rgba(255,255,255,.55)" }}>
              Our streamlined 4-step process ensures your requirements are met
              with maximum efficiency.
            </p>
          </div>

          <div className="steps">
            <div className="step">
              <div className="step-num">1</div>
              <div className="step-title">Free Consultation</div>
              <div className="step-text">
                Speak with our expert team to clarify your requirements,
                eligibility, and ideal service pathway.
              </div>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <div className="step-title">Document Collection</div>
              <div className="step-text">
                We provide a precise checklist and assist you in gathering every
                required document correctly.
              </div>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <div className="step-title">Expert Processing</div>
              <div className="step-text">
                Our PRO team submits and tracks your application through the
                appropriate government channels.
              </div>
            </div>
            <div className="step">
              <div className="step-num">4</div>
              <div className="step-title">Delivery & Support</div>
              <div className="step-text">
                Receive your completed documents with a full briefing and
                ongoing post-service support.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="metrics">
        <div className="container">
          <div className="section-head" style={{ marginBottom: "48px" }}>
            <div>
              <span className="eyebrow">By The Numbers</span>
            </div>
            <h2 className="section-h2">
              Our <span>Track Record</span> Speaks
            </h2>
            <span className="gold-line" />
          </div>
          <div className="metrics-grid">
            <div className="metric">
              <div className="metric-icon">🏆</div>
              <div className="metric-val">10+</div>
              <div className="metric-lbl">Years in Business</div>
            </div>
            <div className="metric">
              <div className="metric-icon">👥</div>
              <div className="metric-val">5,000+</div>
              <div className="metric-lbl">Clients Served</div>
            </div>
            <div className="metric">
              <div className="metric-icon">📄</div>
              <div className="metric-val">20K+</div>
              <div className="metric-lbl">Documents Processed</div>
            </div>
            <div className="metric">
              <div className="metric-icon">⭐</div>
              <div className="metric-val">4.9/5</div>
              <div className="metric-lbl">Average Client Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testi">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Client Stories</span>
            </div>
            <h2 className="section-h2">
              What Our <span>Clients</span> Say
            </h2>
            <span className="gold-line" />
            <p className="section-sub">
              Real experiences from real clients who trusted Riadah with their
              UAE business journey.
            </p>
          </div>
          <div className="testi-grid">
            <div className="testi-card">
              <div className="stars">★★★★★</div>
              <div className="testi-quote-mark">"</div>
              <div className="testi-text">
                Riadah handled my company formation from start to finish. What
                I thought would take months was completed in three weeks. Their
                team explained every step clearly and there were zero surprises.
                Highly recommended.
              </div>
              <div className="testi-author">
                <div className="testi-avatar">AK</div>
                <div>
                  <div className="testi-name">Ahmed Al-Khalidi</div>
                  <div className="testi-role">Managing Director, Dubai</div>
                </div>
              </div>
            </div>

            <div className="testi-card">
              <div className="stars">★★★★★</div>
              <div className="testi-quote-mark">"</div>
              <div className="testi-text">
                As an Indian expat setting up my first business in the UAE, I
                was overwhelmed. Riadah made the entire process seamless —
                visa, trade licence, Emirates ID. Everything was handled
                professionally and on time.
              </div>
              <div className="testi-author">
                <div className="testi-avatar">RS</div>
                <div>
                  <div className="testi-name">Ravi Shankar</div>
                  <div className="testi-role">Entrepreneur, Sharjah</div>
                </div>
              </div>
            </div>

            <div className="testi-card">
              <div className="stars">★★★★★</div>
              <div className="testi-quote-mark">"</div>
              <div className="testi-text">
                We've been using Riadah for our annual licence renewals and
                employee visa processing for three years. Their consistency,
                accuracy, and responsive support make them an invaluable
                partner for our operations.
              </div>
              <div className="testi-author">
                <div className="testi-avatar">SL</div>
                <div>
                  <div className="testi-name">Sarah Lin</div>
                  <div className="testi-role">HR Manager, Abu Dhabi</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner" id="contact">
        <div className="container">
          <div className="cta-inner">
            <div>
              <h2 className="cta-text-h">
                Ready to Start Your
                <br />
                <span>UAE Business Journey?</span>
              </h2>
              <p className="cta-text-p">
                Join thousands of entrepreneurs and businesses who trust Riadah
                for fast, compliant, and professional government services across
                the UAE.
              </p>
            </div>
            <div className="cta-btns">
              <a href="tel:+971528003934" className="btn-gold">
                📞 Call Us Now
              </a>
              <Link href="/get-quote" className="btn-gold">
                Get Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* ─── BASE STYLES ─────────────────────────────────────────── */
        :global(*) {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        :global(body) {
          font-family: 'DM Sans', 'Inter', system-ui, sans-serif;
          background: #faf8f3;
          color: #0d1117;
          -webkit-font-smoothing: antialiased;
        }

        /* ─── TOKENS ─────────────────────────────────────────────── */
        :root {
          --gold-100: #fdf3db;
          --gold-300: #f0c96b;
          --gold-400: #d4a017;
          --gold-500: #b8860b;
          --gold-600: #8b6509;
          --ink: #0d1117;
          --ink-2: #1e2630;
          --slate: #4b5563;
          --slate-lt: #9ca3af;
          --sand: #faf8f3;
          --white: #ffffff;
          --radius: 16px;
        }

        /* ─── UTILITY ─────────────────────────────────────────────── */
        .container {
          width: min(1200px, 92vw);
          margin-inline: auto;
        }
        .gold-line {
          display: block;
          width: 64px;
          height: 3px;
          background: linear-gradient(90deg, #d4a017, #f0c96b);
          border-radius: 999px;
          margin-inline: auto;
          margin-top: 12px;
          margin-bottom: 16px;
        }
        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #b8860b;
          border: 1px solid #f0c96b;
          background: #fdf3db;
          padding: 6px 16px;
          border-radius: 999px;
        }
        .eyebrow::before {
          content: "";
          display: inline-block;
          width: 6px;
          height: 6px;
          background: #d4a017;
          border-radius: 50%;
        }

        /* ─── HERO / HEADER ───────────────────────────────────────── */
        .hero {
          position: relative;
          padding: 160px 0 100px;
          background: #1e2630;
          overflow: hidden;
        }
        .hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            transparent 62%,
            rgba(212, 160, 23, 0.12) 62%
          );
          pointer-events: none;
        }
        .hero::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #d4a017, transparent);
        }
        .hero-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/svg%3E");
          opacity: 0.04;
          pointer-events: none;
        }
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .orb-1 {
          width: 520px;
          height: 520px;
          background: radial-gradient(circle, rgba(212, 160, 23, 0.18) 0%, transparent 70%);
          top: -200px;
          right: -100px;
        }
        .orb-2 {
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(212, 160, 23, 0.1) 0%, transparent 70%);
          bottom: -100px;
          left: 80px;
        }
        .hero-inner {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        .hero-tag {
          margin-bottom: 20px;
        }
        .hero-h1 {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2.8rem, 5.5vw, 4.4rem);
          font-weight: 700;
          line-height: 1.1;
          color: #ffffff;
          margin-bottom: 20px;
        }
        .hero-h1 span {
          background: linear-gradient(135deg, #f0c96b, #d4a017);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-sub {
          font-size: 1.05rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.75);
          max-width: 480px;
          margin-bottom: 36px;
        }
        .hero-cta {
          display: inline-block;
          text-decoration: none;
          margin-bottom: 20px;
        }
        .cta-box {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          padding: 22px 44px;
          background: linear-gradient(145deg, #1e2330 0%, #0f1219 100%);
          color: #f0c96b;
          font-weight: 700;
          font-size: 1.08rem;
          border-radius: 8px;
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(240, 201, 107, 0.25);
          position: relative;
          letter-spacing: 0.2px;
        }
        .cta-box::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 8px;
          padding: 1px;
          background: linear-gradient(145deg, rgba(240, 201, 107, 0.4), rgba(240, 201, 107, 0.1));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        .cta-box::after {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(240, 201, 107, 0.5), transparent);
        }
        .cta-icon {
          font-size: 1.25rem;
        }
        .cta-arrow {
          font-size: 1.15rem;
          transition: transform 0.3s ease;
          color: #f0c96b;
        }
        .hero-cta:hover .cta-box {
          transform: translateY(-3px);
          box-shadow: 
            0 12px 40px rgba(0, 0, 0, 0.5),
            0 0 25px rgba(240, 201, 107, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.12);
          border-color: rgba(240, 201, 107, 0.45);
        }
        .hero-cta:hover .cta-arrow {
          transform: translateX(5px);
        }

        .hero-stats {
          display: flex;
          gap: 40px;
          margin-top: 48px;
          padding-top: 36px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .stat-val {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2.4rem;
          font-weight: 700;
          background: linear-gradient(135deg, #f0c96b, #d4a017);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1;
        }
        .stat-lbl {
          font-size: 0.78rem;
          color: rgba(255, 255, 255, 0.6);
          margin-top: 4px;
          letter-spacing: 0.04em;
        }

        .hero-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(212, 160, 23, 0.22);
          border-radius: 20px;
          padding: 40px 36px;
          backdrop-filter: blur(14px);
        }
        .hero-card-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: #f0c96b;
          margin-bottom: 24px;
        }
        .check-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .check-list li {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          font-size: 0.92rem;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.5;
        }
        .check-icon {
          flex-shrink: 0;
          width: 22px;
          height: 22px;
          background: linear-gradient(135deg, #d4a017, #f0c96b);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          color: #1e2630;
          font-weight: 700;
          margin-top: 1px;
        }
        .hero-badge {
          margin-top: 28px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: rgba(212, 160, 23, 0.1);
          border: 1px solid rgba(212, 160, 23, 0.25);
          border-radius: 12px;
        }
        .hero-badge-icon {
          font-size: 1.6rem;
        }
        .hero-badge-text {
          font-size: 0.82rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.4;
        }
        .hero-badge-text strong {
          display: block;
          color: #f0c96b;
          font-size: 0.88rem;
        }

        /* ─── INTRO ─────────────────────────────────────────── */
        .intro {
          padding: 100px 0;
          background: #ffffff;
        }
        .intro-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: center;
        }
        .intro-label {
          margin-bottom: 14px;
        }
        .intro-h2 {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 700;
          line-height: 1.2;
          color: #0d1117;
          margin-bottom: 14px;
        }
        .intro-h2 em {
          font-style: normal;
          color: #b8860b;
        }
        .gold-line-left {
          margin: 0 0 24px;
          margin-left: 0;
        }
        .intro-p {
          font-size: 0.97rem;
          line-height: 1.8;
          color: #4b5563;
          margin-bottom: 18px;
        }
        .intro-quote {
          margin-top: 28px;
          padding: 20px 24px;
          border-left: 3px solid #d4a017;
          background: #fdf3db;
          border-radius: 0 12px 12px 0;
          font-style: italic;
          color: #1e2630;
          font-size: 0.92rem;
          line-height: 1.6;
        }

        .mini-pillars {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .pillar-row {
          display: flex;
          gap: 18px;
          align-items: flex-start;
          padding: 22px 24px;
          background: #faf8f3;
          border: 1px solid rgba(0, 0, 0, 0.07);
          border-radius: 14px;
          transition: box-shadow 0.25s, border-color 0.25s;
        }
        .pillar-row:hover {
          box-shadow: 0 6px 28px rgba(0, 0, 0, 0.07);
          border-color: #f0c96b;
        }
        .pillar-icon-wrap {
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #fdf3db, rgba(212, 160, 23, 0.12));
          border: 1px solid #f0c96b;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.35rem;
        }
        .pillar-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: #0d1117;
          margin-bottom: 4px;
        }
        .pillar-desc {
          font-size: 0.83rem;
          color: #4b5563;
          line-height: 1.5;
        }

        /* ─── REASONS GRID ────────────────────────────────────────── */
        .reasons {
          padding: 100px 0;
          background: #faf8f3;
        }
        .section-head {
          text-align: center;
          margin-bottom: 64px;
        }
        .section-h2 {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 700;
          color: #0d1117;
          margin-bottom: 12px;
        }
        .section-h2 span {
          color: #b8860b;
        }
        .section-sub {
          font-size: 0.97rem;
          color: #4b5563;
          max-width: 520px;
          margin-inline: auto;
          line-height: 1.7;
          margin-top: 16px;
        }
        .reasons-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        .reason-card {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 20px;
          padding: 36px 30px;
          position: relative;
          overflow: hidden;
          transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
        }
        .reason-card::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #d4a017, #f0c96b);
          transform: scaleX(0);
          transition: transform 0.3s;
        }
        .reason-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
          border-color: #f0c96b;
        }
        .reason-card:hover::after {
          transform: scaleX(1);
        }
        .reason-num {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 3rem;
          font-weight: 700;
          color: rgba(212, 160, 23, 0.15);
          line-height: 1;
          position: absolute;
          top: 18px;
          right: 24px;
        }
        .reason-icon {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #fdf3db, rgba(212, 160, 23, 0.15));
          border: 1px solid #f0c96b;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.6rem;
          margin-bottom: 20px;
        }
        .reason-title {
          font-size: 1.05rem;
          font-weight: 600;
          color: #0d1117;
          margin-bottom: 10px;
        }
        .reason-text {
          font-size: 0.875rem;
          color: #4b5563;
          line-height: 1.65;
        }

        /* ─── PROCESS ─────────────────────────────────────────────── */
        .process {
          padding: 100px 0;
          background: #1e2630;
          position: relative;
          overflow: hidden;
        }
        .process::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #d4a017, transparent);
        }
        .process::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #d4a017, transparent);
        }
        .steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          position: relative;
          margin-top: 56px;
        }
        .steps::before {
          content: "";
          position: absolute;
          top: 36px;
          left: calc(12.5% + 28px);
          right: calc(12.5% + 28px);
          height: 2px;
          background: linear-gradient(90deg, #d4a017, #f0c96b, #d4a017);
          z-index: 0;
        }
        .step {
          text-align: center;
          padding: 0 20px;
          position: relative;
          z-index: 1;
        }
        .step-num {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d4a017, #b8860b);
          color: #1e2630;
          font-weight: 700;
          font-size: 1.4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-inline: auto;
          box-shadow: 0 0 0 8px rgba(212, 160, 23, 0.12);
          font-family: 'Cormorant Garamond', Georgia, serif;
        }
        .step-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: #f0c96b;
          margin: 18px 0 8px;
        }
        .step-text {
          font-size: 0.82rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.6;
        }

        /* ─── TRUST METRICS ───────────────────────────────────────── */
        .metrics {
          padding: 100px 0;
          background: #ffffff;
        }
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 20px;
          overflow: hidden;
        }
        .metric {
          padding: 44px 28px;
          text-align: center;
          background: #ffffff;
          position: relative;
          transition: background 0.25s;
        }
        .metric:hover {
          background: #fdf3db;
        }
        .metric + .metric {
          border-left: 1px solid rgba(0, 0, 0, 0.08);
        }
        .metric-val {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 3.2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #d4a017, #8b6509);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1;
        }
        .metric-lbl {
          font-size: 0.82rem;
          color: #4b5563;
          margin-top: 8px;
          letter-spacing: 0.04em;
        }
        .metric-icon {
          font-size: 1.8rem;
          margin-bottom: 12px;
        }

        /* ─── TESTIMONIALS ────────────────────────────────────────── */
        .testi {
          padding: 100px 0;
          background: #faf8f3;
        }
        .testi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          margin-top: 56px;
        }
        .testi-card {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.07);
          border-radius: 20px;
          padding: 32px 28px;
          position: relative;
          transition: box-shadow 0.25s;
        }
        .testi-card:hover {
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.07);
        }
        .testi-quote-mark {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 5rem;
          line-height: 0.6;
          color: #f0c96b;
          font-weight: 700;
          margin-bottom: 16px;
        }
        .testi-text {
          font-size: 0.9rem;
          color: #4b5563;
          line-height: 1.7;
          font-style: italic;
        }
        .testi-author {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 24px;
        }
        .testi-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f0c96b, #b8860b);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1rem;
          color: #1e2630;
          flex-shrink: 0;
        }
        .testi-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: #0d1117;
        }
        .testi-role {
          font-size: 0.78rem;
          color: #9ca3af;
        }
        .stars {
          color: #d4a017;
          font-size: 0.8rem;
          margin-bottom: 12px;
          letter-spacing: 2px;
        }

        /* ─── CTA BANNER ──────────────────────────────────────────── */
        .cta-banner {
          padding: 100px 0;
          background: linear-gradient(135deg, #1e2630 0%, #111827 100%);
          position: relative;
          overflow: hidden;
        }
        .cta-banner::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 60% at 80% 50%, rgba(212, 160, 23, 0.12) 0%, transparent 70%);
        }
        .cta-inner {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }
        .cta-text-h {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 10px;
        }
        .cta-text-h span {
          background: linear-gradient(135deg, #f0c96b, #d4a017);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .cta-text-p {
          font-size: 0.97rem;
          color: rgba(255, 255, 255, 0.6);
          max-width: 480px;
          line-height: 1.7;
        }
        .cta-btns {
          display: flex;
          gap: 16px;
          flex-shrink: 0;
        }
        .btn-gold {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px 32px;
          background: linear-gradient(135deg, #f0c96b 0%, #d4a017 50%, #f0c96b 100%);
          color: #0d1117;
          font-weight: 700;
          font-size: 1rem;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(212, 160, 23, 0.4), 0 0 0 0 rgba(212, 160, 23, 0.4);
          transition: all 0.3s ease;
          white-space: nowrap;
          text-decoration: none;
          border: 2px solid #f0c96b;
        }
        .btn-gold:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 30px rgba(212, 160, 23, 0.5), 0 0 25px rgba(212, 160, 23, 0.4);
        }
        .btn-outline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 18px 40px;
          background: transparent;
          color: #c9a227;
          font-weight: 600;
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          border-radius: 4px;
          box-shadow: none;
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          white-space: nowrap;
          text-decoration: none;
          cursor: pointer;
          border: 1px solid rgba(201, 162, 39, 0.4);
          position: relative;
          overflow: visible;
          user-select: none;
        }
        .btn-outline::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #c9a227 0%, #f0d77c 25%, #c9a227 50%, #f0d77c 75%, #c9a227 100%);
          background-size: 200% 100%;
          opacity: 0;
          transition: opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          z-index: -1;
        }
        .btn-outline::after {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 6px;
          padding: 2px;
          background: linear-gradient(135deg, #c9a227, #f0d77c, #c9a227, #f0d77c);
          background-size: 300% 300%;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          opacity: 0.6;
          animation: borderGlow 3s ease infinite;
          transition: opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        @keyframes borderGlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .btn-outline:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 
            0 15px 40px rgba(201, 162, 39, 0.3),
            0 0 30px rgba(201, 162, 39, 0.15),
            inset 0 0 20px rgba(201, 162, 39, 0.1);
          color: #0a0a0a;
          border-color: rgba(201, 162, 39, 0.8);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          cursor: pointer;
        }
        .btn-outline:active {
          transform: translateY(-1px) scale(0.98);
          box-shadow: 
            0 5px 15px rgba(201, 162, 39, 0.25),
            0 0 15px rgba(201, 162, 39, 0.1);
        }
        .btn-outline:hover::before {
          opacity: 1;
          background-position: 100% 0;
        }
        .btn-outline:hover::after {
          opacity: 0;
        }

        /* ─── MOBILE ──────────────────────────────────────────────── */
        @media (max-width: 960px) {
          .hero-inner {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .hero {
            padding: 140px 0 64px;
          }
          .hero-sub {
            max-width: 100%;
          }
          .intro-inner {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .reasons-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .steps {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
          }
          .steps::before {
            display: none;
          }
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .metric + .metric {
            border-left: none;
          }
          .metric:nth-child(odd) {
            border-right: 1px solid rgba(0, 0, 0, 0.08);
          }
          .metric:nth-child(1),
          .metric:nth-child(2) {
            border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          }
          .testi-grid {
            grid-template-columns: 1fr;
          }
          .cta-inner {
            flex-direction: column;
            text-align: center;
          }
          .cta-btns {
            flex-direction: column;
            align-items: center;
          }
        }
        @media (max-width: 640px) {
          .reasons-grid {
            grid-template-columns: 1fr;
          }
          .hero-stats {
            gap: 28px;
          }
          .stat-val {
            font-size: 1.8rem;
          }
          .steps {
            grid-template-columns: 1fr;
          }
          .metrics-grid {
            grid-template-columns: 1fr;
          }
          .metric + .metric {
            border-left: none;
            border-top: 1px solid rgba(0, 0, 0, 0.08);
          }
          .metric:nth-child(odd) {
            border-right: none;
          }
          .hero-cta {
            width: 100%;
            justify-content: center;
          }
          .cta-btns {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .btn-gold, .btn-outline {
            width: 100%;
            justify-content: center;
            padding: 14px 24px;
            font-size: 0.95rem;
          }
        }
        @media (min-width: 961px) {
          .cta-btns {
            display: flex;
            flex-direction: row;
            gap: 16px;
            align-items: center;
          }
          .btn-gold, .btn-outline {
            width: auto;
            min-width: 200px;
          }
        }
      `}</style>
    </>
  );
}
