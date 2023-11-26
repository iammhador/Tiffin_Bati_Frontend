"use client";
// Import necessary dependencies and components

import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";
import Loading from "../loading";
import { Button, Card, Col, Divider, Row, Space, Typography } from "antd";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import { useState } from "react";
import Navbar from "@/components/ui/navbar";
import FooterPage from "@/components/ui/footer";
import dynamic from "next/dynamic";
import Title from "antd/lib/typography/Title";
import Paragraph from "antd/lib/typography/Paragraph";
import BlogImage from "../assets/blog/pexels-pixabay-461198.jpg";
import Image from "next/image";

interface IBlog {
  id: string;
  title: string;
  description: string;
  image: string; // Add image property
}

interface ILikes {
  [key: string]: number;
}

const BlogPage = () => {
  const [likes, setLikes] = useState<ILikes>({});
  const [dislikes, setDislikes] = useState<ILikes>({});

  const {
    isLoading,
    error,
    data: blogData,
    refetch,
  } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_TIFFIN_BATI}/blog`)
        .then((res) => res.data),
    refetchInterval: 6000,
  });
  refetch();

  if (isLoading) return <Loading />;
  if (error) return "An error has occurred: " + error;

  const handleLike = (id: any) => {
    setLikes({ ...likes, [id]: (likes[id] || 0) + 1 });
  };

  const handleDislike = (id: any) => {
    setDislikes({ ...dislikes, [id]: (dislikes[id] || 0) + 1 });
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px", margin: "4% 4%" }}>
        <Row gutter={[16, 16]}>
          {blogData?.data?.map((blog: IBlog, index: any) => (
            <Col key={index} xs={24} sm={12} md={12} lg={8} xl={8}>
              <div
                style={{
                  marginBottom: "16px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                <div className="ant-card-cover">
                  <Image
                    src={BlogImage}
                    alt="profile"
                    objectFit="cover"
                    layout="responsive"
                    width={340}
                    height={200}
                  />
                </div>
                <div style={{ padding: "16px" }}>
                  <Typography>
                    <Title
                      level={3}
                      style={{
                        marginBottom: "12px",
                        color: "#000",
                        fontSize: "20px",
                      }}
                    >
                      {blog.title.split(" ").slice(0, 3).join(" ")} ...
                    </Title>
                    <Paragraph style={{ color: "rgba(0,0,0,0.8)" }}>
                      {blog.description.split(" ").slice(0, 15).join(" ")} ...
                    </Paragraph>
                    <Divider
                      style={{ margin: "12px 0", borderColor: "#f0f2f5" }}
                    />
                    <Space direction="horizontal" wrap>
                      <Button type="text" onClick={() => handleLike(blog.id)}>
                        <LikeOutlined />
                        <span style={{ marginLeft: "8px" }}>
                          {likes[blog.id] || 0}
                        </span>
                      </Button>
                      <Button
                        type="text"
                        danger
                        onClick={() => handleDislike(blog.id)}
                      >
                        <DislikeOutlined />
                        <span style={{ marginLeft: "8px" }}>
                          {dislikes[blog.id] || 0}
                        </span>
                      </Button>
                    </Space>
                  </Typography>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <FooterPage />
    </div>
  );
};

const queryClient = new QueryClient();

const BlogPageWithQueryClient = () => (
  <QueryClientProvider client={queryClient}>
    <BlogPage />
  </QueryClientProvider>
);

export default dynamic(() => Promise.resolve(BlogPageWithQueryClient), {
  ssr: false,
});
