"use client";

import Contents from "@/components/ui/contents";
import Sidebar from "@/components/ui/sidebar";
// import { isLoggedIn } from "@/service/auth.service";
import { Layout } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { getFromLocalStorage } from "../utils/local-storage";
import FooterPage from "@/components/ui/footer";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const userLoggedIn = getFromLocalStorage("accessToken");
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/login");
    }
    setLoading(true);
  }, [router, isLoading, userLoggedIn]);

  if (!isLoading) {
    return <Loading />;
  }

  return (
    <Layout hasSider>
      <Sidebar />
      <Contents>{children}</Contents>
    </Layout>
  );
};

export default DashboardLayout;
