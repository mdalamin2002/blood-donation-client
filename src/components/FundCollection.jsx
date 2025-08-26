import React, { useState } from "react";
import Swal from "sweetalert2";

const FundCollection = () => {
  const [customAmount, setCustomAmount] = useState("");

  const presetAmounts = [50, 100, 200, 500]; // predefined donation amounts

  const handleDonate = (amount) => {
    const donationAmount = amount || customAmount;
    if (!donationAmount) {
      Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Please enter or select an amount to donate.",
      });
      return;
    }
    // SweetAlert success popup
    Swal.fire({
      icon: "success",
      title: "Thank You!",
      text: `You have donated $${donationAmount}!`,
      confirmButtonColor: "#dc2626", // red-600
    });
    setCustomAmount("");
  };

  return (
    <section className="py-20 bg-gray-50" id="fund-collection">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold  mb-6">
          Support us
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-12 text-lg sm:text-xl">
          Every contribution helps us save lives. Choose an amount or enter a custom donation and make a difference today.
        </p>

        {/* Preset Amount Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {presetAmounts.map((amount, index) => (
            <button
              key={index}
              onClick={() => handleDonate(amount)}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
              ${amount}
            </button>
          ))}
        </div>

        {/* Custom Amount Input */}
        <div className="flex justify-center gap-3 flex-wrap">
          <input
            type="number"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="Enter custom amount"
            className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 text-gray-800 w-60 sm:w-72"
          />
          <button
            onClick={() => handleDonate()}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            Donate Now ❤️
          </button>
        </div>
      </div>
    </section>
  );
};

export default FundCollection;
