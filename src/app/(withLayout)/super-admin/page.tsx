"use client";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row, message } from "antd";
import Image from "next/image";
import updateImage from "../../assets/input/update.png";
import InputItem from "@/components/inputField/inputItem";
import InputPassword from "@/components/inputField/inputPassword";
import InputDropdown from "@/components/inputField/inputDropdown";
import InputUpload from "@/components/inputField/inputUpload";
import axios from "axios";
import type { UploadChangeParam } from "antd/es/upload";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import { getFromLocalStorage } from "@/app/utils/local-storage";
import { decodedToken } from "@/app/utils/jwt";
import Loading from "@/app/loading";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import InputDatePicker from "@/components/inputField/inputDatePicker";

type TokenInfo = {
  userId: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
};

const SuperAdminManagePage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [useId, setUserId] = useState<string>("");

  const authToken = getFromLocalStorage("accessToken");

  useEffect(() => {
    if (authToken) {
      const tokenInfo = decodedToken(authToken as string) as TokenInfo;
      const { userId: id } = tokenInfo;
      setUserId(id);
    }
  }, [authToken]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get(`http://localhost:5000/api/v1/super-admin/${useId}`)
        .then((res) => res.data),
    refetchInterval: 10000,
  });

  if (isLoading) return <Loading />;

  if (error) {
    return message.error("An error has occurred: " + error);
  }

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
    values.dateOfBirth = selectedDate ? selectedDate : data?.data?.dateOfBirth;
    values.profileImage = imageUrl ? imageUrl : data?.data?.profileImage;
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/super-admin/${useId}`,
        values
      );
      message.success("Super Admin Information Updated Successfully.");
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div style={{ margin: "0% 4%", height: "100vh" }}>
      <Row>
        <Col
          xs={{ span: 24, order: 2 }}
          sm={{ span: 12, order: 2 }}
          md={{ span: 12, order: 2 }}
          lg={{ span: 12, order: 2 }}
          style={{
            justifySelf: "center",
            alignSelf: "center",
          }}
        >
          <div>
            <Image src={updateImage} alt="Register Image" layout="responsive" />
          </div>
        </Col>
        <Col
          xs={{ span: 24, order: 1 }}
          sm={{ span: 12, order: 1 }}
          md={{ span: 12, order: 1 }}
          lg={{ span: 12, order: 1 }}
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
              UPDATE SUPER ADMIN INFORMATION
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
                  message="Please input your username"
                  type="text"
                  placeholder={data?.data?.username}
                  defaultValue={data?.data?.username}
                />
                <InputPassword
                  label="password"
                  name="password"
                  message="Please input your password"
                  type="password"
                  placeholder={data?.data?.password}
                  defaultValue={data?.data?.password}
                />
                <InputDatePicker handleDateChange={handleDateChange} />
                <InputItem
                  label="address"
                  name="address"
                  message="Please input your address"
                  type="text"
                  placeholder={data?.data?.address}
                  defaultValue={data?.data?.address}
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
                  message="Please input your email"
                  type="text"
                  placeholder={data?.data?.email}
                  defaultValue={data?.data?.email}
                />
                <InputItem
                  label="contact no"
                  name="contactNo"
                  message="Please input your contact number"
                  type="text"
                  placeholder={data?.data?.contactNo}
                  defaultValue={data?.data?.contactNo}
                />

                <InputDropdown
                  label="gender"
                  name="gender"
                  message="Please select your gender"
                  placeholder={data?.data?.gender}
                  defaultValue={data?.data?.gender}
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

const queryClient = new QueryClient();

const AccountManagePageQueryClient = () => (
  <QueryClientProvider client={queryClient}>
    <SuperAdminManagePage />
  </QueryClientProvider>
);

export default AccountManagePageQueryClient;