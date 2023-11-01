"use client";

import { Button, Col, Form, Row, message } from "antd";
import Image from "next/image";
import todayFoodImage from "../../../../assets/input/today-food.png";
import InputItem from "@/components/inputField/inputItem";
import type { UploadChangeParam } from "antd/es/upload";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import axios from "axios";
import { getFromLocalStorage } from "@/app/utils/local-storage";
import { decodedToken } from "@/app/utils/jwt";
import { useEffect, useState } from "react";
import InputUpload from "@/components/inputField/inputUpload";
import InputDropdown from "@/components/inputField/inputDropdown";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

type TokenInfo = {
  userId: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
};

const options = [
  { label: "Lunch", value: "LUNCH" },
  { label: "Dinner", value: "DINNER" },
];

const AdminCreateTodayMealPage = () => {
  const [adminId, setAdminId] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [form] = Form.useForm();

  const authToken = getFromLocalStorage("accessToken");

  useEffect(() => {
    if (authToken) {
      const tokenInfo = decodedToken(authToken as string) as TokenInfo;
      const { userId } = tokenInfo;
      setAdminId(userId);
    }
  }, [authToken]);

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
    values.adminId = adminId;
    values.image = imageUrl;
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_TIFFIN_BATI}/today-food`,
        values
      );

      if (response) {
        message.success("Today Meal Created!");
        form.resetFields();
      }
    } catch (error) {
      return message.error("An error has occurred: " + error);
    }
  };

  return (
    <div>
      <div style={{ margin: "0% 4%" }}>
        <Breadcrumb
          style={{ margin: "2% 0" }}
          items={[
            {
              href: "http://localhost:3000",
              title: <HomeOutlined />,
            },
            {
              href: "http://localhost:3000/admin",
              title: (
                <>
                  <span>Profile</span>
                </>
              ),
            },
          ]}
        />
        <Row justify="center" align="middle">
          <Col
            style={{
              justifySelf: "center",
              alignSelf: "center",
            }}
            xs={{ span: 24, order: 1 }}
            sm={{ span: 12, order: 1 }}
            md={{ span: 12, order: 1 }}
            lg={{ span: 12, order: 1 }}
          >
            <div
              style={{
                textAlign: "left",
                marginBottom: "20px",
              }}
            >
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: "600",
                  color: "#545EE1",
                }}
              >
                TODAY MEAL
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
                    required={true}
                    message="Please input your menu title"
                    type="text"
                    placeholder="Ala Shak"
                  />
                  <InputItem
                    label="category"
                    name="category"
                    required={true}
                    message="Please input your menu category"
                    type="text"
                    placeholder="Vegetables"
                  />
                  <InputDropdown
                    label="shift"
                    placeholder="Dinner"
                    name="shift"
                    required={true}
                    inputOptions={options}
                    message="Please select shift"
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
          <Col
            xs={{ span: 24, order: 2 }}
            sm={{ span: 12, order: 1 }}
            md={{ span: 12, order: 1 }}
            lg={{ span: 12, order: 1 }}
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
        </Row>
      </div>
    </div>
  );
};

export default AdminCreateTodayMealPage;
