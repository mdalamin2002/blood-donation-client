import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function EditDonationRequest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientDistrict: "",
    recipientUpazila: "",
    hospitalName: "",
    fullAddress: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
  });

  useEffect(() => {
    axios
      .get(`https://mission-scic11-server-template.vercel.app/api/donation-requests/${id}`)
      .then((res) => {
        const data = res.data;
        setFormData({
          recipientName: data.recipientName || "",
          recipientDistrict: data.recipientDistrict || "",
          recipientUpazila: data.recipientUpazila || "",
          hospitalName: data.hospitalName || "",
          fullAddress: data.fullAddress || "",
          bloodGroup: data.bloodGroup || "",
          donationDate: data.donationDate || "",
          donationTime: data.donationTime || "",
          requestMessage: data.requestMessage || "",
        });
      })
      .catch((err) => console.error("Failed to fetch request data:", err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  console.log(formData);
    try {
      await axios.patch(`https://mission-scic11-server-template.vercel.app/api/donation-requests/${id}`, formData);
    
      alert("Donation request updated successfully!");
      // navigate("/dashboard/MyDonationRequests");
    } catch (error) {
      console.error("Failed to update:", error);
      alert("Failed to update donation request.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Edit Donation Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="recipientName" value={formData.recipientName} onChange={handleChange} placeholder="Recipient Name" className="input input-bordered w-full" />

        <input type="text" name="recipientDistrict" value={formData.recipientDistrict} onChange={handleChange} placeholder="District" className="input input-bordered w-full" />
        
        <input type="text" name="recipientUpazila" value={formData.recipientUpazila} onChange={handleChange} placeholder="Upazila" className="input input-bordered w-full" />
        <input type="text" name="hospitalName" value={formData.hospitalName} onChange={handleChange} placeholder="Hospital Name" className="input input-bordered w-full" />
        <input type="text" name="fullAddress" value={formData.fullAddress} onChange={handleChange} placeholder="Full Address" className="input input-bordered w-full" />
        <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} placeholder="Blood Group" className="input input-bordered w-full" />
        <input type="date" name="donationDate" value={formData.donationDate} onChange={handleChange} className="input input-bordered w-full" />
        <input type="time" name="donationTime" value={formData.donationTime} onChange={handleChange} className="input input-bordered w-full" />
        <textarea name="requestMessage" value={formData.requestMessage} onChange={handleChange} placeholder="Request Message" className="textarea textarea-bordered w-full"></textarea>
        <button type="submit" className="btn btn-primary w-full">Update</button>
      </form>
    </div>
  );
}
