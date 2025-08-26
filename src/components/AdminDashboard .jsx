// src/pages/Dashboard/AdminDashboard.jsx

import axios from "axios";
import { useEffect, useState } from "react";
import { FaHandHoldingUsd, FaTint, FaUser } from "react-icons/fa";

export default function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalFunds, setTotalFunds] = useState(0);
  const [totalBloodRequests, setTotalBloodRequests] = useState(0);

  useEffect(() => {
    // Fetch total donors
    axios.get("https://mission-scic11-server-template.vercel.app/api/users")
      .then((res) => {
        const donors = res.data.filter((user) => user.role === "donor");
        setTotalUsers(donors.length);
      });

    // Fetch total funds
    axios.get("https://mission-scic11-server-template.vercel.app/api/funds")
      .then((res) => {
        const total = res.data.reduce((sum, fund) => sum + Number(fund.amount), 0);
        setTotalFunds(total);
      });

    // Fetch total blood donation requests
    axios.get("https://mission-scic11-server-template.vercel.app/api/donation-requests")
      .then((res) => {
        setTotalBloodRequests(res.data.length);
      });
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-500 to-red-700 text-white p-6 rounded-xl shadow">
        <h2 className="text-3xl font-bold">Welcome to Admin Dashboard</h2>
        <p className="mt-2 text-lg">Manage everything from one place!</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          icon={<FaUser size={30} className="text-white" />}
          count={totalUsers}
          label="Total Donors"
          bgColor="bg-blue-600"
        />
        
        <StatCard
          icon={<FaHandHoldingUsd size={30} className="text-white" />}
          count={`৳ ${totalFunds}`}
          label="Total Funds"
          bgColor="bg-green-600"
        />


        <StatCard
          icon={<FaTint size={30} className="text-white" />}
          count={totalBloodRequests}
          label="Blood Requests"
          bgColor="bg-red-600"
        />
      </div>
    </div>
  );
}

function StatCard({ icon, count, label, bgColor }) {
  return (
    <div className={`p-6 rounded-xl shadow flex items-center gap-4 ${bgColor} text-white`}>
      <div className="p-3 bg-white bg-opacity-20 rounded-full">
        {icon}
      </div>
      <div>
        <h3 className="text-2xl font-bold">{count}</h3>
        <p className="text-sm">{label}</p>
      </div>
    </div>
  );
}
