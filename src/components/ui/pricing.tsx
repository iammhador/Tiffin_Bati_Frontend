"use client";

import { Button, Card, Col, Row, message } from "antd";

import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";
import Loading from "@/app/loading";
import Link from "next/link";
import dynamic from "next/dynamic";

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
      <div style={{ margin: "3rem 0" }}>
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

      <Row justify="center" align="middle" gutter={[16, 16]}>
        {priceData?.data?.map((price: any) => {
          return (
            price?.price && (
              <Col
                key={price.id}
                xs={24}
                sm={24}
                md={8}
                style={{ marginBottom: "16px" }}
              >
                <Row
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    padding: "20px",
                  }}
                >
                  <Col span={24}>
                    <div
                      style={{ marginBottom: "0.5rem", textAlign: "center" }}
                    >
                      <h3
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: "600",
                          color: "#545EE1",
                          textTransform: "uppercase",
                        }}
                      >
                        {price?.subscription}
                      </h3>
                    </div>

                    <p
                      style={{
                        fontWeight: "500",
                        fontSize: "1rem",
                        color: "#313416",
                        textAlign: "center",
                      }}
                    >
                      {price?.content}
                    </p>

                    <div
                      style={{ textAlign: "center", marginBottom: "1.5rem" }}
                    >
                      <p
                        style={{
                          fontSize: "1.3rem",
                          fontWeight: "600",
                          color: "#F76F01",
                        }}
                      >
                        ৳{price?.price}
                      </p>
                    </div>

                    <div style={{ textAlign: "center" }}>
                      <Button
                        style={{ background: "#545EE1", color: "#F5F4F9" }}
                      >
                        <Link href={`/user/subscription/${price?.id}`}>
                          Subscribe
                        </Link>
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Col>
            )
          );
        })}
      </Row>
    </div>
  );
};

const queryClient = new QueryClient();

const SeeAllFAQWithQueryClient = () => (
  <QueryClientProvider client={queryClient}>
    <PricingPage />
  </QueryClientProvider>
);

export default dynamic(() => Promise.resolve(SeeAllFAQWithQueryClient), {
  ssr: false,
});
