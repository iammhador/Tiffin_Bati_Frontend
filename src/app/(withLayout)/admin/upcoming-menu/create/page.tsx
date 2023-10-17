"use client";

import { Button, Col, Form, Row, message } from "antd";
import Image from "next/image";
import upComingFoodImage from "../../../../assets/input/upcoming-food.png";
import InputItem from "@/components/inputField/inputItem";
import type { UploadChangeParam } from "antd/es/upload";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import axios from "axios";
import { getFromLocalStorage } from "@/app/utils/local-storage";
import { decodedToken } from "@/app/utils/jwt";
import { useEffect, useState } from "react";
import InputUpload from "@/components/inputField/inputUpload";

type TokenInfo = {
  userId: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
};

const AdminCreateUpComingFoodPage = () => {
  const [adminId, setAdminId] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

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
        "https://api.imgbb.com/1/upload?key=2d792faf2ced232b9cfa03671f9fcfc0",
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
        "http://localhost:5000/api/v1/new-food",
        values
      );

      response && message.success("Up Coming Menu Added!");
    } catch (error) {
      return message.error("An error has occurred: " + error);
    }
  };

  return (
    <div>
      <div style={{ margin: "0% 4%" }}>
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
                Up-Coming Menu
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
                    required={true}
                    message="Please input your menu title"
                    type="text"
                    placeholder="Potol Bajhi"
                  />
                  <InputItem
                    label="category"
                    name="category"
                    required={true}
                    message="Please input your menu category"
                    type="text"
                    placeholder="Vegetables"
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
                src={upComingFoodImage}
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

export default AdminCreateUpComingFoodPage;
