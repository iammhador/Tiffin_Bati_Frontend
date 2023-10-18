"use client";

import { Button, Card, Col, Row, message } from "antd";

import { CheckOutlined } from "@ant-design/icons";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";
import Loading from "@/app/loading";
import Link from "next/link";

const PricingPage = () => {
  //@ Fetch All Price And Plan =>
  const {
    isLoading,
    error,
    data: priceData,
  } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_TIFFIN_BATI}/price-and-plan`)
        .then((res) => res.data),
  });

  if (isLoading) return <Loading />;
  if (error) {
    return message.error("An error has occurred: " + error);
  }
  return (
    <div style={{ margin: "3% 4%" }}>
      <div
        style={{
          margin: "3rem 0",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            margin: "1rem 0",
            fontSize: "2rem",
            fontWeight: "600",
            color: "#545EE1",
            textTransform: "uppercase",
          }}
        >
          PRICE AND PLAN
        </h2>
      </div>

      {priceData?.data?.map((price: any) => {
        return (
          <Card
            key={price?.id}
            style={{
              maxWidth: "2xl",
              margin: "2% 0",
              borderRadius: "10px",
              backgroundColor: "#F5F4F9",
              padding: "20px",
            }}
          >
            <Row
              gutter={[16, 16]}
              justify="space-between"
              style={{ alignItems: "center" }}
            >
              <Col xs={24} sm={8}>
                <div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <CheckOutlined
                      style={{ fontSize: "1rem", color: "#545EE1" }}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginLeft: "3px",
                      }}
                    >
                      <p
                        style={{
                          fontWeight: "500",
                          textTransform: "capitalize",
                          fontSize: "1rem",
                          color: "#F76F01",
                        }}
                      >
                        {price?.subscription}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p
                      style={{
                        fontWeight: "500",
                        textTransform: "capitalize",
                        padding: "10px 0",
                        fontSize: "1rem",
                        color: " #313416",
                      }}
                    >
                      {price?.content}
                    </p>
                  </div>
                </div>
              </Col>

              <Col xs={24} sm={8} style={{ textAlign: "center" }}>
                <Link href={`/user/subscription/${price?.id}`}>
                  <Button type="primary" style={{ margin: "10px 0" }}>
                    Subscribe
                  </Button>
                </Link>
              </Col>

              <Col xs={24} sm={8} style={{ textAlign: "right" }}>
                <div>
                  <p
                    style={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: "#F76F01",
                    }}
                  >
                    ৳{price?.price}
                  </p>
                </div>
              </Col>
            </Row>
          </Card>
        );
      })}
    </div>
  );
};

const queryClient = new QueryClient();

const SeeAllFAQWithQueryClient = () => (
  <QueryClientProvider client={queryClient}>
    <PricingPage />
  </QueryClientProvider>
);

export default SeeAllFAQWithQueryClient;
