"use client";

import { Col, Row, Card } from "antd";
import Image from "next/image";
import aluBhorrta from "../../app/assets/food/aluVorta.png";
import daal from "../../app/assets/food/daal.png";
import lalShak from "../../app/assets/food/lal-shak.png";
import murgiGosto from "../../app/assets/food/murgi-gosto.png";
import lakkaShutikiBhuna from "../../app/assets/food/lakka-shutiki-bhuna.png";
import tomatoChutne from "../../app/assets/food/tomato-chutney.png";
import pangasMach from "../../app/assets/food/pangas-mach.png";
import mistiKumraVaji from "../../app/assets/food/misti-kumra-vaji.png";
import biriyani from "../../app/assets/food/biriyani.png";
import dimVuna from "../../app/assets/food/dim-vuna.png";
import gajorerHalua from "../../app/assets/food/gajorer-halua.png";

const AvailableService = () => {
  const serviceInfo: {
    key: number;
    title: string;
    image: React.ReactNode | React.ReactElement;
  }[] = [
    {
      key: 1,
      title: "Alu Bhorrta",
      image: (
        <Image
          src={aluBhorrta}
          width={200}
          height={200}
          alt="Alu Bhorrta"
          style={{
            border: "3px solid #F5F4F9",
            borderRadius: "5px",
            padding: "15px",
          }}
        />
      ),
    },
    {
      key: 2,
      title: "Daal",
      image: (
        <Image
          src={daal}
          width={200}
          height={200}
          alt="Daal"
          style={{
            border: "3px solid #F5F4F9",
            borderRadius: "5px",
            padding: "15px",
          }}
        />
      ),
    },
    {
      key: 3,
      title: "Chicken",
      image: (
        <Image
          src={murgiGosto}
          width={200}
          height={200}
          alt="Chicken"
          style={{
            border: "3px solid #F5F4F9",
            borderRadius: "5px",
            padding: "15px",
          }}
        />
      ),
    },
    {
      key: 4,
      title: "Lal Shak",
      image: (
        <Image
          src={lalShak}
          width={200}
          height={200}
          alt="lal Shak"
          style={{
            border: "3px solid #F5F4F9",
            borderRadius: "5px",
            padding: "15px",
          }}
        />
      ),
    },
    {
      key: 5,
      title: "lakka Shutiki Bhuna",
      image: (
        <Image
          src={lakkaShutikiBhuna}
          width={200}
          height={200}
          alt="Lakka Shutiki Bhuna"
          style={{
            border: "3px solid #F5F4F9",
            borderRadius: "5px",
            padding: "15px",
          }}
        />
      ),
    },
    {
      key: 6,
      title: "Tomato Chutne",
      image: (
        <Image
          src={tomatoChutne}
          width={200}
          height={200}
          alt="tomato Chutne"
          style={{
            border: "3px solid #F5F4F9",
            borderRadius: "5px",
            padding: "15px",
          }}
        />
      ),
    },
    {
      key: 7,
      title: "Pangas Mach",
      image: (
        <Image
          src={pangasMach}
          width={200}
          height={200}
          alt="Pangas Mach"
          style={{
            border: "3px solid #F5F4F9",
            borderRadius: "5px",
            padding: "15px",
          }}
        />
      ),
    },
    {
      key: 8,
      title: "Misti KumraVaji",
      image: (
        <Image
          src={mistiKumraVaji}
          width={200}
          height={200}
          alt="Misti KumraVaji"
          style={{
            border: "3px solid #F5F4F9",
            borderRadius: "5px",
            padding: "15px",
          }}
        />
      ),
    },
    {
      key: 9,
      title: "Dim Vuna",
      image: (
        <Image
          src={dimVuna}
          width={200}
          height={200}
          alt="Misti KumraVaji"
          style={{
            border: "3px solid #F5F4F9",
            borderRadius: "5px",
            padding: "15px",
          }}
        />
      ),
    },
    {
      key: 10,
      title: "Biriyani",
      image: (
        <Image
          src={biriyani}
          width={200}
          height={200}
          alt="biriyani"
          style={{
            border: "3px solid #F5F4F9",
            borderRadius: "5px",
            padding: "15px",
          }}
        />
      ),
    },
    {
      key: 11,
      title: "Misti KumraVaji",
      image: (
        <Image
          src={mistiKumraVaji}
          width={200}
          height={200}
          alt="Misti KumraVaji"
          style={{
            border: "3px solid #F5F4F9",
            borderRadius: "5px",
            padding: "15px",
          }}
        />
      ),
    },
    {
      key: 12,
      title: "Gajorer Halua",
      image: (
        <Image
          src={gajorerHalua}
          width={200}
          height={200}
          alt="Gajorer Halua"
          style={{
            border: "3px solid #F5F4F9",
            borderRadius: "5px",
            padding: "15px",
          }}
        />
      ),
    },
  ];
  return (
    <div style={{ margin: "10% 4%" }}>
      <h1
        style={{
          textAlign: "center",
          margin: "3rem 0",
          fontSize: "2rem",
          fontWeight: "600",
          color: "#545EE1",
          textTransform: "uppercase",
        }}
      >
        The meal we are provide
      </h1>

      <Row>
        {serviceInfo?.map((food) => {
          return (
            <Col
              key={food?.key}
              sm={8}
              md={4}
              style={{
                marginBottom: "5",
              }}
            >
              <div
                style={{
                  marginBottom: "20px",
                }}
              >
                {food?.image}
                <p
                  style={{
                    marginTop: "3px",
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#F76F01",
                  }}
                >
                  {food?.title}
                </p>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default AvailableService;
