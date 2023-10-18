"use client";

import { Button, message, Modal, Row } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { decodedToken } from "@/app/utils/jwt";
import { getFromLocalStorage } from "@/app/utils/local-storage";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Loading from "@/app/loading";
import { TokenInfo } from "@/app/constants/global";

const SubscriptionPage = () => {
  const [userId, setUserId] = useState<string>("");
  const authToken = getFromLocalStorage("accessToken");

  useEffect(() => {
    if (authToken) {
      const tokenInfo = decodedToken(authToken as string) as TokenInfo;
      const { userId: id } = tokenInfo;
      setUserId(id);
    }
  }, [authToken]);

  //@ Fetch User Subscription =>
  const {
    isLoading,
    error,
    data: userSubData,
    refetch,
  } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      userId &&
      axios
        .get(
          `${process.env.NEXT_PUBLIC_TIFFIN_BATI}/subscription/user/${userId}`
        )
        .then((res) => res.data),
    refetchInterval: 8000,
  });
  refetch();

  if (isLoading) return <Loading />;
  if (error) {
    return message.error("An error has occurred: " + error);
  }

  const cancelSubscription = async (values: any) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_TIFFIN_BATI}/subscription/${values?.data?.id}`,
        {
          status: "CANCEL",
        }
      );
      message.success(
        `${values?.data?.subscription} subscription has been cancelled.`
      );
    } catch (error) {
      message.error("Error occurred:" + error);
    }
  };

  const handleCancel = (record: any) => {
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to cancel the subscription?`,
      okText: "Cancel Subscription",
      cancelText: "Back",
      onOk: () => cancelSubscription(record),
    });
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {userSubData?.data?.status === "REQUESTED" && (
        <p
          style={{
            color: "blueviolet",
            textTransform: "uppercase",
            fontSize: "1.5rem",
            fontWeight: "500",
          }}
        >
          Your subscription is currently under review.....
        </p>
      )}
      {userSubData?.data?.status === "ACTIVATE" && (
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              color: "#545EE1",
              textTransform: "uppercase",
              fontSize: "1.5rem",
              fontWeight: "500",
            }}
          >
            Your subscription is currently active.
          </p>
          <Button
            style={{
              marginTop: "1%",
            }}
            danger
            onClick={() => handleCancel(userSubData)}
          >
            Cancel Subscription
          </Button>
        </div>
      )}
      {userSubData?.data?.status === "CANCEL" && (
        <p
          style={{
            color: "green",
            textTransform: "uppercase",
            fontSize: "1.5rem",
            fontWeight: "500",
          }}
        >
          Your subscription is currently cancelled.
        </p>
      )}
      {!userSubData?.data?.status && (
        <p
          style={{
            color: "red",
            textTransform: "uppercase",
            fontSize: "1.5rem",
            fontWeight: "500",
          }}
        >
          No subscription data found.
        </p>
      )}
    </Row>
  );
};

const queryClient = new QueryClient();

const SeeSubscriptionWithQueryClient = () => (
  <QueryClientProvider client={queryClient}>
    <SubscriptionPage />
  </QueryClientProvider>
);

export default SeeSubscriptionWithQueryClient;
