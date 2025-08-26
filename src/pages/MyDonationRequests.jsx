import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../providers/AuthProvider";

export default function MyDonationRequests() {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
console.log(user);
  const fetchRequests = () => {
    if (user?.email) {
      axios
        .get(`https://mission-scic11-server-template.vercel.app/api/donation-requests?email=${user.email}`)
        .then((res) => setRequests(res.data))
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [user]);
console.log(user)
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.patch(`https://mission-scic11-server-template.vercel.app/api/donation-requests/${id}`, {
        donationStatus: newStatus,
        donorName: user?.displayName,
        donorEmail: user?.email,


        

      });
      fetchRequests(); // Refresh data
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const filteredRequests =
    statusFilter === "all"
      ? requests
      : requests?.filter((item) => item?.donationStatus === statusFilter);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">My Donation Requests</h2>

      {/* Filter Options */}
      <div className="mb-4">
        <label>Status Filter: </label>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border p-1"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Recipient</th>
            <th className="border px-2 py-1">Location</th>
            <th className="border px-2 py-1">Blood Group</th>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Time</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Donors</th>
            <th className="border px-2 py-1">Actions</th>
            <th className="border px-2 py-1">Details</th>
          </tr>
        </thead>
        <tbody>
          {currentItems?.map((req) => (
            <tr key={req._id}>
              <td className="border px-2 py-1">{req?.recipientName}</td>
              <td className="border px-2 py-1">
                {req?.recipientDistrict}, {req?.recipientUpazila}
              </td>
              <td className="border px-2 py-1">{req?.bloodGroup}</td>
              <td className="border px-2 py-1">{req?.donationDate}</td>
              <td className="border px-2 py-1">{req?.donationTime}</td>
              <td className="border px-2 py-1 capitalize">{req?.donationStatus}</td>
              <td className="border px-2 py-1">
                {req.donors?.length > 0 ? (
                  <ul className="list-disc pl-4">
                    {req?.donors?.map((donor, i) => (
                      <li key={i}>
                        {donor.name} ({donor.email})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span>No donors</span>
                )}
              </td>

              {/* Action Buttons */}
              <td className="border px-2 py-1 text-center space-x-1">
                {req.donationStatus === "inprogress" && (
                  <>
                    <button
                      onClick={() => handleStatusUpdate(req._id, "done")}
                      className="px-2 py-1 bg-green-500 text-white text-sm rounded"
                    >
                      Done
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(req._id, "canceled")}
                      className="px-2 py-1 bg-red-500 text-white text-sm rounded"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </td>

              <td className="border px-2 py-1 text-blue-500 underline">
                <Link to={`/editDonationRequest/${req._id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1)?.map((pageNum) => (
          <button
            key={pageNum}
            className={`px-2 py-1 border rounded ${
              currentPage === pageNum ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setCurrentPage(pageNum)}
          >
            {pageNum}
          </button>
        ))}
      </div>
    </div>
  );
}
