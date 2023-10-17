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
  username: string;
  createdAt: string;
}

type DataIndex = keyof DataType;

const SeeAllUsersAndOperation = () => {
  //@ Fetch All Users =>
  const {
    isLoading,
    error,
    data: userData,
    refetch,
  } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios.get("http://localhost:5000/api/v1/users").then((res) => res.data),
  });

  console.log(userData);

  if (isLoading) return <Loading />;
  if (error) {
    return message.error("An error has occurred: " + error);
  }

  const handleDelete = async (user: DataType) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/users/${user.id}`
      );
      if (response) {
        message.success("User deleted successfully", response.data);
      }
      refetch();
    } catch (error) {
      message.error("Error deleting user" + error);
    }
  };

  const getUserId = (record: any, index: number) => {
    if (record.id) {
      return record.id.toString();
    } else {
      return index.toString();
    }
  };

  const getUsername = (record: any, index: number) => {
    if (record.username) {
      return record.username;
    } else {
      return "";
    }
  };

  const getCreatedAt = (record: any, index: number) => {
    if (record.createdAt) {
      return dayjs(record.createdAt).format("YYYY-MM-DD");
    } else {
      return "";
    }
  };

  const dataSource = userData.data.map((record: any, index: number) => {
    return {
      ...record,
      key: getUserId(record, index),
      username: getUsername(record, index),
      createdAt: getCreatedAt(record, index),
    };
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "25%",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: "15%",
    },
    {
      title: "ContactNo",
      dataIndex: "contactNo",
      key: "contactNo",
      width: "15%",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
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
          <Link href={`/admin/manage-user/edit/${record.id}`}>Edit</Link>
          <a
            onClick={() => {
              Modal.confirm({
                title: "Confirm",
                icon: <ExclamationCircleOutlined />,
                content: `Are you sure you want to delete " ${record.username} " ?`,
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
        ALL USERS
      </h3>
      <Table columns={columns} dataSource={dataSource} pagination={false} />
    </div>
  );
};

const queryClient = new QueryClient();

const SeeAllUsersWithQueryClient = () => (
  <QueryClientProvider client={queryClient}>
    <SeeAllUsersAndOperation />
  </QueryClientProvider>
);

export default SeeAllUsersWithQueryClient;
