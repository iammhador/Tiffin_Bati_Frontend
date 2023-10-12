"use client";

import { Row } from "antd";

const NotFoundPage = () => {
  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: "100vh",
      }}
    >
      <h3 style={{ fontWeight: "600", fontSize: "35px" }}>
        404! PAGE NOT FOUND!!
      </h3>
    </Row>
  );
};

export default NotFoundPage;
