"use client";

import { useEffect, useState } from "react";
import { Button, Col, Form, Row, message } from "antd";
import Image from "next/image";
import menuImage from "../../../../../assets/input/menu.png";
import InputItem from "@/components/inputField/inputItem";
import InputUpload from "@/components/inputField/inputUpload";
import axios from "axios";
import type { UploadChangeParam } from "antd/es/upload";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import { getFromLocalStorage } from "@/app/utils/local-storage";
import { decodedToken } from "@/app/utils/jwt";
import Loading from "@/app/loading";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { TokenInfo } from "@/app/constants/global";

type IDProps = {
  params: {
    id: string;
  };
};
const AdminCreatedMenuEditPage = ({ params }: IDProps) => {
  const { id } = params;
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [useId, setUserId] = useState<string>("");
  const [form] = Form.useForm();
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
        .get(`${process.env.NEXT_PUBLIC_TIFFIN_BATI}/menu/${id}`)
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
      message.error("Error uploading image to ImageBB:" + error);
    }
  };

  const onFinish = async (values: any) => {
    values.image = imageUrl ? imageUrl : data?.data?.image;
    values.adminId = useId ? useId : data?.data?.adminId;

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_TIFFIN_BATI}/menu/${id}`,
        values
      );

      if (response) {
        message.success("Menu Updated Successfully.");
        form.resetFields();
      }
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
            <Image src={menuImage} alt="Register Image" layout="responsive" />
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

          <Form layout="vertical" onFinish={onFinish} form={form}>
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
                />
                <InputItem
                  label="category"
                  name="category"
                  message="Please input your menu category"
                  type="text"
                  placeholder={data?.data?.category}
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

const MenuPageQueryClient = ({ params }: any) => (
  <QueryClientProvider client={queryClient}>
    <AdminCreatedMenuEditPage params={params} />
  </QueryClientProvider>
);

export default MenuPageQueryClient;
