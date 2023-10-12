"use client";

import { Collapse } from "antd";

const items = [
  {
    key: "1",
    label: "What service packages do you offer?",
    children: (
      <p style={{ paddingLeft: 24 }}>
        Learn about our monthly and yearly meal service packages tailored to
        suit your needs and budget.
      </p>
    ),
  },
  {
    key: "2",
    label: "What types of dishes do you provide?",
    children: (
      <p style={{ paddingLeft: 24 }}>
        Explore our diverse menu, including vegetarian, non-vegetarian, and
        special dietary options. We cater to various tastes and preferences.
      </p>
    ),
  },
  {
    key: "3",
    label: "How does the delivery process work?",
    children: (
      <p style={{ paddingLeft: 24 }}>
        Understand our delivery process, schedules, and how we ensure your meals
        are delivered fresh and on time.
      </p>
    ),
  },
  {
    key: "4",
    label: "What quality standards do you maintain?",
    children: (
      <p style={{ paddingLeft: 24 }}>
        Learn about our commitment to using fresh, high-quality ingredients and
        adhering to hygiene and food safety standards.
      </p>
    ),
  },
  {
    key: "5",
    label: "How can I reach your customer support?",
    children: (
      <p style={{ paddingLeft: 24 }}>
        Connect with our customer support team for any inquiries, assistance, or
        to address concerns.
      </p>
    ),
  },
];

const FrequentlyAskQusPage = () => {
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
        Frequently Asked Questions
      </h1>
      <Collapse items={items} size="large" bordered={false} />
    </div>
  );
};

export default FrequentlyAskQusPage;
