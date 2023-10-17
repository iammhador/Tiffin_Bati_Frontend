"use client";

import React, { useState, useEffect } from "react";
import { Button, Layout, Menu, message } from "antd";
import Image from "next/image";
import logo from "../../app/assets/logo.png";
import Link from "next/link";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
} from "@/app/utils/local-storage";
import { useRouter } from "next/navigation";
import { decodedToken } from "@/app/utils/jwt";

type tokenProps = {
  role: string;
};
const { Header } = Layout;

const HeaderPage = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string>("");
  const handleLogOut = () => {
    removeFromLocalStorage("accessToken");
    message.success("User logged out!!");
    router.push("/");
  };

  const authToken = getFromLocalStorage("accessToken");

  useEffect(() => {
    if (authToken) {
      const tokenDecode = decodedToken(authToken as string) as tokenProps;
      const { role } = tokenDecode;
      setUserRole(role);
    }
  }, [authToken]);

  const menuItems = authToken
    ? [
        {
          key: "5",
          label: (
            <Link href="menu">
              <Button
                type="text"
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#545EE1",
                  textTransform: "capitalize",
                }}
              >
                Menu
              </Button>
            </Link>
          ),
        },
        {
          key: "4",
          label: (
            <Link href={`${userRole}`}>
              <Button
                type="text"
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#545EE1",
                  textTransform: "capitalize",
                }}
              >
                {userRole ? userRole : undefined}
              </Button>
            </Link>
          ),
        },
        {
          key: "3",
          label: (
            <Button
              onClick={handleLogOut}
              type="text"
              style={{ fontSize: "16px", fontWeight: "500", color: "#545EE1" }}
            >
              Logout
            </Button>
          ),
        },
      ]
    : [
        {
          key: "6",
          label: (
            <Link href="menu">
              <Button
                type="text"
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#545EE1",
                  textTransform: "capitalize",
                }}
              >
                Menu
              </Button>
            </Link>
          ),
        },
        {
          key: "1",
          label: (
            <Link href="/register">
              <Button
                type="text"
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#545EE1",
                }}
              >
                Register
              </Button>
            </Link>
          ),
        },
        {
          key: "2",
          label: (
            <Link href="/login">
              <Button
                type="text"
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#545EE1",
                }}
              >
                Login
              </Button>
            </Link>
          ),
        },
      ];

  return (
    <Layout className="layout">
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#F5F4F9",
        }}
      >
        <Link href="/">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image src={logo} alt="Tiffin Bati Logo" width={50} height={50} />
            <h2 style={{ color: "#545EE1" }}>TIFFIN BATI</h2>
          </div>
        </Link>
        <Menu
          style={{
            marginLeft: "auto",
            backgroundColor: "#F5F4F9",
            color: "#545EE1",
          }}
          mode="horizontal"
        >
          {menuItems.map((menuItem) => (
            <Menu.Item key={menuItem.key}>{menuItem.label}</Menu.Item>
          ))}
        </Menu>
      </Header>
    </Layout>
  );
};

export default HeaderPage;
