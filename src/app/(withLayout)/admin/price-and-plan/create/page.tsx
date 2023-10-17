"use client";

import { Button, Col, Form, Row, message } from "antd";
import Image from "next/image";
import priceAndPlanImage from "../../../../assets/input/price.png";
import InputItem from "@/components/inputField/inputItem";
import axios from "axios";
import { getFromLocalStorage } from "@/app/utils/local-storage";
import { decodedToken } from "@/app/utils/jwt";
import { useEffect, useState } from "react";
import InputDropdown from "@/components/inputField/inputDropdown";

type TokenInfo = {
  userId: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
};

const options = [
  { label: "Monthly", value: "Monthly" },
  { label: "Yearly", value: "Yearly" },
];

const AdminCreatePriceAndPlanPage = () => {
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
        "http://localhost:5000/api/v1/price-and-plan",
        values
      );

      if (response) {
        message.success("Price And Plan Added!!");
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
                PRICE & PLAN
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
                  <InputDropdown
                    label="Subscription"
                    placeholder="Monthly"
                    name="subscription"
                    required={true}
                    message="Please select subscription"
                    inputOptions={options}
                  />
                  <InputItem
                    label="Content"
                    name="content"
                    required={true}
                    message="Please input your lunch or dinner or both"
                    type="text"
                    placeholder="Lunch & Dinner"
                  />
                  <InputItem
                    label="Price"
                    name="price"
                    required={true}
                    message="Please input price"
                    type="text"
                    placeholder="5700"
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
                src={priceAndPlanImage}
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

export default AdminCreatePriceAndPlanPage;
