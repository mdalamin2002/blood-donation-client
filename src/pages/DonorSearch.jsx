import { Card } from "@/components/ui/card"; // Optional: You can use your own Card component
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

const DonorSearch = () => {
  const [filters, setFilters] = useState({
    bloodGroup: "",
    district: "",
    upazila: "",
  });
  const [donors, setDonors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(e)
    try {
      const res = await axios.get("https://mission-scic11-server-template.vercel.app/donors"); // Donor list from backend

      console.log(res.data)
      const matched = res.data.filter(
        (donor) =>
          donor.bloodGroup === filters.bloodGroup &&
          donor.district === filters.district &&
          donor.upazila === filters.upazila
      );
      setDonors(matched);
      setIsSearched(true);
      console.log("first")

      if (matched.length === 0) {
        toast.error("No donor found for this search.");
      }
    } catch (err) {
      toast.error("Failed to fetch donors.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">🔍 Search Donors</h2>
      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
      >
        <select
          name="bloodGroup"
          value={filters.bloodGroup}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        >
          <option value="">Select Blood Group</option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>

        <select
          name="district"
          value={filters.district}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        >
          <option value="">Select District</option>
          {["Dhaka", "Madaripur", "Barishal", "Rajshahi"].map((dist) => (
            <option key={dist} value={dist}>
              {dist}
            </option>
          ))}
        </select>

        <select
          name="upazila"
          value={filters.upazila}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        >
          <option value="">Select Upazila</option>
          {["Madaripur Sadar", "Shibchar", "Kalkini"].map((upz) => (
            <option key={upz} value={upz}>
              {upz}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="md:col-span-3 bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Search
        </button>
      </form>

      {isSearched && (
        <>
          <h3 className="text-xl font-semibold mb-3">Search Results:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {donors.map((donor) => (
              <Card key={donor._id} className="p-4 border rounded shadow">
                <img
                  src={donor.avatar}
                  alt={donor.name}
                  className="w-20 h-20 rounded-full object-cover mb-2"
                />
                <h4 className="font-bold text-lg">{donor.name}</h4>
                <p>📧 {donor.email}</p>
                <p>🩸 Blood Group: {donor.bloodGroup}</p>
                <p>📍 {donor.district}, {donor.upazila}</p>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DonorSearch;
