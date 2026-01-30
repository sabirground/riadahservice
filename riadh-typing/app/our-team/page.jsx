import Image from "next/image";

const owners = [
  {
    name: "Mohammed Hakeem",
    designation: "Chief Executive Officer",
    image: "/team/M Hakeem.jpeg",
  },
  {
    name: "Noorul Ameen",
    designation: "Managing Director",
    image: "/team/Noorul Ameen.jpeg",
  },
  {
    name: "Muhammed Rafeeq",
    designation: "Administrator",
    image: "/team/M rafeeq.jpeg",
  },
];

const employees = [
  {
    name: "Abdul Rashid",
    designation: "Senior Typist",
    image: "/team/Abdul Rashid.jpeg",
  },
  {
    name: "Afsal",
    designation: "Senior Typist",
    image: "/team/Afsal.jpeg",
  },
  {
    name: "Muhammed Hubaib",
    designation: "Typing Specialist",
    image: "/team/M Hubaib.jpeg",
  },
  {
    name: "Muhammed Anas",
    designation: "Accountant",
    image: "/team/M Anas.jpeg",
  },
  {
    name: "Muhammed Jazeel",
    designation: "Typist",
    image: "/team/M Jazeel.jpeg",
  },
  {
    name: "Anas C.P",
    designation: "Typist",
    image: "/team/Anas Cp.jpeg",
  },
  
];

export default function OurTeamPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-white to-slate-100">
        <div className="container text-center max-w-3xl">
          <h1 className="font-bold text-slate-900 mb-4">
            Our Team
          </h1>
          <p className="text-lg text-slate-600">
            Meet the professionals behind our success — experienced, dedicated,
            and committed to delivering high-quality services across the UAE.
          </p>
        </div>
      </section>

      {/* Owners Section */}
      <section>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-semibold text-slate-900 mb-3">
              Leadership Team
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              The founders and leadership who guide our company with vision,
              integrity, and professionalism.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {owners.map((person, index) => (
              <div key={index} className="card text-center">
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">
                  {person.name}
                </h3>
                <p className="text-[var(--primary)] font-medium mt-1">
                  {person.designation}
                </p>
                <p className="text-sm text-slate-600 mt-3">
                  Owner & Core Decision Maker
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Employees Section */}
      <section className="bg-slate-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-semibold text-slate-900 mb-3">
              Our Professional Team
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our skilled employees ensure smooth operations and excellent
              service delivery for all our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {employees.map((person, index) => (
              <div
                key={index}
                className="card text-center hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative w-32 h-32 mx-auto mb-5">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="font-semibold text-slate-900">
                  {person.name}
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  {person.designation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
