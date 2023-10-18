"use client";
import { Layout, Row, Col, Space } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import logo from "../../app/assets/logo.png";
import Link from "next/link";

const { Footer } = Layout;

const FooterPage = () => {
  return (
    <Footer style={{ backgroundColor: "#F5F4F9", color: "#445069" }}>
      <Row justify="space-between" gutter={[16, 0]}>
        <Col lg={8}>
          <a
            href="#"
            style={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
            }}
          >
            <div>
              <Image src={logo} width={60} height={60} alt="Tiffin Bati Logo" />
            </div>
            <span
              style={{
                alignSelf: "center",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              TIFFIN BATI
            </span>
          </a>
        </Col>
        <Col lg={16} sm={24}>
          <Row gutter={[16, 0]} justify="center">
            <Col span={12} sm={6}>
              <Space direction="vertical">
                <h3 style={{ textTransform: "uppercase", color: "#313416" }}>
                  Product
                </h3>
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <a href="#" style={{ color: "#445069" }}>
                      Features
                    </a>
                  </li>
                  <li style={{ listStyle: "none" }}>
                    <a href="#" style={{ color: "#445069" }}>
                      Integrations
                    </a>
                  </li>
                  <li style={{ listStyle: "none" }}>
                    <a href="#" style={{ color: "#445069" }}>
                      Pricing
                    </a>
                  </li>
                  <li style={{ listStyle: "none" }}>
                    <a href="#" style={{ color: "#445069" }}>
                      FAQ
                    </a>
                  </li>
                </ul>
              </Space>
            </Col>
            <Col span={12} sm={6}>
              <Space direction="vertical">
                <h3 style={{ textTransform: "uppercase", color: "#445069" }}>
                  Company
                </h3>
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <a href="#" style={{ color: "#445069" }}>
                      Privacy
                    </a>
                  </li>
                  <li style={{ listStyle: "none" }}>
                    <a href="#" style={{ color: "#445069" }}>
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </Space>
            </Col>
            <Col span={12} sm={6}>
              <Space direction="vertical">
                <h3 style={{ textTransform: "uppercase", color: "#445069" }}>
                  Developers
                </h3>
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <a href="#" style={{ color: "#445069" }}>
                      Public API
                    </a>
                  </li>
                  <li style={{ listStyle: "none" }}>
                    <a href="#" style={{ color: "#445069" }}>
                      Documentation
                    </a>
                  </li>
                  <li style={{ listStyle: "none" }}>
                    <a href="#" style={{ color: "#445069" }}>
                      Guides
                    </a>
                  </li>
                </ul>
              </Space>
            </Col>
            <Col span={12} sm={6}>
              <Space direction="vertical">
                <h3 style={{ textTransform: "uppercase", color: "#445069" }}>
                  Social media
                </h3>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                  }}
                >
                  <Link
                    href="https://www.facebook.com/tiffin-bati"
                    title="Facebook"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px",
                      fontSize: "25px",
                    }}
                  >
                    <FacebookOutlined style={{ color: "#445069" }} />
                  </Link>
                  <Link
                    href="https://www.instagram.com/tiffin-bati"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px",
                      fontSize: "25px",
                    }}
                  >
                    <TwitterOutlined style={{ color: "#445069" }} />
                  </Link>
                  <Link
                    href="https://www.youtube.com/tiffin-bati"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px",
                      fontSize: "25px",
                    }}
                  >
                    <InstagramOutlined style={{ color: "#445069" }} />
                  </Link>
                </div>
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
      <hr style={{ margin: "20px 0 0 0" }} />
      <div
        style={{
          padding: "24px",
          fontSize: "16px",
          textAlign: "center",
          color: " #545EE1",
        }}
      >
        Copyright © 2023 - All right reserved by Tiffin Bati.
      </div>
    </Footer>
  );
};

export default FooterPage;
