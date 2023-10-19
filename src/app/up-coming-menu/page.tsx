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
          ALL MENU
        </h2>

        <Row gutter={[16, 16]}>
          {data?.data?.map((item: any) => (
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 8 }}
              lg={{ span: 6 }}
              key={item?.id}
            >
              <Card
                hoverable
                style={{ width: 240, marginBottom: "20px" }}
                cover={
                  <Image
                    src={item?.image}
                    width={150}
                    height={150}
                    alt={item?.title}
                  />
                }
              >
                <Meta title={item?.title} description={item?.category} />
              </Card>
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
