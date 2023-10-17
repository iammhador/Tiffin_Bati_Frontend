import { DatePicker, Form } from "antd";
import dayjs from "dayjs";

type InputDatePickerProps = {
  handleDateChange: (date: dayjs.ConfigType, dateString: string) => void;
  required?: boolean;
};

const InputDatePicker = ({
  handleDateChange,
  required,
}: InputDatePickerProps) => {
  const dateFormat = "YYYY/MM/DD";

  return (
    <div style={{ margin: "0 4px" }}>
      <Form.Item
        label="date of birth"
        name="dateOfBirth"
        rules={[
          {
            required: required,
            message: "date of birth is required",
          },
        ]}
      >
        <DatePicker
          defaultValue={dayjs()}
          format={dateFormat}
          size="large"
          style={{ width: "100%" }}
          onChange={handleDateChange}
        />
      </Form.Item>
    </div>
  );
};

export default InputDatePicker;
