const rawServices = [
  {
    category: "Visa Services",
    image: "/Images/visa-passport-photo.jpg",
    items: [
      "New Residency Visa",
      "Renew Residency Visa",
      "Cancel Residency Visa",
      "Golden Visa Nomination",
      "Golden Visa Full Process",
      "Transfer Visa To New Passport",
      "Data Modification",
      "New Born Visa",
      "Dependents On Hold",
    ],
  },
  {
    category: "Business Setup / Trading License",
    image: "/Images/Local-Sponsor-in-Dubai.jpg",
    items: [
      "New Business Consultancy",
      "Renew Trade License",
      "Amend Trade License",
      "Cancel Trade License",
    ],
  },
  {
    category: "Trade Mark Registration",
    image: "/Images/Trademark-Dilution.jpg",
    items: ["Trade Mark Registration"],
  },
  {
    category: "Domestic Visa Services",
    image: "/Images/domestic.png",
    items: [
      "New Residency Visa",
      "Absconding Report",
      "Cancel Residency Visa",
      "Renew Residency Visa",
    ],
  },
  {
    category: "Visit / Tourist Visa",
    image: "/Images/dubaivisachange.webp",
    items: ["UAE Tourist Visa", "Saudi Arabia Visa"],
  },
  {
    category: "Accounting & Book Keeping",
    image: "/Images/accounting.jpg",
    items: ["Tax Registration"],
  },
  {
    category: "Translation & Attestation",
    image: "/Images/translation-.jpg",
    items: ["Attestation", "Translation"],
  },
  {
    category: "Notary Public",
    image: "/Images/pro-service.jpg",
    items: [
      "Power Of Attorney & Pledges",
      "Commercial Contract",
      "Declaration",
    ],
  },
  {
    category: "Vehicles & Drivers",
    image: "/Images/UAE-International-Drivers-License-696x391.webp",
    items: [
      "Pay Traffic Fines",
      "Traffic Fines Discount",
      "Mawaqif Residential Permit",
      "Vehicle Insurance",
      "Vehicle Registration Renewal",
      "Black Points Transfer",
      "International Driving License",
      "Vehicle Ownership Transfer",
      "Driving License Renewal",
    ],
  },
  {
    category: "Other Services",
    image: "/Images/lobby.jpeg",
    items: [
      "General Liability Insurance",
      "Property Insurance",
      "Health Insurance",
      "Visa Medical Test",
      "Emirates ID Services",
    ],
  },
];

const services = rawServices.map(service => ({
  title: service.category,
  slug: service.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  description: service.items.join(', '),
  image: service.image,
}));

export default services;
export { rawServices };
