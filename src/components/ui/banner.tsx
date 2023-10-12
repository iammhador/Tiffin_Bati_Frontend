"use client";

import { Col, Row } from "antd";
import banner from "../../app/assets/banner.png";
import Image from "next/image";
import {
  FacebookFilled,
  InstagramFilled,
  YoutubeFilled,
} from "@ant-design/icons";
import Link from "next/link";

const BannerPage = () => {
  return (
    <Row style={{ minHeight: "100vh" }}>
      <Col
        xs={24}
        sm={24}
        md={12}
        lg={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignSelf: "center",
          padding: "0% 4%",
        }}
      >
        <div>
          <h2 style={{ marginBottom: "10px" }}>
            <span
              style={{
                color: "#F76F01",
                fontSize: "32px",
                fontWeight: "700",
                textTransform: "uppercase",
              }}
            >
              Fresh Bites.
            </span>
            <br />
            <span
              style={{
                color: "#313416",
                fontSize: "22px",
                fontWeight: "500",
              }}
            >
              Homemade Flavors at Your Doorstep.
            </span>
          </h2>
          <p style={{ marginBottom: "15px" }}>
            Taste the Difference: Home-Cooked Flavors, On Your Plate. Experience
            the joy of savory, homemade meals prepared with love and care. Our
            skilled chefs craft each dish with the freshest ingredients,
            ensuring a burst of delightful flavors in every bite. Say goodbye to
            bland, fast food and savor the warmth of home-cooked goodness
            delivered to your doorstep. Join us in a culinary journey that is
            healthy, convenient, and budget-friendly. It is time to relish the
            true taste of home.
          </p>

          <div style={{}}>
            <Link href="https://www.facebook.com/tiffin-bati">
              <FacebookFilled
                style={{
                  fontSize: "35px",
                  fontWeight: "400",
                  marginRight: "10px",
                  color: "#313416",
                }}
              />
            </Link>
            <Link href="https://www.instagram.com/tiffin-bati">
              <InstagramFilled
                style={{
                  fontSize: "35px",
                  fontWeight: "400",
                  marginRight: "10px",
                  color: "#313416",
                }}
              />
            </Link>
            <Link href="https://www.youtube.com/tiffin-bati">
              <YoutubeFilled
                style={{
                  fontSize: "35px",
                  fontWeight: "400",
                  marginRight: "10px",
                  color: "#313416",
                }}
              />
            </Link>
          </div>
        </div>
      </Col>

      <Col
        xs={24}
        sm={24}
        md={12}
        lg={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <Image src={banner} width={450} height={450} alt="Tiffin Bati Banner" />
      </Col>
    </Row>
  );
};

export default BannerPage;
