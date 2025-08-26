import React from "react";
import { FaTint, FaUserPlus, FaSearch, FaHandsHelping } from "react-icons/fa";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <FaUserPlus />,
    title: "Register as Donor",
    desc: "Sign up with your blood group and location to be ready to help those in need.",
    color: "bg-red-100 text-red-600",
  },
  {
    icon: <FaSearch />,
    title: "Find or Request",
    desc: "Search for donors or make a request that instantly reaches those nearby.",
    color: "bg-red-100 text-red-600",
  },
  {
    icon: <FaHandsHelping />,
    title: "Connect & Donate",
    desc: "Communicate securely with donors and donate blood where it's most needed.",
    color: "bg-red-100 text-red-600",
  },
  {
    icon: <FaTint />,
    title: "Save a Life",
    desc: "Every drop matters. Become someone’s hero by saving lives.",
    color: "bg-red-100 text-red-600",
  },
];

const HowItWorks = () => {
  return (
    <section id="how" className="bg-[#FEF2F2] py-20 px-6 md:px-20">
      {/* Subtitle */}
      <div className="text-center mb-12">
        <p className="text-sm uppercase tracking-widest text-red-600 font-semibold mb-2">
          Step by Step
        </p>
        <h2 className="text-4xl font-bold text-gray-900">
          How <span className="text-red-600">It Works</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mt-4">
          Follow these simple steps to become a lifesaver and join our community of heroes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white border border-red-100 rounded-2xl p-8 text-center shadow-sm hover:shadow-xl hover:bg-[#FEE2E2] hover:scale-105 transition-transform duration-300"
          >
            <div className="flex justify-center items-center mb-4">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center ${step.color} text-3xl`}
              >
                {step.icon}
              </div>
            </div>
            <div className="text-red-600 font-bold mb-2">Step {index + 1}</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;