import { DatePicker, Form } from "antd";
import dayjs from "dayjs";

type InputDatePickerProps = {
  handleDateChange: (date: dayjs.ConfigType, dateString: string) => void;
};

const InputDatePicker = ({ handleDateChange }: InputDatePickerProps) => {
  const dateFormat = "YYYY/MM/DD";

  return (
    <div style={{ margin: "0 4px" }}>
      <Form.Item
        label="date of birth"
        name="dateOfBirth"
        rules={[
          {
            required: true,
            message: "date of birth is required",
          },
        ]}
      >
        <DatePicker
          // defaultValue={
          //   defaultValue ? defaultValue : dayjs("2023/10/10", dateFormat)
          // }
          defaultValue={dayjs("2023/10/10", dateFormat)}
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
