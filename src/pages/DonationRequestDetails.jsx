import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../providers/AuthProvider";

export default function DonationRequestDetails() {
  const { user, loading } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://mission-scic11-server-template.vercel.app/api/donation-requests/${id}`);
        setRequest(res.data);
      } catch (err) {
        console.error("Failed to load donation request", err);
      }
    };
    fetchData();
  }, [id]);

  const handleDonate = async () => {
    try {
      const res = await axios.patch(`https://mission-scic11-server-template.vercel.app/api/donation-requests/${id}`, {
        donationStatus: "inprogress",
        donorName: user.displayName,
        donorEmail: user.email,
      });
      toast.success("Donation confirmed!");
      setShowModal(false);
      setRequest({ ...request, donationStatus: "inprogress" });
    } catch (err) {
      toast.error("Failed to confirm donation");
    }
  };

  if (!request) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Donation Request Details</h1>
      <div className="border rounded p-4 bg-white shadow">
        <p><strong>Recipient:</strong> {request.recipientName}</p>
        <p><strong>Location:</strong> {request.recipientDistrict}, {request.recipientUpazila}</p>
        <p><strong>Hospital:</strong> {request.hospitalName}</p>
        <p><strong>Date:</strong> {request.donationDate}</p>
        <p><strong>Time:</strong> {request.donationTime}</p>
        <p><strong>Blood Group:</strong> {request.bloodGroup}</p>
        <p><strong>Status:</strong> {request.donationStatus}</p>

        {request.donationStatus === "pending" && (
          <button
            onClick={() => setShowModal(true)}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Donate
          </button>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Confirm Donation</h2>
            <p><strong>Donor Name:</strong> {user?.displayName}</p>
            <p><strong>Donor Email:</strong> {user?.email}</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDonate}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
