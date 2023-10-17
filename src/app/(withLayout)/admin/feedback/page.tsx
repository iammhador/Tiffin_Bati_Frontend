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

interface DataType {
  id: string;
  subject: string;
  createdAt: string;
}

type DataIndex = keyof DataType;

const SeeFeedbackAndOperation = () => {
  //@ Fetch All Blog =>
  const {
    isLoading,
    error,
    data: feedbackData,
    refetch,
  } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get("http://localhost:5000/api/v1/feedback")
        .then((res) => res.data),
  });

  if (isLoading) return <Loading />;
  if (error) {
    return message.error("An error has occurred: " + error);
  }

  const handleDelete = async (record: DataType) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/feedback/${record?.id}`
      );
      if (response) {
        message.success("Feedback Deleted!");
      }
      refetch();
    } catch (error) {
      message.error("Error feedback blog" + error);
    }
  };

  const getFeedbackId = (record: any, index: number) => {
    if (record.id) {
      return record.id.toString();
    } else {
      return index.toString();
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

  const dataSource = feedbackData.data.map((record: any, index: number) => {
    return {
      ...record,
      key: getFeedbackId(record, index),
      createdAt: getCreatedAt(record, index),
    };
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "UserId",
      dataIndex: "userId",
      key: "userId",
      width: "15%",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      width: "20%",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
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
          <a
            onClick={() => {
              Modal.confirm({
                title: "Confirm",
                icon: <ExclamationCircleOutlined />,
                content: `Are you sure you want to delete " ${record.subject} " ?`,
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
      <h3
        style={{
          textAlign: "center",
          fontSize: "1.5em",
          color: "#545EE1",
          margin: "3% 0",
        }}
      >
        BLOG LIST
      </h3>
      <Table columns={columns} dataSource={dataSource} pagination={false} />
    </div>
  );
};

const queryClient = new QueryClient();

const SeeAllFeedbackWithQueryClient = () => (
  <QueryClientProvider client={queryClient}>
    <SeeFeedbackAndOperation />
  </QueryClientProvider>
);

export default SeeAllFeedbackWithQueryClient;
