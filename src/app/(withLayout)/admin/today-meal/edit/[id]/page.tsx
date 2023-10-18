"use client";

import { useState } from "react";
import { Button, Col, Form, Row, message } from "antd";
import Image from "next/image";
import todayFoodImage from "../../../../../assets/input/today-food.png";
import InputItem from "@/components/inputField/inputItem";
import InputUpload from "@/components/inputField/inputUpload";
import axios from "axios";
import type { UploadChangeParam } from "antd/es/upload";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";

import Loading from "@/app/loading";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import InputDropdown from "@/components/inputField/inputDropdown";

const options = [
  { label: "Lunch", value: "LUNCH" },
  { label: "Dinner", value: "DINNER" },
];

type IDProps = {
  params: {
    id: string;
  };
};
const AdminCreatedTodayFoodEditPage = ({ params }: IDProps) => {
  const { id } = params;
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_TIFFIN_BATI}/today-food/${id}`)
        .then((res) => res.data),
    refetchInterval: 10000,
  });

  if (isLoading) return <Loading />;

  if (error) {
    return message.error("An error has occurred: " + error);
  }

  const handleChange: UploadProps["onChange"] = async (
    info: UploadChangeParam<UploadFile>
  ) => {
    const image = info.file.originFileObj;
    const formData = new FormData();
    formData.append("image", image as Blob);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_IMGBB_API}`,
        formData
      );

      setImageUrl(response.data.data.display_url);
    } catch (error) {
      console.error("Error uploading image to ImageBB:", error);
    }
  };

  const onFinish = async (values: any) => {
    values.image = imageUrl ? imageUrl : data?.data?.image;

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_TIFFIN_BATI}/today-food/${id}`,
        values
      );
      message.success(`${data?.data?.title} information Updated Successfully.`);
    } catch (error) {
      message.error("Error occurred:" + error);
    }
  };

  return (
    <div style={{ margin: "0% 4%" }}>
      <Row>
        <Col
          xs={{ span: 24, order: 2 }}
          sm={{ span: 12, order: 2 }}
          md={{ span: 12, order: 2 }}
          lg={{ span: 12, order: 2 }}
          style={{
            justifySelf: "center",
            alignSelf: "center",
          }}
        >
          <div>
            <Image
              src={todayFoodImage}
              alt="Register Image"
              layout="responsive"
            />
          </div>
        </Col>
        <Col
          xs={{ span: 24, order: 1 }}
          sm={{ span: 12, order: 1 }}
          md={{ span: 12, order: 1 }}
          lg={{ span: 12, order: 1 }}
          style={{
            justifySelf: "center",
            alignSelf: "center",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            <h2
              style={{
                fontSize: "22px",
                fontWeight: "600",
                color: "#545EE1",
                textTransform: "uppercase",
              }}
            >
              UPDATE{" "}
              <span
                style={{
                  color: "#F76F01",
                }}
              >
                {data?.data?.title}
              </span>{" "}
              INFORMATION
            </h2>
          </div>

          <Form layout="vertical" onFinish={onFinish}>
            <Row>
              <Col
                xs={{ span: 24, order: 1 }}
                sm={{ span: 24, order: 1 }}
                md={{ span: 24, order: 1 }}
                lg={{ span: 24, order: 1 }}
              >
                <InputItem
                  label="title"
                  name="title"
                  message="Please input your menu title"
                  type="text"
                  placeholder={data?.data?.title}
                  defaultValue={data?.data?.title}
                />
                <InputItem
                  label="category"
                  name="category"
                  message="Please input your menu category"
                  type="text"
                  placeholder={data?.data?.category}
                  defaultValue={data?.data?.category}
                />
                <InputDropdown
                  label="shift"
                  name="shift"
                  inputOptions={options}
                  message="Please select shift"
                  placeholder={data?.data?.shift}
                  defaultValue={data?.data?.shift}
                />
                <InputUpload
                  label="photo"
                  imageUrl={imageUrl}
                  name="image"
                  handleChange={handleChange}
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
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

const queryClient = new QueryClient();

const TodayFoodPageQueryClient = ({ params }: any) => (
  <QueryClientProvider client={queryClient}>
    <AdminCreatedTodayFoodEditPage params={params} />
  </QueryClientProvider>
);

export default TodayFoodPageQueryClient;
