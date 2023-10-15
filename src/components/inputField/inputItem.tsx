import { Form, Input } from "antd";

type InputItemType = {
  label: string;
  name: string;
  required?: boolean;
  message?: string;
  size?: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
};

const InputItem = ({
  label,
  name,
  required,
  message,
  type,
  placeholder,
  defaultValue,
}: InputItemType): React.ReactElement<any, any> => {
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
        <Input
          size="large"
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
      </Form.Item>
    </div>
  );
};

export default InputItem;
