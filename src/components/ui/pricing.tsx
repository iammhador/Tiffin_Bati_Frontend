"use client";

import { Card, Col, Row } from "antd";
import { CheckOutlined } from "@ant-design/icons";

const PricingPage = () => {
  return (
    <div style={{ margin: "3% 4%" }}>
      <div
        style={{
          margin: "3rem 0",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            margin: "1rem 0",
            fontSize: "2rem",
            fontWeight: "600",
            color: "#545EE1",
            textTransform: "uppercase",
          }}
        >
          Subscription
        </h1>
      </div>

      <Row>
        <Col
          sm={18}
          md={14}
          style={{
            maxWidth: "2xl",
            padding: "12px 16px",
            margin: "auto",
            border: "1px solid #1890ff",
            cursor: "pointer",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <CheckOutlined style={{ fontSize: "24px", color: "#545EE1" }} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginLeft: "5px",
              }}
            >
              <p
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "500",
                  color: "#434343",
                  textTransform: "capitalize",
                }}
              >
                Monthly
              </p>

              <div
                style={{
                  padding: "2px",
                  fontSize: "0.875rem",
                  color: "#F76F01",
                  backgroundColor: "#F5F4F9",
                  borderRadius: "full",
                }}
              >
                Save 5%
              </div>
            </div>
          </div>

          <div>
            <p
              style={{
                fontSize: "1.2rem",
                fontWeight: "600",
                color: "#545EE1",
              }}
            >
              lunch & dinner
            </p>
          </div>

          <div>
            <p
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "#F76F01",
              }}
            >
              ৳5,699{" "}
            </p>
          </div>
        </Col>

        <Col
          xs={18}
          md={14}
          style={{
            maxWidth: "2xl",
            padding: "12px 16px",
            margin: "auto",
            border: "1px solid #1890ff",
            cursor: "pointer",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <CheckOutlined style={{ fontSize: "24px", color: "#545EE1" }} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginLeft: "5px",
              }}
            >
              <p
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "500",
                  color: "#434343",
                  textTransform: "capitalize",
                }}
              >
                Yearly
              </p>

              <div
                style={{
                  padding: "2px",
                  fontSize: "0.875rem",
                  color: "#F76F01",
                  backgroundColor: "#F5F4F9",
                  borderRadius: "full",
                }}
              >
                Save 15%
              </div>
            </div>
          </div>

          <div>
            <p
              style={{
                fontSize: "1.2rem",
                fontWeight: "600",
                color: "#545EE1",
              }}
            >
              lunch & dinner
            </p>
          </div>

          <div>
            <p
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "#F76F01",
              }}
            >
              ৳61,199{" "}
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PricingPage;
