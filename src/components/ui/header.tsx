"use client";

import React from "react";
import { Button, Layout, Menu } from "antd";
import Image from "next/image";
import logo from "../../app/assets/logo.png";
import Link from "next/link";

const { Header } = Layout;

const HeaderPage = () => {
  type menuProps = {
    key: string;
    label: string | React.ReactElement | React.ReactNode;
  }[];

  const menuItems: menuProps = [
    {
      key: "1",
      label: (
        <Link href="/register">
          <Button
            type="text"
            style={{ fontSize: "16px", fontWeight: "500", color: "#545EE1" }}
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
            style={{ fontSize: "16px", fontWeight: "500", color: "#545EE1" }}
          >
            Login
          </Button>
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Button
          type="text"
          style={{ fontSize: "16px", fontWeight: "500", color: "#545EE1" }}
        >
          Logout
        </Button>
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
            <h2
              style={{
                color: "#545EE1",
              }}
            >
              TIFFIN BATI
            </h2>
          </div>
        </Link>
        <Menu
          style={{
            marginLeft: "auto",
            backgroundColor: "#F5F4F9",
            color: "#545EE1",
          }}
          mode="horizontal"
          items={menuItems.map((menuItem) => {
            const key = menuItem?.key;
            return {
              key,
              label: menuItem?.label,
            };
          })}
        />
      </Header>
    </Layout>
  );
};

export default HeaderPage;
