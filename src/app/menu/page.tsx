"use client";

import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import Loading from "../loading";
import { Button, Card, Col, Pagination, Row } from "antd";
import Image from "next/image";
import FooterPage from "@/components/ui/footer";
import Link from "next/link";
import Navbar from "@/components/ui/navbar";
import { useDebounced } from "../utils/searchDelay";
import Search from "antd/es/input/Search";
import dynamic from "next/dynamic";

const { Meta } = Card;

const MenuPage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(8);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["searchTerm"] = searchTerm;
  query["page"] = page;
  query["pageSize"] = size;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 500,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_TIFFIN_BATI}/menu`, { params: query })
        .then((res) => res.data),
    refetchInterval: 6000,
  });

  if (isLoading) return <Loading />;

  if (error) return "An error has occurred: " + error;

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const onPaginationChange = (
    currentPage: number,
    pageSize: number | undefined
  ) => {
    const updatedPage = currentPage - 1;
    setPage(updatedPage);
    if (typeof pageSize === "number") {
      setSize(pageSize);
    }
    refetch();
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
    refetch();
  };

  return (
    <div>
      <Navbar />
      <div style={{ margin: "4% 4%" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "600",
            color: "#545EE1",
            textAlign: "center",
            marginBottom: "2%",
          }}
        >
          ALL MENU
        </h2>
        <div style={{ textAlign: "center", margin: "20px 0 40px" }}>
          <Search
            placeholder="input menu search"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 200, marginRight: "10px" }}
          />
          <Button danger onClick={resetFilters}>
            Reset
          </Button>
        </div>

        <Row gutter={[16, 16]}>
          {data?.data?.data.map((item: any) => (
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 8 }}
              lg={{ span: 6 }}
              key={item?.id}
            >
              <Link href={`/menu/details/${item.id}`}>
                <Card
                  hoverable
                  style={{ width: 240, marginBottom: "20px" }}
                  cover={
                    <Image
                      src={item?.image}
                      width={150}
                      height={150}
                      alt={item?.title}
                    />
                  }
                >
                  <Meta title={item?.title} description={item?.category} />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>

      <div style={{ margin: "10px", textAlign: "center" }}>
        <Pagination
          total={data?.data?.meta?.total}
          showTotal={(total) => `Total ${total} items`}
          current={page + 1}
          defaultPageSize={size}
          onChange={onPaginationChange}
        />
      </div>

      <FooterPage />
    </div>
  );
};

const queryClient = new QueryClient();

const MenuPageWithQueryClient = () => (
  <QueryClientProvider client={queryClient}>
    <MenuPage />
  </QueryClientProvider>
);

export default dynamic(() => Promise.resolve(MenuPageWithQueryClient), {
  ssr: false,
});
