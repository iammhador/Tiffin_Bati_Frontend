"use client";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row, message } from "antd";
import Image from "next/image";
import registerImage from "../../app/assets/register.png";
import InputItem from "@/components/inputField/inputItem";
import InputPassword from "@/components/inputField/inputPassword";
import InputDropdown from "@/components/inputField/inputDropdown";
import InputDatePicker from "@/components/inputField/inputDatePicker";
import InputUpload from "@/components/inputField/inputUpload";
import Link from "next/link";
import axios from "axios";
import type { UploadChangeParam } from "antd/es/upload";
import { useRouter } from "next/navigation";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import Navbar from "@/components/ui/navbar";

const RegisterPage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [form] = Form.useForm();

  const router = useRouter();

  const handleDateChange = (date: dayjs.ConfigType, dateString: string) => {
    const formattedDate = dayjs(dateString).format("YYYY-MM-DD");
    setSelectedDate(formattedDate);
  };

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
    values.dateOfBirth = selectedDate;
    values.profileImage = imageUrl ? imageUrl : null;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_TIFFIN_BATI}/users`,
        values
      );

      console.log(`Response: `, response);
      if (response) {
        message.success("User Registered Successfully.");
        form.resetFields();
        router.push("/login");
      }
    } catch (error) {
      message.error(
        "Something went wrong. Please check everything and try again."
      );
    }
  };

  //@ Have to check why image is not updated in the database
  // const onFinish = async (values: any) => {
  //   // console.log(values);
  //   values.dateOfBirth = selectedDate;
  //   values.profileImage = (await values.profileImage)
  //     ? values.profileImage
  //     : null;

  //   // console.log(await values.profileImage);
  //   // console.log(values);

  //   try {
  //     const response = await axios.post(
  //       `${process.env.NEXT_PUBLIC_TIFFIN_BATI}/users`,
  //       values
  //     );

  //     console.log(`Response: `, response);
  //     if (response) {
  //       message.success("User Registered Successfully.");
  //       form.resetFields();
  //       router.push("/login");
  //     }
  //   } catch (error) {
  //     message.error(
  //       "Something went wrong. Please check everything and try again."
  //     );
  //   }
  // };

  return (
    <div>
      <Navbar />
      <div style={{ margin: "0% 4%" }}>
        <Row>
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
                src={registerImage}
                alt="Register Image"
                layout="responsive"
              />
            </div>
          </Col>
          <Col
            xs={{ span: 24, order: 1 }}
            sm={{ span: 12, order: 2 }}
            md={{ span: 12, order: 2 }}
            lg={{ span: 12, order: 2 }}
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
                }}
              >
                REGISTER
              </h2>
              <p>
                Already have an account?{" "}
                <Link href="/login" style={{ color: "#F76F01" }}>
                  Login
                </Link>
              </p>
            </div>

            <Form layout="vertical" onFinish={onFinish} form={form}>
              <Row>
                <Col
                  xs={{ span: 24, order: 1 }}
                  sm={{ span: 12, order: 1 }}
                  md={{ span: 12, order: 1 }}
                  lg={{ span: 12, order: 1 }}
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
                  <InputDatePicker
                    handleDateChange={handleDateChange}
                    required={true}
                  />
                  <InputItem
                    label="address"
                    name="address"
                    required={true}
                    message="Please input your address"
                    type="text"
                    placeholder="dhaka, bangladesh"
                  />
                </Col>
                <Col
                  xs={{ span: 24, order: 2 }}
                  sm={{ span: 12, order: 2 }}
                  md={{ span: 12, order: 2 }}
                  lg={{ span: 12, order: 2 }}
                >
                  <InputItem
                    label="email"
                    name="email"
                    required={true}
                    message="Please input your email"
                    type="email"
                    placeholder="iammhador@gmail.com"
                  />
                  <InputItem
                    label="contact no"
                    name="contactNo"
                    required={true}
                    message="Please input your contact number"
                    type="text"
                    placeholder="01512345678"
                  />

                  <InputDropdown
                    label="gender"
                    placeholder="male"
                    name="gender"
                    required={true}
                    message="Please select your gender"
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
    </div>
  );
};

export default RegisterPage;
