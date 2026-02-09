"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  FadeInOnScroll,
  StaggerContainer,
  StaggerItem,
  TiltCard,
  HoverScale,
  GoldAccentLine,
} from "../components/MicroInteractions";

/* ================= TEAM DATA (UAE PROFESSIONAL) ================= */

const teamMembers = [
  {
    name: "Mohammed Hakeem",
    designation: "Managing Partner – Head Office",
    image: "/team/M Hakeem.jpeg",
    phone: "+971528003934",
    email: "riadahtyping@gmail.com",
    description: `Mohammed Hakeem is a Managing Partner at Riadah Typing Office – Head Office.
He has 15+ years of experience in typing, visa, and business formation services.
He provides strategic leadership and guidance for all company operations.
He ensures excellence in company setup, government approvals, and documentation.
He supports business growth and client satisfaction across all services.`,
  },
  {
    name: "Noorul Ameen",
    designation: "Operations Director – Head Office",
    image: "/team/Noorul Ameen.jpeg",
    phone: "+971528003934",
    email: "ridahtyping@gmail.com",
    description: `Noorul Ameen serves as the Operations Director of Riadah Typing Office – Head Office.
He has 15+ years of experience in UAE business services and operations.
He oversees daily operations across all branches and service areas.
He ensures efficiency, compliance, and high-quality service delivery.`,
  },
  {
    name: "Muhammed Rafeeq",
    designation: "Managing Partner – Head Office",
    image: "/team/M rafeeq.jpeg",
    phone: "+971528003934",
    email: "riadshtyping@gmail.com",
    description: `Muhammed Rafeeq is a Managing Partner at Riadah Typing Office – Head Office.
He has 15+ years of experience in business formation, visas, and typing services.
He oversees operations and ensures high-quality service across branches.`,
  },
  {
    name: "Afsal",
    designation: "Office Manager – Head Office",
    image: "/team/Afsal.jpeg",
    phone: "+971588928027",
    email: "riadahtyping@gmail.com",
    description: `Afsal serves as the Office Manager at Riadah Typing Office – Head Office.
He has 3+ years of experience in typing, visa processing, and business services.
He specializes in company setup, business formation, and document attestation.
He manages daily operations and coordinates all client requests efficiently.`,
  },
  {
    name: "Muhammed Hubaib",
    designation: "Office Manager – Branch Office",
    image: "/team/M Hubaib.jpeg",
    phone: "+971586912158",
    email: "riadahtyping@gmail.com",
    description: `Hubaib is the Office Manager of the Branch Office at Riadah Typing Office.
He has 2.5+ years of experience in typing and business-related services.
He specializes in company registration, business formation, and government approvals.`,
  },
  {
     name: "Abdul Rashid",
    designation: "Office Administrator – Head Office",
    image: "/team/RAshidteam.jpeg",
    phone: "+971528003934",
    email: "riadahtyping@gmail.com",
    description: `Abdul Rashid works as the Office Administrator at Riadah Typing Office – Head Office.
He has 2+ years of experience in administration, typing, and business support.
He specializes in company registration, trade licenses, and document processing.`,
  },
  {
    name: "Muhammed Anas",
    designation: "Accountant – Head Office",
    image: "/team/M Anas.jpeg",
    phone: "+971528003934",
    email: "riadahtyping@gmail.com",
    description: `Muhammend Anas manages the accounting functions of Riadah Typing Office – Head Office.
He has 7+ years of experience in accounting, finance, and business documentation.
He oversees daily financial transactions and ensures compliance.`,
  },
  {
    name: "Anas C.P",
    designation: "Customer Consultant – Branch Office",
    image: "/team/Anas Cp.jpeg",
    phone: "+971528003934",
    email: "riadahtyping@gmail.com",
    description: `Anas works as a Customer Consultant at the Branch Office of Riadah Typing Office.
He has 1+ year of experience in typing and business-related services.
He specializes in company setup, ticket booking, and travel services.`,
  },
  {
    name: "Jazeel",
    designation: "Customer Consultant – Head Office",
    image: "/team/M Jazeel.jpeg",
    phone: "+971586912158",
    email: "riadahtyping@gmail.com",
    description: `Jazeel is a Customer Consultant at the Head Office of Riadah Typing Office.
He has 1+ year of experience* in customer support and business services.
He specializes in company setup, trade licenses, .
He assists clients with clear guidance through all document and registration processes.
He ensures a smooth and professional customer experience.`,
  },
];

/* ================= POPUP MODAL ================= */

function TeamModal({ member, onClose }) {
  if (!member) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white max-w-xl w-full rounded-2xl shadow-2xl p-6 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        <div className="flex gap-5 items-center">
          <Image
            src={member.image}
            alt={member.name}
            width={100}
            height={100}
            className="rounded-full border-4 border-gold-400 object-cover object-center"
          />
          <div>
            <h3 className="text-xl font-bold">{member.name}</h3>
            <p className="text-gold-600 font-semibold">{member.designation}</p>
          </div>
        </div>

        <p className="mt-4 text-gray-700 whitespace-pre-line text-sm leading-relaxed">
          {member.description}
        </p>

        <div className="mt-6 flex gap-3">
          <a
            href={`tel:${member.phone}`}
            className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
          >
            📞 Call
          </a>
          <a
            href={`mailto:${member.email}`}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            ✉️ Gmail
          </a>
        </div>
      </div>
    </div>
  );
}

/* ================= PAGE ================= */

export default function OurTeamPage() {
  const [selectedMember, setSelectedMember] = useState(null);

  // Separate leadership from other team members
  const leadership = teamMembers.filter(member => 
    member.designation.includes("Managing Partner") || 
    member.designation.includes("Operations Director")
  );
  
  const employees = teamMembers.filter(member => 
    !member.designation.includes("Managing Partner") && 
    !member.designation.includes("Operations Director")
  );

  return (
    <>
      {/* Hero Section (UNCHANGED) */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-sand-50 via-sand-100 to-sand-50">
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <h1 className="text-display-xl text-slate-900 mb-6">
            Meet Our <span className="text-gradient-gold">Team</span>
          </h1>
          <GoldAccentLine className="w-24 mx-auto mb-6" />
          <p className="text-body-lg text-slate-600">
            Meet the professionals behind our success across the UAE.
          </p>
        </div>
      </section>

      {/* LEADERSHIP SECTION */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Leadership Team</h2>
            <GoldAccentLine className="w-20 mx-auto" />
          </div>
          
          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            staggerDelay={0.1}
          >
            {leadership.map((person, index) => (
              <StaggerItem key={index}>
                <TiltCard>
                  <HoverScale scale={1.03}>
                    <div
                      onClick={() => setSelectedMember(person)}
                      className="card text-center p-8 group hover:border-gold-300 transition-colors duration-300 cursor-pointer bg-gradient-to-br from-sand-50 to-white"
                    >
                      <div className="w-36 h-36 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gold-300 group-hover:border-gold-400 transition-colors duration-300 relative shadow-lg">
                        <Image
                          src={person.image}
                          alt={person.name}
                          fill
                          style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
                          sizes="144px"
                        />
                      </div>
                      <h3 className="font-bold text-slate-900 text-xl">
                        {person.name}
                      </h3>
                      <p className="text-sm text-gold-600 mt-2 font-semibold">
                        {person.designation}
                      </p>
                      <p className="text-xs text-slate-500 mt-3">
                        Click to view profile
                      </p>
                    </div>
                  </HoverScale>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* TEAM MEMBERS SECTION */}
      <section className="section bg-sand-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Team</h2>
            <GoldAccentLine className="w-20 mx-auto" />
          </div>
          
          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            staggerDelay={0.1}
          >
            {employees.map((person, index) => (
              <StaggerItem key={index}>
                <TiltCard>
                  <HoverScale scale={1.03}>
                    <div
                      onClick={() => setSelectedMember(person)}
                      className="card text-center p-6 group hover:border-gold-300 transition-colors duration-300 cursor-pointer bg-white"
                    >
                      <div className="w-32 h-32 mx-auto mb-5 rounded-full overflow-hidden border-4 border-sand-100 group-hover:border-gold-200 transition-colors duration-300 relative">
                        <Image
                          src={person.image}
                          alt={person.name}
                          fill
                          style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
                          sizes="128px"
                        />
                      </div>
                      <h3 className="font-semibold text-slate-900 text-lg">
                        {person.name}
                      </h3>
                      <p className="text-sm text-gold-600 mt-1 font-medium">
                        {person.designation}
                      </p>
                      <p className="text-xs text-slate-500 mt-2">
                        Click to view profile
                      </p>
                    </div>
                  </HoverScale>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* MODAL */}
      <TeamModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </>
  );
}
