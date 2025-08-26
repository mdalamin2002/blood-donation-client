import React from "react";
import { FaUsers, FaHeartbeat, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

const stats = [
  {
    icon: <FaUsers className="text-red-600 text-4xl" />,
    count: "12,450+",
    label: "Registered Donors",
  },
  {
    icon: <FaHeartbeat className="text-pink-500 text-4xl" />,
    count: "8,320+",
    label: "Lives Saved",
  },
  {
    icon: <FaMapMarkerAlt className="text-purple-600 text-4xl" />,
    count: "491+",
    label: "Upazilas Covered",
  },
  {
    icon: <FaClock className="text-blue-600 text-4xl" />,
    count: "<2 hrs",
    label: "Response Time",
  },
];

const HomeSection = () => {
  return (
    <section className="bg-gradient-to-tr from-red-50 via-white to-red-50 py-20 px-6 md:px-16">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-12">
        BloodConnect Impact
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <div className="flex justify-center mb-4">{stat.icon}</div>
            <h3 className="text-3xl font-extrabold text-gray-800 mb-2">{stat.count}</h3>
            <p className="text-gray-500 text-lg">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HomeSection;
