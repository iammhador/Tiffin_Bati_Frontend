/* eslint-disable jsx-a11y/alt-text */
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
import AvatarImage from "../../../../src/app/assets/avatar.png";
import Image from "next/image";
interface RightMenuProps {
  mode: "horizontal" | "inline" | "vertical" | undefined;
}

const RightMenu: React.FC<RightMenuProps> = ({ mode }) => {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const handleLogOut = () => {
    removeFromLocalStorage("accessToken");
    message.success("User logged out!!");
    router.push("/");
  };

  const authToken = getFromLocalStorage("accessToken");

  useEffect(() => {
    if (authToken) {
      const tokenDecode = decodedToken(authToken as string) as TokenInfo;
      const { role, name } = tokenDecode;
      setUserRole(role);
      setUserName(name);
    }
  }, [authToken]);

  return (
    <div>
      {userRole && (
        <Menu mode={mode}>
          <Menu.SubMenu
            title={
              <>
                <Avatar
                  icon={<Image src={AvatarImage} alt="User Avatar" />}
                  className={styles.avatar}
                />
                <span className={styles.username}>{userName}</span>
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
      )}
    </div>
  );
};

export default RightMenu;
