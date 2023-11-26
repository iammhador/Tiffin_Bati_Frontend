"use client";

import dayjs from "dayjs";
import { useState } from "react";
import { Button, Col, Form, Row, message } from "antd";
import Image from "next/image";
import adminImage from "../../../../assets/admin.png";
import InputItem from "@/components/inputField/inputItem";
import InputPassword from "@/components/inputField/inputPassword";
import InputDropdown from "@/components/inputField/inputDropdown";
import InputDatePicker from "@/components/inputField/inputDatePicker";
import InputUpload from "@/components/inputField/inputUpload";
import axios from "axios";
import type { UploadChangeParam } from "antd/es/upload";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

const ManageAdminPage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

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
        `${process.env.NEXT_PUBLIC_TIFFIN_BATI}/admin`,
        values
      );

      message.success("New Admin Created Successfully.");
    } catch (error) {
      return message.error((error as any)?.response?.data?.message);
    }
  };

  return (
    <div style={{ margin: "0% 4%", height: "100vh" }}>
      <Breadcrumb
        style={{ margin: "2% 0" }}
        items={[
          {
            href: "http://localhost:3000",
            title: <HomeOutlined />,
          },
          {
            href: "http://localhost:3000/super-admin",
            title: (
              <>
                <span>Profile</span>
              </>
            ),
          },
        ]}
      />
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
            <Image src={adminImage} alt="Register Image" layout="responsive" />
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
              CREATE A NEW ADMIN
            </h2>
          </div>

          <Form layout="vertical" onFinish={onFinish}>
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
  );
};

export default ManageAdminPage;
