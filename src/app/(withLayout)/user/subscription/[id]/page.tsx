"use client";

import { Col, Form, Row, message } from "antd";
import Image from "next/image";
import subscribeImage from "../../../../assets/input/subscription.png";
import { getFromLocalStorage } from "@/app/utils/local-storage";
import { decodedToken } from "@/app/utils/jwt";
import { useEffect, useState } from "react";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import CheckoutForm from "@/components/payments/checkoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "../../../../../components/payments/payment.modules.css";

type TokenInfo = {
  userId: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
};

type IDProps = {
  params: {
    id: string;
  };
};

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEY}`);

const MakeSubscriptionPage = ({ params }: IDProps) => {
  const router = useRouter();
  const { id } = params;
  const [userId, setUserId] = useState<string>("");
  const [form] = Form.useForm();
  const authToken = getFromLocalStorage("accessToken");

  useEffect(() => {
    if (authToken) {
      const tokenInfo = decodedToken(authToken as string) as TokenInfo;
      const { userId, role } = tokenInfo;
      setUserId(userId);

      if (role === "admin" || role === "super-admin") {
        router.push("/");
      }
    }
  }, [authToken, router]);

  //@ Fetch All Price And Plan =>
  const {
    isLoading: priceAndPlanLoading,
    error: priceAndPlanError,
    data: priceAndPlanData,
  } = useQuery({
    queryKey: ["priceAndPlan", id],
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_TIFFIN_BATI}/price-and-plan/${id}`)
        .then((res) => res.data),
  });

  if (priceAndPlanLoading) return <Loading />;
  if (priceAndPlanError) {
    return message.error("An error has occurred: " + priceAndPlanError);
  }

  const onFinish = async (values: any) => {
    const subscriptionPrice = JSON.parse(values.subscription);
    console.log(subscriptionPrice);
    values.subscription = subscriptionPrice.subscription;
    values.price = subscriptionPrice.price;
    values.status = "REQUESTED";
    values.userId = userId;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_TIFFIN_BATI}/subscription`,
        values
      );

      if (response) {
        message.success("Subscription Complete!!");
        form.resetFields();
      }
    } catch (error) {
      message.error("An error has occurred: " + priceAndPlanError);
    }
  };

  return (
    <div>
      <div style={{ margin: "0% 4%" }}>
        <Row justify="center" align="middle">
          <Col
            style={{
              justifySelf: "center",
              alignSelf: "center",
            }}
            xs={{ span: 24, order: 1 }}
            sm={{ span: 12, order: 1 }}
            md={{ span: 12, order: 1 }}
            lg={{ span: 12, order: 1 }}
          >
            <div
              style={{
                textAlign: "left",
                marginBottom: "20px",
              }}
            >
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: "600",
                  color: "#545EE1",
                }}
              >
                Subscription
              </h2>
            </div>

            <p
              style={{
                maxWidth: "100%",
                width: "500px",
                fontSize: "14px",
                background: "#FFFFFF",
                color: "#313416",
                textAlign: "center",
                padding: "10px 14px",
                borderRadius: "4px",
                letterSpacing: "0.025em",
                boxShadow:
                  "rgba(50, 50, 93, 0.14902) 0px 1px 3px, rgba(0, 0, 0, 0.0196078) 0px 1px 0px",
              }}
            >
              {`${priceAndPlanData?.data?.subscription} - ${priceAndPlanData?.data?.price}`}
            </p>

            <Elements stripe={stripePromise}>
              <CheckoutForm price={priceAndPlanData?.data?.price} />
            </Elements>
          </Col>
          <Col
            xs={{ span: 24, order: 2 }}
            sm={{ span: 12, order: 1 }}
            md={{ span: 12, order: 1 }}
            lg={{ span: 12, order: 1 }}
            style={{
              justifySelf: "center",
              alignSelf: "center",
            }}
          >
            <div>
              <Image
                src={subscribeImage}
                alt="Register Image"
                layout="responsive"
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const queryClient = new QueryClient();

const SeeSubscriptionWithQueryClient = ({ params }: any) => (
  <QueryClientProvider client={queryClient}>
    <MakeSubscriptionPage params={params} />
  </QueryClientProvider>
);

export default SeeSubscriptionWithQueryClient;
