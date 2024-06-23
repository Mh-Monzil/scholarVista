// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://stripe.com/docs/payments/accept-a-payment#web

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import "./CheckoutForm.css";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import UseAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ scholarship, closeModal }) => {
  const { user } = UseAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState();
  const [processing, setProcessing] = useState(false);

  console.log(scholarship?.applicationFees);

  useEffect(() => {
    if (scholarship?.applicationFees > 1) {
      getClientSecret({ fees: scholarship?.applicationFees });
    }
  }, [scholarship?.applicationFees]);

  //   get clientsecet
  const getClientSecret = async (fees) => {
    console.log(fees);
    const { data } = await axiosSecure.post("/create-payment-intent", fees);
    // return data;
    console.log(data);
    setClientSecret(data.clientSecret);
  };

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      toast.error(error.message);
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    //confirm payment
    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
      toast.error(confirmError.message);
      setProcessing(false);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      toast.success("Payment successful")
      navigate(`/application-form/${scholarship?._id}`)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {/* <button >
        Pay
      </button> */}
      <div className="flex items-center justify-around mt-5 font-semibold">
        <button
          onClick={closeModal}
          className="bg-red-200 rounded-md py-2 px-3 text-rose-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || !clientSecret || processing}
          className="bg-green-200 rounded-md py-2 px-6 text-green-700"
        >
          Pay {scholarship?.applicationFees}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
