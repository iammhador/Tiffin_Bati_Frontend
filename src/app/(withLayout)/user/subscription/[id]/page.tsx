"use client";

import { Button, Col, Form, Row, message } from "antd";
import Image from "next/image";
import subscribeImage from "../../../../assets/input/subscription.png";
import { getFromLocalStorage } from "@/app/utils/local-storage";
import { decodedToken } from "@/app/utils/jwt";
import { useEffect, useState } from "react";
import InputDropdown from "@/components/inputField/inputDropdown";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";
import Loading from "@/app/loading";

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

const MakeSubscriptionPage = ({ params }: IDProps) => {
  const { id } = params;
  const [userId, setUserId] = useState<string>("");
  const [form] = Form.useForm();
  const authToken = getFromLocalStorage("accessToken");

  useEffect(() => {
    if (authToken) {
      const tokenInfo = decodedToken(authToken as string) as TokenInfo;
      const { userId } = tokenInfo;
      setUserId(userId);
    }
  }, [authToken]);

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
      console.log("An error has occurred: " + priceAndPlanError);
      // return message.error("An error has occurred: " + priceAndPlanError);
    }
  };

  // const {
  //   isLoading: subDataLoading,
  //   error: subDataError,
  //   data: subData,
  // } = useQuery({
  //   queryKey: ["subData", userId],
  //   queryFn: () =>
  //     axios
  //       .get(
  //         `${process.env.NEXT_PUBLIC_TIFFIN_BATI}/subscription/user/${userId}`
  //       )
  //       .then((res) => res.data),
  // });

  // if (priceAndPlanLoading || subDataLoading) return <Loading />;
  // if (priceAndPlanError || subDataError) {
  //   return message.error(
  //     "An error has occurred: " + (priceAndPlanError || subDataError)
  //   );
  // }

  // const onFinish = async (values: any) => {
  //   try {
  //     if (
  //       subData?.data?.status === "CANCEL" &&
  //       subData?.data?.status === !"ACTIVATE" &&
  //       subData?.data?.status === !"REQUESTED"
  //     ) {
  //       const response = await axios.patch(
  //         `${process.env.NEXT_PUBLIC_TIFFIN_BATI}/subscription/${subData?.data?.id}`,
  //         { status: "REQUESTED" }
  //       );
  //       console.log(response);
  //       if (response) {
  //         message.success("Subscription Complete!!");
  //         form.resetFields();
  //       }
  //     } else {
  //       const subscriptionPrice = JSON.parse(values.subscription);
  //       values.subscription = subscriptionPrice.subscription;
  //       values.price = subscriptionPrice.price;
  //       values.status = "REQUESTED";
  //       values.userId = userId;

  //       const response = await axios.post(
  //         `${process.env.NEXT_PUBLIC_TIFFIN_BATI}/subscription`,
  //         values
  //       );

  //       if (response) {
  //         message.success("Subscription Complete!!");
  //         form.resetFields();
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
                CHOOSE YOUR PACKAGE
              </h2>
            </div>
            <Form layout="vertical" onFinish={onFinish} form={form}>
              <Row>
                <Col
                  xs={{ span: 24, order: 1 }}
                  sm={{ span: 24, order: 1 }}
                  md={{ span: 24, order: 1 }}
                  lg={{ span: 24, order: 1 }}
                >
                  <InputDropdown
                    label="Subscription"
                    name="subscription"
                    required={true}
                    placeholder={`${priceAndPlanData?.data?.subscription} - ${priceAndPlanData?.data?.price}`}
                    defaultValue={`${priceAndPlanData?.data?.subscription} - ${priceAndPlanData?.data?.price}`}
                    inputOptions={[
                      {
                        label: `${priceAndPlanData?.data?.subscription} - ${priceAndPlanData?.data?.price}`,
                        value: JSON.stringify({
                          subscription: priceAndPlanData?.data?.subscription,
                          price: priceAndPlanData?.data?.price,
                        }),
                      },
                    ]}
                    message="Please choose a subscription"
                  />
                </Col>
              </Row>

              <Button
                style={{
                  background: "#F76F01",
                  color: "#F5F4F9",
                }}
                htmlType="submit"
              >
                Subscribe
              </Button>
            </Form>
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
