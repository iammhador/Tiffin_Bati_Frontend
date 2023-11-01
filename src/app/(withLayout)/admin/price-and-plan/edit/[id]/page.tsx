"use client";

import { Button, Col, Form, Row, message } from "antd";
import Image from "next/image";
import priceAndPlanImage from "../../../../../assets/input/price.png";
import InputItem from "@/components/inputField/inputItem";
import axios from "axios";
import Loading from "@/app/loading";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import InputDropdown from "@/components/inputField/inputDropdown";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
const options = [
  { label: "Monthly", value: "Monthly" },
  { label: "Yearly", value: "Yearly" },
];

type IDProps = {
  params: {
    id: string;
  };
};
const AdminCreatePriceAndPlanEditPage = ({ params }: IDProps) => {
  const { id } = params;
  const [form] = Form.useForm();
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_TIFFIN_BATI}/price-and-plan/${id}`)
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
        `${process.env.NEXT_PUBLIC_TIFFIN_BATI}/price-and-plan/${id}`,
        values
      );

      if (response) {
        message.success(
          `${data?.data?.subscription} information Updated Successfully.`
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
            href: "http://localhost:3000/admin/price-and-plan/see-all",
            title: (
              <>
                <span>Price & Plan</span>
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
            <Image
              src={priceAndPlanImage}
              alt="Register Image"
              layout="responsive"
            />
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
                {data?.data?.subscription}
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
                <InputDropdown
                  label="Subscription"
                  name="subscription"
                  message="Please select subscription"
                  inputOptions={options}
                  defaultValue={data?.data?.subscription}
                  placeholder={data?.data?.subscription}
                />
                <InputItem
                  label="Content"
                  name="content"
                  message="Please input your lunch or dinner or both"
                  type="text"
                  defaultValue={data?.data?.content}
                  placeholder={data?.data?.content}
                />
                <InputItem
                  label="Price"
                  name="price"
                  message="Please input price"
                  type="text"
                  defaultValue={data?.data?.price}
                  placeholder={data?.data?.price}
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

const PriceAndPlanQueryClient = ({ params }: any) => (
  <QueryClientProvider client={queryClient}>
    <AdminCreatePriceAndPlanEditPage params={params} />
  </QueryClientProvider>
);

export default PriceAndPlanQueryClient;
