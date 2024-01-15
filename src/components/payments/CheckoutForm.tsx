import { TokenInfo } from "@/app/constants/global";
import { decodedToken } from "@/app/utils/jwt";
import { getFromLocalStorage } from "@/app/utils/local-storage";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const CheckoutForm = async (price: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const [userName, setUserName] = useState<string>("");
  const [clientSecret, setClientSecret] = useState("");
  const authToken = getFromLocalStorage("accessToken");

  useEffect(() => {
    if (authToken) {
      const tokenInfo = decodedToken(authToken as string) as TokenInfo;
      const { name } = tokenInfo;
      setUserName(name);
    }
  }, [authToken]);
  useEffect(() => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_TIFFIN_BATI}/payment/create-payment-intent`,
        { price }
      )
      .then((res) => {
        console.log(res?.data);
        setClientSecret(res?.data?.clientSecret);
      });
  }, [price]);

  const appearance = {
    theme: "stripe",
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      message.error(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: userName ? userName : "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
      message.error(confirmError.message);
    }

    console.log(paymentIntent);
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
      <Button
        htmlType="submit"
        disabled={!stripe || !clientSecret}
        style={{
          background: "#F76F01",
          color: "#F5F4F9",
        }}
      >
        Subscribe
      </Button>
    </form>
  );
};

export default CheckoutForm;
