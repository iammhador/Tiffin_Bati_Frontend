"use client";

import { Layout } from "antd";
// import BreadCrumb from "../forms/breadCrumb";
import Header from "./header";
import FooterPage from "./footer";
const { Content } = Layout;

const Contents = ({ children }: { children: React.ReactNode }) => {
  return (
    <Content style={{ minHeight: "100vh", color: "rebeccapurple" }}>
      <Header />
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
      <FooterPage />
    </Content>
  );
};

export default Contents;
