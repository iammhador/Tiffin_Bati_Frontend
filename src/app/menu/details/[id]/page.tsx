"use client";

import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {  Button, Rate, Form, message, Input } from "antd";
import Image from "next/image";
import FooterPage from "@/components/ui/footer";
import Loading from "@/app/loading";
import { getFromLocalStorage } from "@/app/utils/local-storage";
import { decodedToken } from "@/app/utils/jwt";
import { TokenInfo } from "@/app/constants/global";
import ReviewAndRatingPage from "@/components/ui/reviewAndRating";
import Navbar from "@/components/ui/navbar";

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
  const [form] = Form.useForm();

  useEffect(() => {
    if (authToken) {
      const tokenInfo = decodedToken(authToken as string) as TokenInfo;
      const { userId: id } = tokenInfo;
      setUserId(id);
    }
  }, [authToken]);

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_TIFFIN_BATI}/menu/${id}`)
        .then((res) => res.data),
  });

  refetch();

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
        `${process.env.NEXT_PUBLIC_TIFFIN_BATI}/review-and-rating`,
        values
      );

      if (response) {
        message.success(`${data?.data?.title} review has been updated.`);
        form.resetFields();
      }
    } catch (error) {
      message.error("Error occurred:" + error);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return message.error("An error has occurred: " + error);

  return (
    <div>
      <Navbar />
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
            maxWidth: "80vw",
          }}
        >
          {data?.data?.title}
        </h2>

        <div
          style={{
            width: "80vw",
            margin: "1% auto",
            maxWidth: "400px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "3%",
          }}
        >
          <div style={{ maxWidth: "100%" }}>
            <Image
              src={data?.data?.image}
              layout="responsive"
              width={250}
              height={250}
              alt={data?.data?.title}
            />
          </div>
        </div>

        {useId && (
          <div style={{ width: "80%", margin: "2% auto", maxWidth: "400px" }}>
            <Rate
              style={{ margin: "1% auto", display: "block" }}
              allowHalf
              value={rating}
              onChange={handleRatingChange}
            />

            <Form layout="vertical" onFinish={onFinish} form={form}>
              <Form.Item
                label=""
                name="review"
                rules={[
                  {
                    required: true,
                    message: "Please give your valuable comments",
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="Write your comments...."
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </Form.Item>

              <Button
                style={{
                  background: "#545EE1",
                  color: "#F5F4F9",
                  border: "none",
                }}
                htmlType="submit"
              >
                Submit
              </Button>
            </Form>
          </div>
        )}

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
