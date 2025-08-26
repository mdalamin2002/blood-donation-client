import React from "react";
import { FaHandHoldingHeart, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router";

const HowToDonate = () => {
  const steps = [
    {
      icon: <FaCheckCircle className="text-red-600 w-8 h-8" />,
      title: "Check Eligibility",
      description:
        "Make sure you meet age, weight, and health requirements to donate blood safely.",
    },
    {
      icon: <FaCalendarAlt className="text-red-600 w-8 h-8" />,
      title: "Schedule Appointment",
      description:
        "Book your donation slot at the nearest blood donation center or event.",
    },
    {
      icon: <FaHandHoldingHeart className="text-red-600 w-8 h-8" />,
      title: "Donate Blood",
      description:
        "Follow the simple donation process under trained professionals and save lives.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50" id="how-to-donate">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-red-600 mb-12">
          How to Donate Blood
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-16 text-lg sm:text-xl">
          Donating blood is simple and can save multiple lives. Follow these easy steps and join our community of heroes.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition duration-300"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-center">{step.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-12">
          <Link
            to="/registration"
            className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
          >
            Become a Donor ❤️
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowToDonate;
