"use client";

import { Row } from "antd";
import { Hourglass } from "react-loader-spinner";

const loading = () => {
  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: "100vh",
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

export default loading;
