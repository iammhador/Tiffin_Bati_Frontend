"use client";

import { Button, Col, Form, Row, message } from "antd";
import Image from "next/image";
import FAQImage from "../../../../../assets/input/faq.png";
import InputItem from "@/components/inputField/inputItem";
import axios from "axios";
import Loading from "@/app/loading";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import InputTextArea from "@/components/inputField/inputTextAre";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

type IDProps = {
  params: {
    id: string;
  };
};
const AdminCreateFAQEditPage = ({ params }: IDProps) => {
  const { id } = params;
  const [form] = Form.useForm();
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_TIFFIN_BATI}/faq/${id}`)
        .then((res) => res.data),
    refetchInterval: 10000,
  });

  if (isLoading) return <Loading />;

  if (error) {
    return message.error("An error has occurred: " + error);
  }

  const onFinish = async (values: any) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_TIFFIN_BATI}/faq/${id}`,
        values
      );

      if (response) {
        message.success(
          `${data?.data?.title} information Updated Successfully.`
        );
        form.resetFields();
      }
    } catch (error) {
      message.error("Error occurred:" + error);
    }
  };

  return (
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
          {
            href: "http://localhost:3000/admin/faq/see-all",
            title: (
              <>
                <span>FAQ</span>
              </>
            ),
          },
        ]}
      />
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
            <Image src={FAQImage} alt="Register Image" layout="responsive" />
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
                textTransform: "uppercase",
              }}
            >
              UPDATE{" "}
              <span
                style={{
                  color: "#F76F01",
                }}
              >
                {data?.data?.title}
              </span>{" "}
              INFORMATION
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
                  message="Please input your menu title"
                  type="text"
                  defaultValue={data?.data?.title}
                  placeholder={data?.data?.title}
                />
                <InputTextArea
                  label="description"
                  name="description"
                  message="Please input your menu description"
                  type="text"
                  defaultValue={data?.data?.description}
                  placeholder={data?.data?.description}
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

const ManageFAQQueryClient = ({ params }: any) => (
  <QueryClientProvider client={queryClient}>
    <AdminCreateFAQEditPage params={params} />
  </QueryClientProvider>
);

export default ManageFAQQueryClient;
