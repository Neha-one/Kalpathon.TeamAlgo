import React from "react";
import arjunImage from "../assets/ar.jpeg";
import ankitImage from "../assets/an.jpeg";

const teamMembers = [
  {
    name: "Neha Kumari Baranwal",
    role: "Team Member",
    roleColor: "text-blue-600",
    image: "", // Add image URL here
    links: {
      github: "#",
      linkedin: "#",
      instagram: "#",
    },
  },
  {
    name: "Rampratap Yadav",
    role: "Team Member",
    roleColor: "text-indigo-600",
    image: "", // Add image URL here
    links: {
      github: "#",
      linkedin: "#",
      instagram: "#",
    },
  },
  {
    name: "Ankit Mahabharat",
    role: "Team Member",
    roleColor: "text-indigo-600",
    image: ankitImage, // Add image URL here
    links: {
      github: "https://github.com/ankitmahabharat",
      linkedin: "https://www.linkedin.com/in/ankit-mahabharat-7730b7134/",
      instagram: "https://www.instagram.com/ankit_mahabharat/",
    },
  },
  {
    name: "Arjun Kumar Pandey",
    role: "Team Member",
    roleColor: "text-indigo-600",
    image: arjunImage, // Add image URL here
    links: {
      github: "https://github.com/arjunkumarpandey45",
      linkedin: "https://www.linkedin.com/in/arjun-kumar-pandey-b2a24a330/",
      instagram: "https://www.instagram.com/ig_arjunpandit45/?hl=en",
    },
  },
];

const SocialIcon = ({ href, type }) => {
  const icons = {
    github: (
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
    linkedin: (
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
          clipRule="evenodd"
        />
      </svg>
    ),
    instagram: (
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
          clipRule="evenodd"
        />
      </svg>
    ),
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-slate-400 transition-colors hover:text-blue-700"
    >
      {icons[type]}
    </a>
  );
};

const About = () => {
  return (
    <div className="premium-page px-4 py-10 md:py-12">
      <div className="premium-shell space-y-8 md:space-y-10">
        <div className="fade-slide text-center space-y-2">
          <h1 className="premium-section-title">About Us</h1>
          <p className="premium-subtitle">
            Building connections between skilled workers and customers
          </p>
        </div>

        <div className="premium-card fade-slide border-white/60 p-6 text-center md:p-8">
          <p className="leading-relaxed text-slate-700">
            We are a full-stack web startup platform connecting local service
            providers such as plumbers, tutors, electricians, and delivery
            agents with customers. Our mission is to simplify access to trusted
            professionals and create opportunities for skilled individuals in
            local communities.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-center text-3xl font-extrabold text-slate-900">
            Meet Our Team
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="premium-card-strong group flex flex-col items-center border border-blue-100/70 p-6 text-center transition duration-300 hover:-translate-y-1"
              >
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="mb-4 h-20 w-20 rounded-full border-2 border-white object-cover shadow-md"
                  />
                ) : (
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-white bg-linear-to-r from-slate-100 to-slate-200 text-2xl font-bold text-slate-500 shadow-md">
                    {member.name.charAt(0)}
                  </div>
                )}

                <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-700">
                  {member.name}
                </h3>
                <p className={`text-sm font-medium ${member.roleColor} mt-1`}>
                  {member.role}
                </p>

                <div className="mt-5 flex w-full items-center justify-center space-x-4 border-t border-slate-100 pt-4">
                  <SocialIcon href={member.links.github} type="github" />
                  <SocialIcon href={member.links.linkedin} type="linkedin" />
                  <SocialIcon href={member.links.instagram} type="instagram" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
