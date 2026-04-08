import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-6">

      <div className="max-w-5xl mx-auto space-y-10">

        {/* 🔥 Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            About Us
          </h1>
          <p className="text-gray-600">
            Building connections between skilled workers and customers
          </p>
        </div>

        {/* 🔥 Description */}
        <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-md border text-center">
          <p className="text-gray-700 leading-relaxed">
            We are a full-stack web startup platform connecting local service
            providers such as plumbers, tutors, electricians, and delivery
            agents with customers. Our mission is to simplify access to trusted
            professionals and create opportunities for skilled individuals in
            local communities.
          </p>
        </div>

        {/* 🔥 Team Section */}
        <div className="space-y-6">

          <h2 className="text-2xl font-bold text-center text-gray-800">
            Our Team
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

            {/* Founder */}
            <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition text-center">
              <h3 className="text-lg font-semibold text-blue-600">
                Neha Bernawal
              </h3>
              <p className="text-gray-500 text-sm">Founder</p>
            </div>

            {/* Co-Founder */}
            <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition text-center">
              <h3 className="text-lg font-semibold text-indigo-600">
                Rampratap Yadav
              </h3>
              <p className="text-gray-500 text-sm">Co-Founder</p>
            </div>

            {/* Members */}
            <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                Ankit Mahabharat
              </h3>
              <p className="text-gray-500 text-sm">Team Member</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                Arjun Kumar Pandey
              </h3>
              <p className="text-gray-500 text-sm">Team Member</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default About;