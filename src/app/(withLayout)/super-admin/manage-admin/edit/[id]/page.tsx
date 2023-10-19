"use client";

import { useState } from "react";
import { Button, Col, Form, Row, message } from "antd";
import Image from "next/image";
import adminImage from "../../../../../assets/admin.png";
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

type IDProps = {
  params: {
    id: string;
  };
};

const options = [
  { label: "Admin", value: "admin" },
  { label: "User", value: "user" },
];
const SuperAdminCreateManageAdminEditPage = ({ params }: IDProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { id } = params;
  const [form] = Form.useForm();
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_TIFFIN_BATI}/admin/${id}`)
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

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_TIFFIN_BATI}/admin/${id}`,
        values
      );
      if (response) {
        message.success(
          `${data?.data?.username} information Updated Successfully.`
        );
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
            <Image src={adminImage} alt="Register Image" layout="responsive" />
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
                {data?.data?.username}
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
                  label="email"
                  name="email"
                  message="Please input your email"
                  type="email"
                  placeholder={data?.data?.email}
                  defaultValue={data?.data?.email}
                />

                <InputItem
                  label="address"
                  name="address"
                  message="Please input your address"
                  type="text"
                  placeholder={data?.data?.address}
                  defaultValue={data?.data?.address}
                />
                <InputItem
                  label="contact no"
                  name="contactNo"
                  message="Please input your contact number"
                  type="text"
                  placeholder={data?.data?.contactNo}
                  defaultValue={data?.data?.contactNo}
                />

                <InputDropdown
                  label="Role"
                  name="role"
                  inputOptions={options}
                  placeholder={data?.data?.role}
                  defaultValue={data?.data?.role}
                />

                <InputDropdown
                  label="gender"
                  name="gender"
                  placeholder={data?.data?.gender}
                  defaultValue={data?.data?.gender}
                />

                <InputUpload
                  label="photo"
                  imageUrl={imageUrl}
                  name="profileImage"
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

const ManageAdminQueryClient = ({ params }: any) => (
  <QueryClientProvider client={queryClient}>
    <SuperAdminCreateManageAdminEditPage params={params} />
  </QueryClientProvider>
);

export default ManageAdminQueryClient;
