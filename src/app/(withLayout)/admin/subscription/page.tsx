"use client";

import dayjs from "dayjs";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Space, Table, message, Modal, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import Loading from "@/app/loading";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

interface DataType {
  id: string;
  username: string;
  contactNo: string;
  status: string;
  price: string;
  createdAt: string;
}

type DataIndex = keyof DataType;

const SeeAllSubAndStatusUpdate = () => {
  //@ Fetch All Price And plan =>
  const {
    isLoading,
    error,
    data: subData,
    refetch,
  } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_TIFFIN_BATI}/subscription`)
        .then((res) => res.data),
  });
  refetch();
  if (isLoading) return <Loading />;
  if (error) {
    return message.error("An error has occurred: " + error);
  }

  const handleUpdateStatus = async (values: DataType) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_TIFFIN_BATI}/subscription/${values?.id}`,
        {
          status: "ACTIVATE",
        }
      );
      if (response) {
        message.success(
          `${values.username} subscription activated`,
          response.data
        );
      }
      refetch();
    } catch (error) {
      message.error("Error activating subscription" + error);
    }
  };

  const getSubId = (record: any, index: number) => {
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

  const getUsername = (record: any, index: number) => {
    if (record?.user?.username) {
      return record?.user?.username;
    } else {
      return "";
    }
  };

  const getContactNo = (record: any, index: number) => {
    if (record?.user?.contactNo) {
      return record?.user?.contactNo;
    } else {
      return "";
    }
  };

  const getStatus = (record: any, index: number) => {
    if (record.status) {
      return record.status;
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

  const dataSource = subData.data.map((record: any, index: number) => {
    return {
      ...record,
      key: getSubId(record, index),
      username: getUsername(record, index),
      contactNo: getContactNo(record, index),
      price: getPriceInfo(record, index),
      status: getStatus(record, index),
      createdAt: getCreatedAt(record, index),
    };
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: "15%",
    },
    {
      title: "Contact No",
      dataIndex: "contactNo",
      key: "contactNo",
      width: "15%",
    },
    {
      title: "Subscription",
      dataIndex: "subscription",
      key: "subscription",
      width: "15%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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
          {record?.status === "REQUESTED" && (
            <Button
              type="primary"
              style={{ background: "#545EE1" }}
              onClick={() => {
                Modal.confirm({
                  title: "Confirm",
                  icon: <ExclamationCircleOutlined />,
                  content: `Are you sure you want to activate " ${record.username} " subscription?`,
                  okText: "ACTIVATE",
                  cancelText: "Cancel",
                  onOk: () => handleUpdateStatus(record),
                });
              }}
            >
              ACTIVATE
            </Button>
          )}
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
        ALL SUBSCRIPTION
      </h3>
      <Table columns={columns} dataSource={dataSource} pagination={false} />
    </div>
  );
};

const queryClient = new QueryClient();

const SeeSubscriptionWithQueryClient = () => (
  <QueryClientProvider client={queryClient}>
    <SeeAllSubAndStatusUpdate />
  </QueryClientProvider>
);

export default SeeSubscriptionWithQueryClient;
