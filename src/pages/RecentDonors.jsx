import React, { useEffect, useState } from "react";
import axios from "axios";

const RecentDonors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://mission-scic11-server-template.vercel.app//api/users")
      .then((res) => {
        // ✅ Only take last 6 donation requests
        const recent = res.data
          .filter((req) => req.donationStatus === "done") // শুধু সম্পন্ন দানগুলো নিলাম
          .slice(-6) // শেষ 6 জন donor
          .reverse();

        setDonors(recent);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching donors:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading recent donors...
      </div>
    );
  }

  return (
    <section className="py-20 px-6 md:px-20 bg-gray-50">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-12">
        🙌 Recent Donors
      </h2>

      {donors.length === 0 ? (
        <p className="text-center text-gray-500">No donations completed yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {donors.map((donor) => (
            <div
              key={donor._id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Avatar Placeholder */}
              <div className="flex items-center justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-xl">
                  {donor.recipientName?.charAt(0) || "U"}
                </div>
              </div>

              {/* Info */}
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {donor.recipientName}
              </h3>
              <p className="text-gray-500 mb-1">
                Blood Group: <span className="font-semibold">{donor.bloodGroup}</span>
              </p>
              <p className="text-gray-500 mb-1">
                Location: {donor.recipientDistrict}, {donor.recipientUpazila}
              </p>
              <p className="text-gray-400 text-sm">
                Donated on: {new Date(donor.donationDate).toLocaleDateString()}{" "}
                at {donor.donationTime}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentDonors;
