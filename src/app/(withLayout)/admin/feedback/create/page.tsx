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

type TokenInfo = {
  userId: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
};

const AdminBlogPage = () => {
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
        "http://localhost:5000/api/v1/feedback",
        values
      );

      if (response) {
        message.success("Feedback Send!!");
        form.resetFields();
      }
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
                SENT US FEEDBACK
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
                    label="Subject"
                    name="subject"
                    required={true}
                    message="Please input your subject"
                    type="text"
                    placeholder="Tiffin Bati Is Best"
                  />
                  <InputTextArea
                    label="message"
                    name="message"
                    required={true}
                    message="Please input your menu message"
                    type="text"
                    placeholder="Your service is awesome!!"
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

export default AdminBlogPage;
