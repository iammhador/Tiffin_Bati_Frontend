"use client";

import { Layout } from "antd";
// import BreadCrumb from "../forms/breadCrumb";
import Navbar from "./navbar";
const { Content } = Layout;

const Contents = ({ children }: { children: React.ReactNode }) => {
  return (
    <Content style={{ minHeight: "100vh", color: "rebeccapurple" }}>
      <Navbar />
      {/* <BreadCrumb
        items={[
          {
            label: `${base}`,
            link: `/${base}`,
          },
          {
            label: "student",
            link: `/${base}/student`,
          },
        ]}
      /> */}
      {children}
    </Content>
  );
};

export default Contents;
