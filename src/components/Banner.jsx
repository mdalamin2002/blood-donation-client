import Lottie from "lottie-react";
import { Link } from "react-router"; // ✅ Correct router import
import animation from "../assets/blood donner.json"; // ✅ Use a blood donation Lottie file

const Banner = () => {
  return (
    <section className="bg-gradient-to-r from-red-100 to-red-200 min-h-screen flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center justify-between w-11/12 mx-auto py-10">
        {/* Left Text Section */}
        <div className="space-y-6 text-center md:text-left max-w-xl">
         <h1 className="text-5xl font-extrabold leading-tight text-red-600">
  Donate <span className="text-red-600">Blood</span>,  
  Save <span className="text-red-600">Lives</span> ❤️
</h1>
          <p className="text-lg text-gray-700">
            Join our mission to save lives by donating blood. 
            Help those in need and make a real impact today!
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <Link to="/registration">
              <button className="btn bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full shadow-lg">
                Join as a Donor 🩸
              </button>
            </Link>

            <Link to="/DonorSearch">
              <button className="btn bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg">
                Search Donors 🔍
              </button>
            </Link>
          </div>
        </div>

        {/* Right Animation Section */}
        <div className="max-w-md mt-10 md:mt-0">
          <Lottie animationData={animation} loop={true} />
        </div>
      </div>
    </section>
  );
};

export default Banner;
