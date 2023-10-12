"use client";
import { Row } from "antd";

const ErrorPage: React.FC = () => (
  <Row
    justify="center"
    align="middle"
    style={{
      height: "100vh",
    }}
  >
    <h3 style={{ fontWeight: "600", fontSize: "35px", color: "red" }}>
      SOMETHING WENT WRONG !!
    </h3>
  </Row>
);

export default ErrorPage;
