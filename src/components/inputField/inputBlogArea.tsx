import React, { useState } from "react";
import { Input, Form } from "antd";
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

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

const InputBlogArea = ({

  label,
  name,
  required,
  message,
}: InputTextAreaProps) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const getDescriptionAsText = () => {
    const contentState = editorState.getCurrentContent();
    const contentStateAsText = JSON.stringify(convertToRaw(contentState));
    return contentStateAsText;
  };

  const onEditorStateChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  return (
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
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
        />
      </Form.Item>
    </>
  );
};

export default InputBlogArea;
