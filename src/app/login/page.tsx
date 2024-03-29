"use client";

import { Button, Col, Form, Row, message } from "antd";
import Image from "next/image";
import LoginImage from "../../app/assets/login.png";
import InputItem from "@/components/inputField/inputItem";
import InputPassword from "@/components/inputField/inputPassword";
import Link from "next/link";
import axios from "axios";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "../utils/local-storage";
import { decodedToken } from "../utils/jwt";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/navbar";

type TokenInfo = {
  userId: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
};

const LoginPage = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_TIFFIN_BATI}/auth/login`,
        values
      );

      if (response.data.data.accessToken) {
        removeFromLocalStorage("accessToken");
        const accessToken = response.data.data.accessToken;
        setToLocalStorage("accessToken", accessToken as string);
      }

      const authToken = getFromLocalStorage("accessToken");

      if (authToken) {
        const tokenInfo = decodedToken(authToken as string) as TokenInfo;
        const { role } = tokenInfo;

        router.push(role);
      }

      if (response) {
        message.success("User Logged In Successfully.");
        form.resetFields();
      }
    } catch (error) {
      return message.error((error as any)?.response?.data?.message);
    }
  };

  return (
    <div>
      <Navbar />
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
                LOGIN
              </h2>
              <p>
                Do not have an account?{" "}
                <Link href="/register" style={{ color: "#F76F01" }}>
                  Register
                </Link>
              </p>
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
                    label="username"
                    name="username"
                    required={true}
                    message="Please input your username"
                    type="text"
                    placeholder="iammhador"
                  />

                  <InputPassword
                    label="password"
                    name="password"
                    required={true}
                    message="Please input your password"
                    type="password"
                    placeholder="********"
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
                src={LoginImage}
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

export default LoginPage;
