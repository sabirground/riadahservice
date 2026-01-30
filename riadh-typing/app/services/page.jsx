"use client";

import { rawServices } from "../data/services";
import Link from "next/link";
import { useEffect } from "react";

export default function ServicesPage() {
  useEffect(() => {
    if (window.location.hash) {
      const element = document.getElementById(window.location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);
  return (
    <section className="section pt-32">
      <h1 className="text-4xl font-bold mb-12 text-center">Services</h1>

      {rawServices.map((group, index) => (
        <div key={index} className="mb-14">
          <h2 id={group.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')} className="text-2xl font-semibold mb-6 text-red-700">
            {group.category}
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {group.items.map((item, i) => (
              <div
                key={i}
                className="card hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {item}
                </h3>

                <p className="text-slate-600 mb-6">
                </p>

                <Link
                  href={`/services/${item.toLowerCase().replace(/ /g, "-")}`}
                  className="btn btn-primary w-full text-center"
                >
                  View Service
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

