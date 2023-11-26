import React from "react";
import { Menu } from "antd";
import { getFromLocalStorage } from "@/app/utils/local-storage";
import Link from "next/link";
import dynamic from "next/dynamic";

interface LeftMenuProps {
  mode: "horizontal" | "inline" | "vertical" | undefined;
}

const LeftMenu: React.FC<LeftMenuProps> = ({ mode }) => {
  const authToken = getFromLocalStorage("accessToken");
  return (
    <div>
      <Menu mode={mode}>
        <Menu.Item key="menu">
          <Link href="/menu">Menu</Link>
        </Menu.Item>
        <Menu.Item key="up-coming-menu">
          <Link href="/up-coming-menu">Up-Coming Menu</Link>
        </Menu.Item>
        <Menu.Item key="blog">
          <Link href="/blog">Blog</Link>
        </Menu.Item>
        {!authToken && (
          <>
            <Menu.Item key="register">
              <Link href="/register">Register</Link>
            </Menu.Item>
            <Menu.Item key="login">
              <Link href="/login">Login</Link>
            </Menu.Item>
          </>
        )}
      </Menu>
    </div>
  );
};

export default dynamic(() => Promise.resolve(LeftMenu), { ssr: false });
