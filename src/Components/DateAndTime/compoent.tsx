import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Text, View } from "react-native";
import { PoppinsRegular } from "@/constants/fonts";

interface CustomDateTimePickerProps {
  title?: string;
  error?: string;
  selectedDate?: Date | null;
  width?: string;
  onDateChange?: (date: Date | null) => void;
  showTime?: boolean;
}

const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = ({
  title = "Select Date & Time",
  error = "",
  selectedDate = null,
  width = "94.2%",
  onDateChange = () => {},
  showTime = true,
}) => {
  const handleDateChange = (date: Date | null) => {
    onDateChange(date);
  };

  return (
    <View style={{}}>
      <div className="picker-header">
        <View style={{}}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "400",
              marginBottom: 4,
              fontFamily: PoppinsRegular,
              color: "#000",
            }}
          >
            {title}
          </Text>
        </View>
      </div>

      <View style={{}}>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          showTimeSelect={showTime}
          timeIntervals={15}
          dateFormat={showTime ? "Pp" : "yyyy-MM-dd"}
          className="custom-date-picker"
          calendarClassName="custom-calendar"
          placeholderText="Select date and time"
          showPopperArrow={false}
          isClearable
          todayButton="Today"
          dropdownMode="select"
          timeCaption="Time"
          shouldCloseOnSelect={true}
        />
      </View>

      {error && <Text style={{ color: "red", marginTop: 4 }}>{error}</Text>}

      <style jsx global>{`
        .custom-date-picker {
          padding: 10px 10px;
          font-size: 14px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          width: ${width};
          color: #111827;
          background-color: #fff;
        }

        .custom-calendar {
          border-radius: 12px;
          margin: -20px 100px -5px -5px;
          border: 1px solid #e5e7eb;
          font-family: inherit;
        }

        .react-datepicker__month-container {
          padding: 12px;
        }

        .react-datepicker__header {
          background-color: #6366f1;
          color: white;
          padding: -12px -12px;
          border-radius: 0;
        }

        .react-datepicker__current-month {
          font-size: 14px;
          margin-bottom: 8px;
        }

        .react-datepicker__day-names {
          display: flex;
          justify-content: space-between;
          margin: 8px 0;
        }

        .react-datepicker__day-name {
          color: white;
          font-weight: 500;
          font-size: 12px;
        }

        .react-datepicker__month {
          margin: 0;
        }

        .react-datepicker__week {
          display: flex;
          justify-content: space-between;
          margin: 4px 0;
        }

        .react-datepicker__day {
          color: #111827;
          font-size: 13px;
          border-radius: 50%;
          margin: 0;
        }

        .react-datepicker__day:hover {
          background-color: #e5e7eb;
        }

        .react-datepicker__day--selected,
        .react-datepicker__day--keyboard-selected {
          background-color: #6366f1;
          color: white;
        }

        .react-datepicker__day--today {
          font-weight: bold;
          color: #6366f1;
          background-color: #e0e7ff;
        }

        .react-datepicker__day--outside-month {
          color: #9ca3af;
          opacity: 0.6;
        }

        .react-datepicker__navigation--previous {
          left: 10px;
          top: 14px;
        }

        .react-datepicker__navigation--next {
          right: 12px;
          top: 14px;
          border-left-color: white;
        }

        .react-datepicker__time-container {
          border-left: 1px solid #e5e7eb;
        }

        .react-datepicker__time {
          height: 100%;
          flex-direction: column;
        }

        .react-datepicker__time-list {
          padding: 8px 0;
          height: 100%;
        }

        .react-datepicker__time-list-item {
          padding: 8px 16px;
          font-size: 13px;
          text-align: center;
        }

        .react-datepicker__time-list-item:hover {
          background-color: #f3f4f6;
        }

        .react-datepicker__time-list-item--selected {
          background-color: #6366f1 !important;
          color: white;
          font-weight: 600;
        }

        .react-datepicker__today-button {
          background: #f9fafb;
          border-top: 1px solid #e5e7eb;
          color: #6366f1;
          font-weight: 500;
          font-size: 13px;
          cursor: pointer;
        }

        .custom-popper {
          z-index: 100;
          padding-top: 8px;
        }
      `}</style>
    </View>
  );
};

export default CustomDateTimePicker;
