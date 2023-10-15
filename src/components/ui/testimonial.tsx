"use client";

import { Row, Col } from "antd";
import sadmanSadik from "../../app/assets/testimonials/sadman-sadik.png";
import anisulIslam from "../../app/assets/testimonials/anisul-islam.jpg";
import jubaeTalukder from "../../app/assets/testimonials/jubae-talukder.png";

import Image from "next/image";

const TestimonialsPage = () => {
  const testimonialsInformation = [
    {
      description:
        "I signed up for the monthly service pack, and I must say, the home-cooked meals are both delicious and nutritious. It's a game-changer for students like me!",
      userName: "Sadman Sadik",
      userProfession: "Student",
      profilePicture: (
        <Image
          style={{
            width: "4rem",
            height: "4rem",
            marginBottom: "0.5rem",
            marginTop: "-4rem",
            borderRadius: "50%",
            objectPosition: "center",
            objectFit: "cover",
          }}
          src={sadmanSadik}
          width={100}
          height={100}
          alt="Anisul Islam"
        />
      ),
    },
    {
      description:
        "As a working professional, I needed a convenient and cost-effective solution for my daily meals. This service has been a lifesaver. The food is great, and it's so convenient.",
      userName: "Jubaer talukder",
      userProfession: "Photographer",
      profilePicture: (
        <Image
          style={{
            width: "4rem",
            height: "4rem",
            marginBottom: "0.5rem",
            marginTop: "-4rem",
            borderRadius: "50%",
            objectPosition: "center",
            objectFit: "cover",
          }}
          src={jubaeTalukder}
          width={100}
          height={100}
          alt="jubaer talukder"
        />
      ),
    },
    {
      description:
        "For someone always on the go, finding time to cook healthy meals was a challenge. With this service, I've found an easy way to maintain a healthy diet without the hassle.",
      userName: "Anisul Islam",
      userProfession: "Teacher",
      profilePicture: (
        <Image
          style={{
            width: "4rem",
            height: "4rem",
            marginBottom: "0.5rem",
            marginTop: "-4rem",
            borderRadius: "50%",
            objectPosition: "center",
            objectFit: "cover",
          }}
          src={anisulIslam}
          width={100}
          height={100}
          alt="Anisul Islam"
        />
      ),
    },
  ];

  return (
    <Row justify="center" align="middle" style={{ margin: "10% 4%" }}>
      <Col xs={24} style={{ textAlign: "center", margin: "2rem 0" }}>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "600",
            color: "#545EE1",
            textTransform: "uppercase",
          }}
        >
          What our customers are saying about us
        </h1>
      </Col>
      {testimonialsInformation.map((testimonial, i) => {
        return (
          <Col key={i} xs={6} lg={6} sm={12} style={{ margin: "1rem" }}>
            <div style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
              <div
                style={{
                  background: "#F5F4F9",
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                }}
              >
                <p
                  style={{
                    fontSize: "1rem",
                    textAlign: "center",
                    color: "#313416",
                    padding: "4rem",
                    margin: "0",
                  }}
                >
                  <i>{testimonial?.description}</i>
                </p>
              </div>
              <div
                style={{
                  background: "#F76F01",
                  padding: "1rem",
                  textAlign: "center",
                }}
              >
                {testimonial?.profilePicture}
                <p
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#F5F4F9",
                  }}
                >
                  {testimonial?.userName}
                </p>
                <p
                  style={{
                    textTransform: "uppercase",
                    fontSize: "0.875rem",
                    color: "#445069",
                  }}
                >
                  {testimonial?.userProfession}
                </p>
              </div>
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default TestimonialsPage;
