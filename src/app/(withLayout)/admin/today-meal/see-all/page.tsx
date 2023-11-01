"use client";

import "dayjs/locale/en";
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
  title: string;
  createdAt: string;
}

type DataIndex = keyof DataType;

const SeeAllTodayMealAndOperation = () => {
  //@ Fetch All Today Meal =>
  const {
    isLoading,
    error,
    data: todayMealData,
    refetch,
  } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_TIFFIN_BATI}/today-food`)
        .then((res) => res.data),
  });

  if (isLoading) return <Loading />;
  if (error) {
    return message.error("An error has occurred: " + error);
  }

  const handleDelete = async (todayMeal: DataType) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_TIFFIN_BATI}/today-food/${todayMeal?.id}`
      );
      if (response) {
        message.success("Today meal deleted successfully", response.data);
      }
      refetch();
    } catch (error) {
      message.error("Error deleting today food" + error);
    }
  };

  const getTodayFoodId = (record: any, index: number) => {
    if (record.id) {
      return record.id.toString();
    } else {
      return index.toString();
    }
  };

  const getUsername = (record: any, index: number) => {
    if (record.title) {
      return record.title;
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

  const dataSource = todayMealData.data.map((record: any, index: number) => {
    return {
      ...record,
      key: getTodayFoodId(record, index),
      title: getUsername(record, index),
      createdAt: getCreatedAt(record, index),
    };
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "35%",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "15%",
    },
    {
      title: "Shift",
      dataIndex: "shift",
      key: "shift",
      width: "15%",
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
          <Link href={`/admin/today-meal/edit/${record.id}`}>Edit</Link>
          <a
            onClick={() => {
              Modal.confirm({
                title: "Confirm",
                icon: <ExclamationCircleOutlined />,
                content: `Are you sure you want to delete " ${record.title} " ?`,
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
        TODAY MEAL LIST
      </h3>
      <Table columns={columns} dataSource={dataSource} pagination={false} />
    </div>
  );
};

const queryClient = new QueryClient();

const SeeAllTodayMealWithQueryClient = () => (
  <QueryClientProvider client={queryClient}>
    <SeeAllTodayMealAndOperation />
  </QueryClientProvider>
);

export default SeeAllTodayMealWithQueryClient;
