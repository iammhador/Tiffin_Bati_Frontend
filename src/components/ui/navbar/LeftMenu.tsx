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
        <Menu.Item key="explore">
          <Link href="/menu">Menu</Link>
        </Menu.Item>
        <Menu.Item key="features">
          <Link href="up-coming-menu">Up-Coming Menu</Link>
        </Menu.Item>
        {!authToken && (
          <div>
            <Menu.Item key="about">
              <Link href="register">Register</Link>
            </Menu.Item>
            <Menu.Item key="contact">
              <Link href="login">Login</Link>
            </Menu.Item>
          </div>
        )}
      </Menu>
    </div>
  );
};

export default dynamic(() => Promise.resolve(LeftMenu), { ssr: false });
