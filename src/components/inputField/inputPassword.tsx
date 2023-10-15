import { Form, Input } from "antd";

type InputItemType = {
  label: string;
  name: string;
  required?: boolean;
  message?: string;
  size?: string;
  type: string;
  placeholder?: string;
};

const InputPassword = ({
  label,
  name,
  required,
  message,
  type,
  placeholder,
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
        <Input.Password size="large" type={type} placeholder={placeholder} />
      </Form.Item>
    </div>
  );
};

export default InputPassword;
