"use client";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import Loading from "../loading";
import { Card, Col, Row } from "antd";
import Image from "next/image";
import FooterPage from "@/components/ui/footer";
import Link from "next/link";
import Navbar from "@/components/ui/navbar";

const { Meta } = Card;

const MenuPage = () => {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_TIFFIN_BATI}/menu`)
        .then((res) => res.data),
    refetchInterval: 10000,
  });

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
          ALL MENU
        </h2>
        <Row gutter={[16, 16]}>
          {data?.data?.data.map((item: any) => (
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 8 }}
              lg={{ span: 6 }}
              key={item?.id}
            >
              <Link href={`/menu/details/${item.id}`}>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={
                    <Image
                      src={item?.image}
                      width={250}
                      height={250}
                      layout="responsive"
                      alt={item?.title}
                    />
                  }
                >
                  <Meta title={item?.title} description={item?.category} />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
      <FooterPage />
    </div>
  );
};

const queryClient = new QueryClient();

const MenuPageWithQueryClient = () => (
  <QueryClientProvider client={queryClient}>
    <MenuPage />
  </QueryClientProvider>
);

export default MenuPageWithQueryClient;
