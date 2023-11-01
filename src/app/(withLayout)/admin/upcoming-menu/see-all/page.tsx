"use client";

import dayjs from "dayjs";
import "dayjs/locale/en";
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

const SeeAllUpcomingMenuAndOperation = () => {
  //@ Fetch All Up-coming Menu =>
  const {
    isLoading,
    error,
    data: newFoodData,
    refetch,
  } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_TIFFIN_BATI}/new-food`)
        .then((res) => res.data),
  });

  if (isLoading) return <Loading />;
  if (error) {
    return message.error("An error has occurred: " + error);
  }

  const handleDelete = async (newFood: DataType) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_TIFFIN_BATI}/new-food/${newFood?.id}`
      );
      if (response) {
        message.success("Up-coming menu deleted successfully", response.data);
      }
      refetch();
    } catch (error) {
      message.error("Error deleting new food" + error);
    }
  };

  const getFoodId = (record: any, index: number) => {
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

  const dataSource = newFoodData.data.map((record: any, index: number) => {
    return {
      ...record,
      key: getFoodId(record, index),
      title: getUsername(record, index),
      createdAt: getCreatedAt(record, index),
    };
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "40%",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "30%",
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
          <Link href={`/admin/upcoming-menu/edit/${record.id}`}>Edit</Link>
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
        UPCOMING MENU LIST
      </h3>
      <Table columns={columns} dataSource={dataSource} pagination={false} />
    </div>
  );
};

const queryClient = new QueryClient();

const SeeAllUpcomingMenuWithQueryClient = () => (
  <QueryClientProvider client={queryClient}>
    <SeeAllUpcomingMenuAndOperation />
  </QueryClientProvider>
);

export default SeeAllUpcomingMenuWithQueryClient;
