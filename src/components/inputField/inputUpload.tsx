// InputUpload.tsx
import React from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload, Form } from "antd";

import type { RcFile } from "antd/es/upload/interface";
import Image from "next/image";

type InputUpload = {
  label: string;
  name: string;
  loading?: boolean;
  handleChange: (info: any) => void;
  imageUrl: string | null;
  required?: boolean;
  message?: string;
  size?: string;
  placeholder?: string;
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must be smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const InputUpload = ({
  label,
  name,
  required,
  message,
  imageUrl,
  handleChange,
}: InputUpload) => {
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
        <Upload
          name="profileImage"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              defaultValue={imageUrl}
              alt="profile image"
              width="107"
              height="107"
              style={{
                borderRadius: "16px",
              }}
            />
          ) : (
            <p>Your Photo</p>
          )}
        </Upload>
      </Form.Item>
    </div>
  );
};

export default InputUpload;
