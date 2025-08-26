import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import districtsData from "../assets/districts.json";
import upazilasData from "../assets/upazilas.json";

const DonorSearch = () => {
  const [filters, setFilters] = useState({
    bloodGroup: "",
    district: "",
    upazila: "",
  });
  const [donors, setDonors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  // Load district list
  useEffect(() => {
    setDistricts(districtsData);
  }, []);

  // Update Upazilas on district change
  useEffect(() => {
    if (filters.district) {
      const filtered = upazilasData.filter(
        (u) => String(u.district_id) === String(filters.district)
      );
      setUpazilas(filtered);
    } else {
      setUpazilas([]);
    }
  }, [filters.district]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("https://mission-scic11-server-template.vercel.app/donors");
      console.log(res.data)
      console.log(filters)
      const district = districts.find(d => d.id === filters.district);
      console.log()
      const matched = res.data.filter(
        (donor) =>
          donor.bloodGroup === filters.bloodGroup &&
          donor.district === district.name &&
          donor.upazila === filters.upazila
      );
      console.log(matched)
      setDonors(matched);
      setIsSearched(true);

      if (matched.length === 0) {
        toast.error("No donor found for this search.");
      }
    } catch (err) {
      toast.error("Failed to fetch donors.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-red-600">🔍 Search Donors</h2>

      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Blood Group */}
        <select
          name="bloodGroup"
          value={filters.bloodGroup}
          onChange={handleChange}
          required
          className="border p-3 rounded"
        >
          <option value="">Select Blood Group</option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>

        {/* District */}
        <select
          name="district"
          value={filters.district}
          onChange={handleChange}
          required
          className="border p-3 rounded"
        >
          <option value="">Select District</option>
          {districts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        {/* Upazila */}
        <select
          name="upazila"
          value={filters.upazila}
          onChange={handleChange}
          required
          className="border p-3 rounded"
        >
          <option value="">Select Upazila</option>
          {upazilas.map((u) => (
            <option key={u.id} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="md:col-span-3 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        >
          Search
        </button>
      </form>

      {/* Search Results */}
        {isSearched && (
        <>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Search Results:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donors.map((donor) => (
              <div
                key={donor._id}
                className="bg-white rounded-xl shadow-md border hover:shadow-lg transition-all p-5 text-center"
              >
                <img
                  src={donor.avatar}
                  alt={donor.name}
                  className="w-24 h-24 rounded-full mx-auto border-4 border-red-300 object-cover"
                />
                <h4 className="text-xl font-bold mt-3">{donor.name}</h4>
                <p className="text-gray-600 text-sm mb-1">📧 {donor.email}</p>
                <p className="text-sm text-red-600 font-medium">
                  🩸 Blood Group: {donor.bloodGroup}
                </p>
                <p className="text-sm text-gray-700">
                  📍 {donor.upazila}, {donor.district}
                </p>
              </div>
            ))}
          </div>
        </>
      )} 

    </div>
  );
};

export default DonorSearch;
