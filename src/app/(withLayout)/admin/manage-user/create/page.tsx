"use client";

import dayjs from "dayjs";
import { useState } from "react";
import { Button, Col, Form, Row, message } from "antd";
import Image from "next/image";
import userImage from "../../../../assets/input/user.png";
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
import HeaderPage from "@/components/ui/header";

const CreateUserPage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

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
        "https://api.imgbb.com/1/upload?key=2d792faf2ced232b9cfa03671f9fcfc0",
        formData
      );

      setImageUrl(response.data.data.display_url);
    } catch (error) {
      console.error("Error uploading image to ImageBB:", error);
    }
  };

  const onFinish = async (values: any) => {
    values.dateOfBirth = selectedDate;
    values.profileImage = imageUrl;
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users",
        values
      );
      message.success("New User Created Successfully.");
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
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
            <Image src={userImage} alt="Register Image" layout="responsive" />
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
              Create A New User
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
                  type="text"
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

export default CreateUserPage;
