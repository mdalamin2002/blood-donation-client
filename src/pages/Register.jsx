import axios from "axios";
import Lottie from "lottie-react";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { BiEnvelope, BiImageAdd, BiKey, BiUser } from "react-icons/bi";
import { Link, useNavigate } from "react-router"; // FIXED
import Swal from "sweetalert2";
import happy from "../assets/blood donner.json";
import districtsData from "../assets/districts.json";
import upazilasData from "../assets/upazilas.json";

import Title from "../components/Title";
// import { api } from "../lib/api";
// import useAxiosPublic from "../Hook/axiosPublic";
// import { api } from "../lib/api";
import { AuthContext } from "../providers/AuthProvider";

const imageBB_API_KEY = import.meta.env.VITE_IMAGEBB_API_KEY;
const imageBB_URL = `https://api.imgbb.com/1/upload?key=${imageBB_API_KEY}`;


const Register = () => {
  const navigate = useNavigate();
  const { createUser, setUser, updateUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  //  const axiosPublic = useAxiosPublic();
  // Load Districts
  useEffect(() => {
    setDistricts(districtsData);
  }, []);
 

  // Filter Upazilas
  useEffect(() => {
    if (selectedDistrict) {
      const filteredUpazilas = upazilasData.filter(
        (item) => String(item.district_id) === String(selectedDistrict)
      );
      setUpazilas(filteredUpazilas);
    } else {
      setUpazilas([]);
    }
  }, [selectedDistrict]);

  // Password Validation
  const validatePassword = (password) => {
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter");
      return false;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  // Submit Form
  const onSubmit = async (data) => {
    setLoading(true);

    if (!validatePassword(data.password)) {
      setLoading(false);
      return;
    }

    try {
      // Upload Avatar to imageBB
      const formData = new FormData();
      formData.append("image", data.avatar[0]);
      const imgRes = await axios.post(imageBB_URL, formData);
      const avatarUrl = imgRes.data.data.display_url;

      // Create Firebase User
      const res = await createUser(data.email, data.password);
      await updateUser({ displayName: data.name, photoURL: avatarUrl });
      setUser({ ...res.user, displayName: data.name, photoURL: avatarUrl });
       const  districtName  = districts.find( element => element.id === data.district);
         
       
      // Save User in MongoDB
      const user = {
        name: data.name,
        email: data.email,
        avatar: avatarUrl,
        bloodGroup: data.bloodGroup,
        district: districtName.name,
        upazila: data.upazila,
        password: data.password,
        role: "donor",
        status: "active",
      };

      await axios.post("https://mission-scic11-server-template.vercel.app/api/users", user);

      Swal.fire({
        title: "Registration Successful!",
        text: "Welcome to Blood Donation Platform",
        icon: "success",
      });

      toast.success("Registration successful!");
      reset();
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[url(/bg.png)] bg-contain">
      <Toaster />
      <div className="bg-white bg-opacity-90 min-h-screen">
        <div className="w-11/12 mx-auto py-10">
          <Title>Registration</Title>

          <div className="flex flex-col lg:flex-row justify-between items-center gap-5 pt-8">
            <div className="flex-1">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-5 flex flex-col gap-4 backdrop-blur-sm bg-opacity-10 shadow-lg rounded-lg"
              >
                {/* Name */}
                <div className="flex items-center">
                  <BiUser className="text-2xl text-slate-500 mr-2" />
                  <input
                    type="text"
                    placeholder="Enter Full Name"
                    {...register("name", { required: "Name is required" })}
                    className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}

                {/* Email */}
                <div className="flex items-center">
                  <BiEnvelope className="text-2xl text-slate-500 mr-2" />
                  <input
                    type="email"
                    placeholder="Enter Email"
                    {...register("email", { required: "Email is required" })}
                    className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}

                {/* Avatar */}
                <div className="flex items-center">
                  <BiImageAdd className="text-2xl text-slate-500 mr-2" />
                  <input
                    type="file"
                    {...register("avatar", { required: "Avatar is required" })}
                    className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400"
                  />
                </div>
                {errors.avatar && (
                  <p className="text-red-500 text-sm">
                    {errors.avatar.message}
                  </p>
                )}

                {/* Blood Group */}
                <select
                  {...register("bloodGroup", { required: true })}
                  className="p-2 border rounded"
                >
                  <option value="">Select Blood Group</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    )
                  )}
                </select>

                {/* District */}
                <select
                  {...register("district", { required: true })}
                  className="p-2 border rounded"
                  onChange={(e) => setSelectedDistrict(e.target.value)}
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
                  {...register("upazila", { required: true })}
                  className="p-2 border rounded"
                >
                  <option value="">Select Upazila</option>
                  {upazilas.map((u) => (
                    <option key={u.id} value={u.name}>
                      {u.name}
                    </option>
                  ))}
                </select>

                {/* Password */}
                <div className="flex items-center">
                  <BiKey className="text-2xl text-slate-500 mr-2" />
                  <input
                    type="password"
                    placeholder="Enter Password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400"
                  />
                </div>

                {/* Confirm Password */}
                <input
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirm_password", {
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                  className="p-2 border rounded"
                />
                {errors.confirm_password && (
                  <p className="text-red-500 text-sm">
                    {errors.confirm_password.message}
                  </p>
                )}

                {/* Link */}
                <p className="text-sm text-center">
                  Already have an account?{" "}
                  <Link to="/login" className="text-orange-500">
                    Login here
                  </Link>
                </p>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn bg-orange-500 text-white hover:bg-orange-600"
                >
                  {loading ? "Registering..." : "Register Now"}
                </button>
              </form>
            </div>

          

            <div className="flex-1 mx-20">
              <Lottie animationData={happy} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
