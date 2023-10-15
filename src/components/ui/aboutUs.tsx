"use client";

import React from "react";
import { Row, Col, Card } from "antd";
import Image from "next/image";
import variety from "../../app/assets/aboutUs/variety.png";
import affordability from "../../app/assets/aboutUs/affordability.png";
import convenient from "../../app/assets/aboutUs/convenient.png";
import nutrition from "../../app/assets/aboutUs/nutrition.png";
import homeMade from "../../app/assets/aboutUs/home-made.png";
import delivery from "../../app/assets/aboutUs/delivery-man.png";

function AboutUsPage() {
  const serviceInfo: {
    key: number;
    title: string;
    description: string;
    serviceImage: React.ReactNode | React.ReactElement;
  }[] = [
    {
      key: 1,
      title: "Homemade Delicacies",
      description:
        "Our experienced chefs prepare every meal with love and care, just like  a home-cooked meal should be.",
      serviceImage: (
        <Image src={homeMade} width={50} height={50} alt="Homemade" />
      ),
    },
    {
      key: 2,
      title: "Affordability",
      description:
        "We understand the financial constraints students and bachelors often  face, and we have designed our meal plans to be budget-friendly.",
      serviceImage: (
        <Image src={affordability} width={50} height={50} alt="affordability" />
      ),
    },
    {
      key: 3,
      title: "Variety",
      description:
        "Our menu is diverse, offering a wide range of dishes to suit different  tastes and dietary preferences.",
      serviceImage: (
        <Image src={variety} width={50} height={50} alt="variety" />
      ),
    },

    {
      key: 4,
      title: "Convenience",
      description:
        "We take the hassle out of meal preparation. Simply place your order, and we'll deliver your meals to your doorstep.",
      serviceImage: (
        <Image src={convenient} width={50} height={50} alt="convenient" />
      ),
    },
    {
      key: 5,
      title: "Nutrition",
      description:
        "We prioritize using fresh, wholesome ingredients to ensure that your meals are not only tasty but also nutritious.",
      serviceImage: (
        <Image src={nutrition} width={50} height={50} alt="nutrition" />
      ),
    },
    {
      key: 6,
      title: "Delivery",
      description:
        "We offer rapid delivery services to ensure our customers never go to bed on an empty stomach.",
      serviceImage: (
        <Image src={delivery} width={50} height={50} alt="delivery" />
      ),
    },
  ];
  return (
    <section style={{ margin: "10% 4%" }}>
      <div>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "600",
              color: "#545EE1",
              textTransform: "uppercase",
              marginBottom: "2rem",
            }}
          >
            ABOUT US
          </h1>

          <p style={{ padding: "0 10%" }}>
            Tiffin Bati was born out of a desire to provide students and young
            professionals with a hassle-free solution to their daily food needs.
            We understand that balancing a busy academic or professional life
            can leave little time for cooking, and ordering takeout can be
            expensive and unhealthy. That is why we set out to create a service
            that offers affordable, homemade meals delivered right to your
            doorstep.
          </p>
        </div>

        <Row gutter={[16, 16]} className="mt-8 xl:mt-12 xl:gap-12">
          {serviceInfo?.map((service) => {
            return (
              <Col key={service?.key} xs={24} md={12} xl={8}>
                <Card>
                  {service?.serviceImage}
                  <h1>{service?.title}</h1>
                  <p>{service?.description}</p>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </section>
  );
}

export default AboutUsPage;
