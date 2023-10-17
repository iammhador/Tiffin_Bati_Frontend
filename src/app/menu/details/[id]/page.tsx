"use client";

import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Rate, Form, message } from "antd";
import Image from "next/image";
import HeaderPage from "@/components/ui/header";
import FooterPage from "@/components/ui/footer";
import Loading from "@/app/loading";
import InputTextArea from "@/components/inputField/inputTextAre";
import { getFromLocalStorage } from "@/app/utils/local-storage";
import { decodedToken } from "@/app/utils/jwt";
import { TokenInfo } from "@/app/constants/global";
import ReviewAndRatingPage from "@/components/ui/reviewAndRating";

const { Meta } = Card;

type IDProps = {
  params: {
    id: string;
  };
};

const MenuPage = ({ params }: IDProps) => {
  const { id } = params;
  const [rating, setRating] = useState<number | undefined>(0);
  const [useId, setUserId] = useState<string>("");
  const authToken = getFromLocalStorage("accessToken");

  useEffect(() => {
    if (authToken) {
      const tokenInfo = decodedToken(authToken as string) as TokenInfo;
      const { userId: id } = tokenInfo;
      setUserId(id);
    }
  }, [authToken]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get(`http://localhost:5000/api/v1/menu/${id}`)
        .then((res) => res.data),
    refetchInterval: 10000,
  });

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const onFinish = async (values: any) => {
    values.userId = useId;
    values.menuId = id;
    values.review = values.review.toString();
    values.rating = rating ? rating.toString() : "5";

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/review-and-rating",
        values
        
      );
      message.success(`${data?.data?.title} review has been updated.`);
    } catch (error) {
      message.error("Error occurred:" + error);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return message.error("An error has occurred: " + error);

  return (
    <div>
      <HeaderPage />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "4% 4%",
        }}
      >
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "600",
            color: "#545EE1",
            marginBottom: "2%",
          }}
        >
          {data?.data?.title}
        </h2>

        <Card
          hoverable
          style={{ width: "80vw", margin: "2% auto" }}
          cover={
            <div style={{ maxWidth: "100%" }}>
              <Image
                src={data?.data?.image}
                layout="responsive"
                width={250}
                height={250}
                alt={data?.data?.title}
              />
            </div>
          }
        >
          <Meta title={data?.data?.title} description={data?.data?.category} />
        </Card>

        <div style={{ width: "80%", margin: "2% auto" }}>
          <Rate
            style={{ margin: "1% auto" }}
            allowHalf
            value={rating}
            onChange={handleRatingChange}
          />

          <Form layout="vertical" onFinish={onFinish}>
            <InputTextArea
              label=""
              name="review"
              message="Please give your valuable comments"
              type="text"
              placeholder="Write your comments...."
            />

            <Button
              style={{
                background: "#545EE1",
                color: "#F5F4F9",
              }}
              htmlType="submit"
            >
              Submit
            </Button>
          </Form>
        </div>

        <ReviewAndRatingPage id={id} />
      </div>
      <FooterPage />
    </div>
  );
};

const queryClient = new QueryClient();

const MenuPageWithQueryClient = ({ params }: any) => (
  <QueryClientProvider client={queryClient}>
    <MenuPage params={params} />
  </QueryClientProvider>
);

export default MenuPageWithQueryClient;
