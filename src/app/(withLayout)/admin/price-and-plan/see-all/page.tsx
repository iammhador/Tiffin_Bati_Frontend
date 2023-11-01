"use client";

import dayjs from "dayjs";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Space, Table, message, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import Loading from "@/app/loading";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
interface DataType {
  id: string;
  subscription: string;
  price: string;
  createdAt: string;
}

type DataIndex = keyof DataType;

const SeePriceAndPlanAndOperation = () => {
  //@ Fetch All Price And plan =>
  const {
    isLoading,
    error,
    data: priceAndPlanData,
    refetch,
  } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_TIFFIN_BATI}/price-and-plan`)
        .then((res) => res.data),
  });

  if (isLoading) return <Loading />;
  if (error) {
    return message.error("An error has occurred: " + error);
  }

  const handleDelete = async (newFood: DataType) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_TIFFIN_BATI}/price-and-plan/${newFood?.id}`
      );
      if (response) {
        message.success("Price And Plan Deleted successfully", response.data);
      }
      refetch();
    } catch (error) {
      message.error("Error deleting price and plan" + error);
    }
  };

  const getPriceId = (record: any, index: number) => {
    if (record.id) {
      return record.id.toString();
    } else {
      return index.toString();
    }
  };

  const getPriceInfo = (record: any, index: number) => {
    if (record.price) {
      return record.price;
    } else {
      return "";
    }
  };

  const getSubscription = (record: any, index: number) => {
    if (record.subscription) {
      return record.subscription;
    } else {
      return "";
    }
  };
  const getCreatedAt = (record: any, index: number) => {
    if (record.createdAt) {
      const date = dayjs(record.createdAt);
      const monthName = date.format("MMMM");
      return `${monthName} ${date.format("DD")}, ${date.format(
        "YYYY"
      )} ${date.format("h:mm A")}`;
    } else {
      return "";
    }
  };

  const dataSource = priceAndPlanData.data.map((record: any, index: number) => {
    return {
      ...record,
      key: getPriceId(record, index),
      title: getSubscription(record, index),
      price: getPriceInfo(record, index),
      createdAt: getCreatedAt(record, index),
    };
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "Subscription",
      dataIndex: "subscription",
      key: "subscription",
      width: "30%",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      width: "15%",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "15%",
      sorter: (a, b) => {
        if (a.price < b.price) {
          return -1;
        }
        if (a.price > b.price) {
          return 1;
        }
        return 0;
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => {
        if (a.createdAt < b.createdAt) {
          return -1;
        }
        if (a.createdAt > b.createdAt) {
          return 1;
        }
        return 0;
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link href={`/admin/price-and-plan/edit/${record.id}`}>Edit</Link>
          <a
            onClick={() => {
              Modal.confirm({
                title: "Confirm",
                icon: <ExclamationCircleOutlined />,
                content: `Are you sure you want to delete " ${record.subscription} " ?`,
                okText: "Delete",
                cancelText: "Cancel",
                onOk: () => handleDelete(record),
              });
            }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ margin: "0 4% 5%" }}>
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
        ]}
      />
      <h3
        style={{
          textAlign: "center",
          fontSize: "1.5em",
          color: "#545EE1",
          margin: "3% 0",
        }}
      >
        PRICE AND PLAN LIST
      </h3>
      <Table columns={columns} dataSource={dataSource} pagination={false} />
    </div>
  );
};

const queryClient = new QueryClient();

const SeePriceAndPlanMenuWithQueryClient = () => (
  <QueryClientProvider client={queryClient}>
    <SeePriceAndPlanAndOperation />
  </QueryClientProvider>
);

export default SeePriceAndPlanMenuWithQueryClient;
