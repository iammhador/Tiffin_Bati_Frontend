"use client";

import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";
import Loading from "../loading";
import { Button, Card, Divider, Space, Typography } from "antd";
const { Title, Paragraph } = Typography;
import FooterPage from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";
import { useState } from "react";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";

interface IBlog {
  id: string;
  title: string;
  description: string;
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
      <div style={{ padding: "50px", maxWidth: "800px", margin: "auto" }}>
        {blogData?.data?.map((blog: IBlog) => (
          <Card
            key={blog?.id}
            style={{
              marginBottom: "30px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ backgroundColor: "#f0f2f5", padding: "16px" }}>
              <Title
                level={3}
                style={{ marginBottom: "12px", color: "#545EE1" }}
              >
                {blog.title}
              </Title>
              <Paragraph style={{ color: "rgba(0,0,0,0.8)" }}>
                {blog.description}
              </Paragraph>
              <Divider style={{ margin: "12px 0", borderColor: "#f0f2f5" }} />
              <Space>
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
            </div>
          </Card>
        ))}
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
