import { Select, Form } from "antd";

type InputDropdown = {
  label: string;
  name: string;
  required?: boolean;
  message?: string;
  size?: string;
  placeholder?: string;
  defaultValue?: string;
  inputOptions?: { label: string; value: string }[];
};

const InputDropdown = ({
  label,
  name,
  required,
  message,
  placeholder,
  defaultValue,
  inputOptions,
}: InputDropdown) => {
  const options = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Others", value: "others" },
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
          options={inputOptions ? inputOptions : options}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
      </Form.Item>
    </div>
  );
};

export default InputDropdown;
