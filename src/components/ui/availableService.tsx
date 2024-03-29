"use client";

import { Col, Row, Card, Button } from "antd";
import Image from "next/image";
import aluBhorrta from "../../app/assets/food/aluVorta.png";
import daal from "../../app/assets/food/daal.png";
import lalShak from "../../app/assets/food/lal-shak.png";
import murgiGosto from "../../app/assets/food/murgi-gosto.png";
import lakkaShutikiBhuna from "../../app/assets/food/lakka-shutiki-bhuna.png";
import tomatoChutne from "../../app/assets/food/tomato-chutney.png";
import pangasMach from "../../app/assets/food/pangas-mach.png";
import mistiKumraVaji from "../../app/assets/food/misti-kumra-vaji.png";
import biriyani from "../../app/assets/food/biriyani.png";
import dimVuna from "../../app/assets/food/dim-vuna.png";
import gajorerHalua from "../../app/assets/food/gajorer-halua.png";
import Loading from "@/app/loading";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import Meta from "antd/es/card/Meta";
import { useState } from "react";
import dynamic from "next/dynamic";

const AvailableService = () => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_TIFFIN_BATI}/menu`)
        .then((res) => res.data),
    refetchInterval: 10000,
  });
  refetch();

  if (isLoading) return <Loading />;

  if (error) return "An error has occurred: " + error;
  return (
    <div style={{ margin: "10% 4%" }}>
      <h1
        style={{
          textAlign: "center",
          margin: "3rem 0",
          fontSize: "2rem",
          fontWeight: "600",
          color: "#545EE1",
          textTransform: "uppercase",
        }}
      >
        The meal we provide
      </h1>

      <Row gutter={[16, 16]} justify="center">
        {data?.data?.data
          .slice(0, showAll ? data?.data?.data.length : 8)
          .map((item: any) => (
            <Col
               xs={{ span: 24 }}
              sm={{ span: 12 }}
              md={{ span: 8 }}
              lg={{ span: 6 }}
              key={item?.id}
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "5px",
              }}
            >
              <Link href={`/menu/details/${item.id}`}>
                <Row
                  style={{
                    width: 240,
                    margin: "15px",
                    borderRadius: "10px",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Col span={24}>
                    <Link href={`/menu/details/${item.id}`}>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Image
                          src={item?.image}
                          alt={item?.title}
                          width={150}
                          height={150}
                        />
                      </div>
                    </Link>
                  </Col>
                  <Col span={24}>
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
                  </Col>
                </Row>
              </Link>
            </Col>
          ))}
      </Row>

      {data?.data?.data?.length >= 5 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "2rem 0",
          }}
        >
          <Link href="/menu">
            <Button style={{ background: "#545EE1", color: "#F5F4F9" }}>
              See More
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

const queryClient = new QueryClient();

const MenuPageWithQueryClient = () => (
  <QueryClientProvider client={queryClient}>
    <AvailableService />
  </QueryClientProvider>
);

export default dynamic(() => Promise.resolve(MenuPageWithQueryClient), {
  ssr: false,
});
