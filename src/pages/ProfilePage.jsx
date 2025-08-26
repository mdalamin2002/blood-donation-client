import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../providers/AuthProvider";

const ProfilePage = () => {
  const { user } = useContext(AuthContext); // logged-in user info
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    avatar: "",
    bloodGroup: "",
    district: "",
    upazila: "",
  });
 
  // Load user data
  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);
    axios
      .get(`https://mission-scic11-server-template.vercel.app/api/users/${user.email}`)
      .then((res) => {
        setProfileData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load profile");
        setLoading(false);
      });
  }, [user.email]);

  // Form input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  // Save profile updates
  // const handleSave = async () => {
  //   try {
  //     await axios.patch(`https://mission-scic11-server-template.vercel.app/update-profile/${user.email}`, profileData);
  //     setIsEditing(false);
  //     toast.success("Profile updated");
  //     // Re-fetch updated data
  //     const res = await axios.get(`https://mission-scic11-server-template.vercel.app/api/users/${user.email}`);
  //     setProfileData(res.data);
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Failed to update profile");
  //   }
  // };

  // Save profile updates
  const handleSave = async () => {
    try {
      const { name, avatar, bloodGroup, district, upazila } = profileData;
      const updatedFields = { name, avatar, bloodGroup, district, upazila };

      await axios.patch(
        `https://mission-scic11-server-template.vercel.app/update-profile/${user.email}`,
        updatedFields
      );
      setIsEditing(false);
      toast.success("Profile updated");

      // Re-fetch updated data
      const res = await axios.get(
        `https://mission-scic11-server-template.vercel.app/api/users/${user.email}`
      );
      setProfileData(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">My Profile</h2>
        {isEditing ? (
          <button onClick={handleSave} className="btn btn-success">
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-primary"
          >
            Edit
          </button>
        )}
      </div>

      {/* Avatar Preview */}
      {profileData.avatar && (
        <div className="flex justify-center mb-4">
          <img
            src={profileData.avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full border shadow"
          />
        </div>
      )}

      <form className="grid gap-4">
        <input
          type="text"
          name="name"
          value={profileData.name}
          disabled={!isEditing}
          onChange={handleChange}
          placeholder="Name"
          className="input input-bordered w-full"
        />

        <input
          type="email"
          name="email"
          value={profileData.email}
          disabled
          className="input input-bordered bg-gray-100 cursor-not-allowed w-full"
        />

        <input
          type="text"
          name="avatar"
          value={profileData.avatar}
          disabled={!isEditing}
          onChange={handleChange}
          placeholder="Avatar URL"
          className="input input-bordered w-full"
        />

        <select
          name="bloodGroup"
          value={profileData.bloodGroup}
          disabled={!isEditing}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option disabled value="">
            Select Blood Group
          </option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="district"
          value={profileData.district}
          disabled={!isEditing}
          onChange={handleChange}
          placeholder="District"
          className="input input-bordered w-full"
        />

        <input
          type="text"
          name="upazila"
          value={profileData.upazila}
          disabled={!isEditing}
          onChange={handleChange}
          placeholder="Upazila"
          className="input input-bordered w-full"
        />
      </form>
    </div>
  );
};

export default ProfilePage;
