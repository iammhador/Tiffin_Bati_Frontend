"use client";
import { Row } from "antd";
import { Hourglass } from "react-loader-spinner";

const Loading = () => {
  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={["#545EE1", "#F76F01"]}
      />
    </Row>
  );
};

export default Loading;
