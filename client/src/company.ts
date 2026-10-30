// Facts about Jodu Labs shown on the site. Legal details are from the certificate
// of incorporation; publish only the town for the registered office, never the
// street address, PAN or TAN.
export const company = {
  legalName: "Jodulabs (OPC) Private Limited",
  cin: "U62011KA2025OPC213343",
  location: "Honavar, Uttara Kannada, Karnataka",
  email: "contact@jodulabs.com",
};
export const privacyUrl = "https://jodu.io/privacy";

export type Person = {
  name: string;
  role: string;
  bio: string;
  // Path under /company/team/; people without one show their initials.
  photo?: string;
  links: { label: string; href: string }[];
};

export const team: Person[] = [
  {
    name: "Guruprasad Hegde",
    role: "Founder",
    photo: "/company/team/guruprasad-hegde.jpg",
    bio: "Software engineer. I believe every house should be designed digitally before it’s built, not only the high-end ones. Jodu is my attempt to make that the default for homes across India.",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/guruprasad-hegde-9b6830356/" },
      { label: "X", href: "https://x.com/gruuprasad" },
      { label: "GitHub", href: "https://github.com/gruuprasad" },
    ],
  },
  {
    name: "Mahabaleshwar Hegde",
    role: "Investor & Advisor",
    photo: "/company/team/mahabaleshwar-hegde.jpg",
    bio: "Software engineer with decades of experience in the IT industry. I solve problems around customer needs and make sure our organisation is part of customer success. Advisor in product ideas and strategies.",
    links: [],
  },
];
