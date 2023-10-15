"use client";

import React, { useEffect, useState } from "react";

import { Layout, Menu } from "antd";
import { SidebarItems } from "./sidebarItems";
import { getFromLocalStorage } from "@/app/utils/local-storage";
import jwtDecode from "jwt-decode";
import { decodedToken } from "@/app/utils/jwt";

const { Sider } = Layout;

type TokenInfo = {
  userId: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [userRole, setUserRole] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const authToken = getFromLocalStorage("accessToken");

  useEffect(() => {
    if (authToken) {
      const tokenInfo = decodedToken(authToken as string) as TokenInfo;
      const { role, name } = tokenInfo;
      setUserRole(role);
      setUsername(name);
    }
  }, [authToken]);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div
        style={{
          color: "white",
          fontSize: "2rem",
          textAlign: "center",
          fontWeight: "bold",
          margin: "1rem 0",
        }}
      >
        <p
          style={{
            color: "#F76F01",
            margin: "25px 0",
            textTransform: "uppercase",
            textDecoration: "underline",
            fontSize: "1rem",
          }}
        >
          {username ? username : "Anonymous"}
        </p>
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={SidebarItems(userRole)}
      />
    </Sider>
  );
};

export default Sidebar;
