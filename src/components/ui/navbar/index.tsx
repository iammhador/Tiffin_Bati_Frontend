import React, { useState, useEffect } from "react";
import { Layout, Button, Drawer } from "antd";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { MenuOutlined } from "@ant-design/icons";
import styles from "./navbar.module.css";
import Image from "next/image";
import logo from "../../../app/assets/logo.png";
import Link from "next/link";
const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(!visible);
  };

  return (
    <nav className="navbar">
      <Layout>
        <Layout.Header className={styles.navHeader}>
          <Link href="/">
            <div className={styles.logo}>
              <Image src={logo} width={50} height={50} alt="logo" />
              <h3 className={styles.brandFont}>Tiffin Bati</h3>
            </div>
          </Link>
          <div className={styles.navbarMenu}>
            <div className={styles.leftMenu}>
              <LeftMenu mode={"horizontal"} />
            </div>

            <Button
              className={styles.menuButton}
              type="text"
              onClick={showDrawer}
            >
              <MenuOutlined />
            </Button>
            <div className={styles.rightMenu}>
              <RightMenu mode={"horizontal"} />
            </div>

            <Drawer
              visible={visible}
              title={"Brand Here"}
              placement="right"
              closable={true}
              onClose={showDrawer}
              style={{ zIndex: 99999 }}
            >
              <LeftMenu mode={"inline"} />
              <RightMenu mode={"inline"} />
            </Drawer>
          </div>
        </Layout.Header>
      </Layout>
    </nav>
  );
};

export default Navbar;
