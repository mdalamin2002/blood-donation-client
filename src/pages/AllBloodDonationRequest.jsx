import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import userRole from "../Hook/useRole";
import { AuthContext } from "../providers/AuthProvider";

export default function AllBloodDonationRequest() {
  const [requests, setRequests] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 6;

  const { user } = useContext(AuthContext); // Assuming user contains role info (admin/volunteer)
  const { role } = userRole();
  console.log(role);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get("https://mission-scic11-server-template.vercel.app/api/donation-requests");
        setRequests(res.data);
      } catch (error) {
        console.error("❌ Failed to load donation requests", error);
      }
    };
    fetchRequests();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`https://mission-scic11-server-template.vercel.app/api/donation-requests/${id}`, {
        donationStatus: newStatus,
      });
      toast.success("✅ Status updated!");
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, donationStatus: newStatus } : req))
      );
    } catch (err) {
      toast.error("❌ Failed to update status.");
    }
  };

  const deleteRequest = async (id) => {
    try {
      await axios.delete(`https://mission-scic11-server-template.vercel.app/api/donation-requests/${id}`);
      toast.success("🗑️ Deleted successfully!");
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      toast.error("❌ Delete failed.");
    }
  };

  // Filtering
  const filteredRequests =
    filteredStatus === "all"
      ? requests
      : requests.filter((r) => r.donationStatus === filteredStatus);

  // Pagination
  const indexOfLast = currentPage * requestsPerPage;
  const indexOfFirst = indexOfLast - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-6">
        🩸 All Blood Donation Requests
      </h2>

      {/* Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {["all", "pending", "inprogress", "done", "canceled"].map((status) => (
          <button
            key={status}
            onClick={() => {
              setFilteredStatus(status);
              setCurrentPage(1);
            }}
            className={`px-4 py-1 rounded-full text-sm ${
              filteredStatus === status
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {status.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {currentRequests.map((req) => (
          <div
            key={req._id}
            className="p-5 bg-white rounded-xl shadow border border-red-200"
          >
            <h3 className="text-xl font-semibold mb-2">{req.recipientName}</h3>
            <p><strong>Location:</strong> {req.recipientDistrict}, {req.recipientUpazila}</p>
            <p><strong>Blood Group:</strong> {req.bloodGroup}</p>
            <p><strong>Date:</strong> {req.donationDate}</p>
            <p><strong>Time:</strong> {req.donationTime}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="capitalize text-red-600 font-medium">
                {req.donationStatus}
              </span>
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              <Link
                to={`/donation-request/${req._id}`}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                View
              </Link>

              {/* Volunteer/Admin can update status */}
              {["volunteer", "admin"].includes(role) && (
                <>
                  {req.donationStatus !== "inprogress" && (
                    <button
                      onClick={() => updateStatus(req._id, "inprogress")}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Mark In Progress
                    </button>
                  )}
                  {req.donationStatus !== "done" && (
                    <button
                      onClick={() => updateStatus(req._id, "done")}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Mark Done
                    </button>
                  )}
                  {req.donationStatus !== "canceled" && (
                    <button
                      onClick={() => updateStatus(req._id, "canceled")}
                      className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  )}
                </>
              )}

              {/* Admin-only actions */}
              {role === "admin" && (
                <>
                  <Link
                    to={`/editDonationRequest/:id${req._id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteRequest(req._id)}
                    className="bg-red-800 text-white px-3 py-1 rounded hover:bg-red-900"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-8 h-8 rounded-full ${
              currentPage === i + 1
                ? "bg-red-600 text-white"
                : "bg-gray-300 text-gray-800"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
