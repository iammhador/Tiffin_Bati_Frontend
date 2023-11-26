"use client";

import { Row } from "antd";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: "100vh",
      }}
    >
      <h3 style={{ fontWeight: "600", fontSize: "30px" }}>
        404! PAGE NOT FOUND!!
        <br />
        <Link href="/" >
          <p
            
            style={{ textAlign: "center", margin: "0 auto", color: "#545EE1" }}
          >
            GO TO HOME
          </p>
        </Link>
      </h3>
    </Row>
  );
};

export default NotFoundPage;
