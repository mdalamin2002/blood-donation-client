import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import useRole from "../Hook/useRole";
import StripeWrapper from "../pages/StripeWrapper";
import { AuthContext } from "../providers/AuthProvider";

export default function FundingPage() {
  const { user } = useContext(AuthContext);
  const [amount, setAmount] = useState("");
  const [isOpen, setIsOpen] = useState(false);
   const {role} = useRole();
  console.log({role});

  // ⭐ Corrected: Expecting array directly from backend
  const { data = [], refetch } = useQuery({
    queryKey: ["fundings"],
    queryFn: async () => {
      const res = await axios.get(
        "https://mission-scic11-server-template.vercel.app/api/funding"
      );
      return res.data; // assume it's an array []
    },
  });

  // ⭐ Only called after successful Stripe payment
  const handleFund = async () => {
    const fund = {
      name: user?.displayName,
      email: user?.email,
      amount: parseFloat(amount),
    };
    try {
      await axios.post(
        "https://mission-scic11-server-template.vercel.app/api/funding",
        fund
      );
      setAmount("");
      setIsOpen(false);
      refetch();
    } catch (error) {
      console.error("Funding save failed:", error);
    }
  };

  const totalFund = data.reduce((total, f) => total + (f.amount || 0), 0); // ⭐ total funds calculation

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">🌟 Support Blood Donation</h2>

      <div className="flex justify-center mb-8">
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-primary px-6 py-2 text-white rounded-lg"
        >
          Donate Now
        </button>
      </div>

      {/* Modal */}
      <dialog
        className="h-screen w-screen bg-black/30 fixed inset-0 z-50"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="flex items-center justify-center h-full">
          <div className="w-[350px] p-5 rounded-2xl bg-white shadow-lg relative">
            <h3 className="text-lg font-semibold mb-4">Enter Donation Amount</h3>
            <input
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              className="border border-gray-300 p-2 w-full rounded-md"
              type="number"
              min={1}
              placeholder="৳ Amount"
              required
            />
            <div className="py-4">
              {amount && parseFloat(amount) > 0 && (
                // ⭐ Stripe payment success হলে handleFund() call হবে
                <StripeWrapper handleRequest={handleFund} amount={parseFloat(amount)} />
              )}
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </dialog>

      {
        role === "admin" && <div>
        <h3 className="text-xl font-semibold mb-3">All Donations</h3>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table table-zebra w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Donor Name</th>
              <th>Email</th>
              <th>Amount (৳)</th>
            
            </tr>
          </thead>
          <tbody>
            {data.map((fund, index) => (
              <tr key={fund._id}>
                <td>{index + 1}</td>
                <td>{fund.name}</td>
                <td>{fund.email}</td>
                <td className="font-semibold">৳{fund.amount}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-lg font-bold text-right text-green-600">
        Total Funds: ৳{totalFund.toFixed(2)}
      </div>
      </div>
      }
    </div>
  );
}
