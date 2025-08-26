import {
    CardElement,
    Elements,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../Hook/useAxiosSecure";
import { AuthContext } from "../providers/AuthProvider";

const stripePromise = loadStripe(
  "pk_test_51RobSGRxFfvWaT9jvK4AwJbknBViRxYroTRmWA0kpzLU15YK2oeh9CPzkE742OnnZ9bhUg79wXKnBQAE44QW9ykr00m8JfPz8m"
);

const CheckoutForm = ({ amount, handleRequest }) => {
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const axios = useAxiosPublic();

  useEffect(() => {
    if (amount > 0)
      // Call backend to get client secret
      axios
        .post(
          "https://mission-scic11-server-template.vercel.app/create-payment-intent",
          {
            amount,
            user: { name: user.displayName, email: user.email },
          }
        )
        .then(({ data }) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    console.log("prement result", result);

    if (result.error) {
      console.error(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      handleRequest();
      console.log(result);
      Swal.fire("Payment successful!");
      
      // ✅ Only now send to database
      await axios.post(
        "https://mission-scic11-server-template.vercel.app/api/funding",
        {
          name: user.displayName,
          email: user.email,
          amount: parseFloat(amount),
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button
        className="p-2 bg-green-600 mt-2 rounded-xl"
        type="submit"
        disabled={!stripe}
      >
        Give Fund
      </button>
    </form>
  );
};

const StripeWrapper = ({ amount, handleRequest }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm handleRequest={handleRequest} amount={amount} />
  </Elements>
);

export default StripeWrapper;
