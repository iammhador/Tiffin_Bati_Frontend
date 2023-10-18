import React, { useState, useEffect } from "react";
import { Menu, Avatar, message, Button } from "antd";
import { UserOutlined, CodeOutlined, LogoutOutlined } from "@ant-design/icons";
import styles from "./navbar.module.css";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
} from "@/app/utils/local-storage";
import { useRouter } from "next/navigation";
import { decodedToken } from "@/app/utils/jwt";
import { TokenInfo } from "@/app/constants/global";
import Link from "next/link";

interface RightMenuProps {
  mode: "horizontal" | "inline" | "vertical" | undefined;
}

const RightMenu: React.FC<RightMenuProps> = ({ mode }) => {
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
      const tokenDecode = decodedToken(authToken as string) as TokenInfo;
      console.log(tokenDecode);
      const { role } = tokenDecode;
      setUserRole(role);
    }
  }, [authToken]);

  return (
    <div>
      <Menu mode={mode}>
        <Menu.SubMenu
          title={
            <>
              <Avatar icon={<UserOutlined />} />
              <span className={styles.username}>John Doe</span>
            </>
          }
        >
          <Menu.Item key="about-us">
            <Link href={`${userRole}`}>
              <UserOutlined /> Profile
            </Link>
          </Menu.Item>
          <Menu.Item key="log-out" onClick={handleLogOut}>
            <LogoutOutlined /> Logout
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
};

export default RightMenu;
