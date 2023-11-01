"use client";

import { Button, Col, Form, Row, message } from "antd";
import Image from "next/image";
import blogImage from "../../../../assets/input/blog.png";
import InputItem from "@/components/inputField/inputItem";
import axios from "axios";
import { getFromLocalStorage } from "@/app/utils/local-storage";
import { decodedToken } from "@/app/utils/jwt";
import { useEffect, useState } from "react";
import InputTextArea from "@/components/inputField/inputTextAre";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

type TokenInfo = {
  userId: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
};

const AdminCreateBlogPage = () => {
  const [adminId, setAdminId] = useState<string>("");
  const [form] = Form.useForm();
  const authToken = getFromLocalStorage("accessToken");

  useEffect(() => {
    if (authToken) {
      const tokenInfo = decodedToken(authToken as string) as TokenInfo;
      const { userId } = tokenInfo;
      setAdminId(userId);
    }
  }, [authToken]);

  const onFinish = async (values: any) => {
    values.adminId = adminId;
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_TIFFIN_BATI}/blog`,
        values
      );

      if (response) {
        message.success("Blog Created!");
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
                CREATE A NEW BLOG
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
                    placeholder="The Ultimate Guide to Healthy Eating: Nourish Your Body and Mind"
                  />
                  <InputTextArea
                    label="description"
                    name="description"
                    required={true}
                    message="Please input your menu description"
                    type="text"
                    placeholder="Learn the importance of a balanced diet and how making mindful food choices can positively impact your overall well-being. Explore a variety of delicious and nutritious recipes, and discover the key components of a healthy eating plan that can help you achieve your wellness goals."
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
              <Image src={blogImage} alt="Register Image" layout="responsive" />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AdminCreateBlogPage;
