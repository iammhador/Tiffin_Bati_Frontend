import React from "react";
import { Input, Form } from "antd";

const { TextArea } = Input;

type InputTextAreaProps = {
  placeholder?: string;
  maxLength?: number;
  rows?: number;
  label: string;
  name: string;
  required?: boolean;
  message?: string;
  size?: string;
  type: string;
  defaultValue?: string;
};

const InputTextArea = ({
  placeholder,
  maxLength,
  rows,
  label,
  name,
  required,
  message,
  defaultValue,
}: InputTextAreaProps) => (
  <>
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
      <TextArea
        rows={rows ? rows : 6}
        placeholder={placeholder}
        maxLength={maxLength ? maxLength : 500}
        size="large"
        defaultValue={defaultValue ? defaultValue : ""}
      />
    </Form.Item>
  </>
);

export default InputTextArea;
