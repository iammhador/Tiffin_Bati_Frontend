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
    isLoading,
    error,
    data: priceAndPlanData,
  } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get(`http://localhost:5000/api/v1/price-and-plan/${id}`)
        .then((res) => res.data),
  });

  if (isLoading) return <Loading />;
  if (error) {
    return message.error("An error has occurred: " + error);
  }

  const onFinish = async (values: any) => {
    const subscriptionPrice = JSON.parse(values.subscription);
    values.subscription = subscriptionPrice.subscription;
    values.price = subscriptionPrice.price;
    values.status = "REQUESTED";
    values.userId = userId;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/subscription",
        values
      );

      if (response) {
        message.success("Subscription Complete!!");
        form.resetFields();
      }
    } catch (error) {
      return message.error("An error has occurred: " + error);
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

const SeeAllBlogWithQueryClient = ({ params }: any) => (
  <QueryClientProvider client={queryClient}>
    <MakeSubscriptionPage params={params} />
  </QueryClientProvider>
);

export default SeeAllBlogWithQueryClient;
