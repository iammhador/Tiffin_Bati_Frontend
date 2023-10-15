import { Select, Form } from "antd";

type InputDropdown = {
  label: string;
  name: string;
  required?: boolean;
  message?: string;
  size?: string;
  placeholder?: string;
};

const InputDropdown = ({
  label,
  name,
  required,
  message,
  placeholder,
}: InputDropdown) => {
  const options = [
    { label: "male", value: "male" },
    { label: "female", value: "female" },
    { label: "others", value: "others" },
  ];
  return (
    <div style={{ margin: "0 4px" }}>
      <Form.Item
        label={label}
        name={name}
        rules={[
          {
            required: required,
            message: message,
          },
        ]}
      >
        <Select
          size="large"
          style={{ width: "100%" }}
          options={options}
          placeholder={placeholder}
        />
      </Form.Item>
    </div>
  );
};

export default InputDropdown;
