"use client";

import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";
import Loading from "../loading";
import { Card, Col, Row } from "antd";
import Image from "next/image";
import FooterPage from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";

import dynamic from "next/dynamic";

const { Meta } = Card;

const UpComingMenuPage = () => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_TIFFIN_BATI}/new-food`)
        .then((res) => res.data),
    refetchInterval: 6000,
  });
  refetch();

  if (isLoading) return <Loading />;

  if (error) return "An error has occurred: " + error;

  return (
    <div>
      <Navbar />
      <div style={{ margin: "4% 4%" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "600",
            color: "#545EE1",
            textAlign: "center",
            marginBottom: "2%",
          }}
        >
          ALL UPCOMING MENU
        </h2>

        <Row gutter={[16, 16]}>
          {data?.data?.map((item: any) => (
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              md={{ span: 8 }}
              lg={{ span: 6 }}
              key={item?.id}
              style={{ marginBottom: "20px" }}
            >
              <div
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "box-shadow 0.3s",
                }}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Image
                    src={item?.image}
                    alt={item?.title}
                    width={150}
                    height={150}
                  />
                </div>
                <div style={{ textAlign: "center", padding: "8px" }}>
                  <h3
                    style={{
                      color: "#545EE1",
                    }}
                  >
                    {item?.title}
                  </h3>
                  <p>{item?.category}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <FooterPage />
    </div>
  );
};

const queryClient = new QueryClient();

const UpComingMenuPageWithQueryClient = () => (
  <QueryClientProvider client={queryClient}>
    <UpComingMenuPage />
  </QueryClientProvider>
);

export default dynamic(() => Promise.resolve(UpComingMenuPageWithQueryClient), {
  ssr: false,
});
