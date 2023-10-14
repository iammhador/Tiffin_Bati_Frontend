"use client";
import React from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";

const LoginForm = () => {
  const onFinish = async (values: any) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        values
      );
      console.log(response.data.data.accessToken);

      if (response.data.data.accessToken) {
        localStorage.setItem("accessToken", response?.data?.data?.accessToken);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish}>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
