"use client";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import Loading from "../loading";

const MenuPage = () => {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios.get("http://localhost:5000/api/v1/menu").then((res) => res.data),
  });

  if (isLoading) return <Loading />;

  if (error) return "An error has occurred: " + error;

  return (
    <div>
      <h1>Data</h1>
    </div>
  );
};

const queryClient = new QueryClient();

const MenuPageWithQueryClient = () => (
  <QueryClientProvider client={queryClient}>
    <MenuPage />
  </QueryClientProvider>
);

export default MenuPageWithQueryClient;
