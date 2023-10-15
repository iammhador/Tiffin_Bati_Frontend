"use client";

import { Row, Col, Form, Input, Button, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import contactUs from "../../app/assets/contact-us.png";
import Image from "next/image";

const ContactUsPage = () => {
  const handleSubmit = (data: {
    fullName: string;
    email: string;
    message: string;
  }) => {
    if (!!data.fullName || !!data.email || !!data.message) {
      message.success(`${data.fullName}, Your message successfully sent.`);
    }
  };
  return (
    <div style={{ margin: "10% 4%" }}>
      <h1
        style={{
          textAlign: "center",
          margin: "3rem 0",
          fontSize: "2rem",
          fontWeight: "600",
          color: "#545EE1",
          textTransform: "uppercase",
        }}
      >
        Contact US
      </h1>
      <Row
        justify="center"
        align="middle"
        style={{
          color: "#E2E8F0",
        }}
      >
        <Col xs={24} md={12} style={{ padding: "0 10%" }}>
          <div style={{ marginBottom: "25px" }}>
            <h2
              style={{
                fontSize: "30px",
                fontWeight: "500",
                color: "#F76F01",
              }}
            >
              Lets talk!
            </h2>
            <p
              style={{
                fontSize: "18px",
                fontWeight: "500",
              }}
            >
              If you have any queries let us know!
            </p>
          </div>
          <Image src={contactUs} alt="Contact US Image" layout="responsive" />
        </Col>
        <Col xs={24} md={12}>
          <Form onFinish={handleSubmit} layout="vertical" noValidate>
            <Form.Item label="Full name" name="fullName">
              <Input placeholder="Jhankar Mahbub" />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input placeholder="khan4019@gmail.com" type="email" />
            </Form.Item>
            <Form.Item label="Message" name="message">
              <TextArea
                placeholder="I love the variety of dishes offered. Each meal is bursting with flavor, and it's exciting to try different cuisines every day. No more dining out and spending a fortune. This service not only saves time but also money. It's a win-win for students and professionals."
                rows={3}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: "#F76F01",
                  color: "#F5F4F9",
                }}
              >
                Send Message
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ContactUsPage;
