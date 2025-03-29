import { PoppinsRegular } from "@/constants/fonts";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { View, Text } from "react-native";

export default function CustomDateTimePicker({
  title = "Select Date & Time",
  width = "94.2%",
  onDateChange = (date) => {},
}) {
  const [startDate, setStartDate] = useState();

  const handleDateChange = (date) => {
    setStartDate(date);
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
          selected={startDate}
          onChange={handleDateChange}
          showTimeSelect
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          timeFormat="h:mm aa"
          className="custom-date-picker"
          calendarClassName="custom-calendar"
          // popperClassName="custom-popper"
          // wrapperClassName="custom-wrapper"
          minDate={null}
          placeholderText="Select date and time"
          showPopperArrow={false}
          isClearable
          todayButton="Today"
          dropdownMode="select"
          timeCaption="Time"
          shouldCloseOnSelect={true}
        />
      </View>

      <style jsx global>{`
        .custom-date-picker {
          padding: 10px 10px;
          font-size: 14px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          width: 94.2%;
          color: #111827;
          background-color: #fff;
        }

        /* Main container */
        .custom-calendar {
          border-radius: 12px;
          margin: -20px 100px -5px -5px;
          border: 1px solid #e5e7eb;
          font-family: inherit;
        }

        /* Date picker section */
        .react-datepicker__month-container {
          padding: 12px;
          // width: 280px;
        }

        /* Header */
        .react-datepicker__header {
          background-color: #6366f1;
          color: white;
          // border-bottom: none;
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
          // width: 32px;
          // text-align: center;
        }

        /* Days grid */
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
          // width: 32px;
          // height: 32px;
          // display: flex;
          // align-items: center;
          // justify-content: center;
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

        /* Navigation */
        .react-datepicker__navigation {
          // top: 12px;
          // width: 24px;
          // height: 24px;
        }

        .react-datepicker__navigation--previous {
          left: 10px;
          top: 14px;
          // border-right-color: white;
        }

        .react-datepicker__navigation--next {
          right: 12px;
          top: 14px;

          border-left-color: white;
        }

        /* Time picker section */
        .react-datepicker__time-container {
          // width: 120px;
          border-left: 1px solid #e5e7eb;
        }

        .react-datepicker__time {
          height: 100%;
          // display: flex;
          flex-direction: column;
        }

        .react-datepicker__time-box {
          // width: 100% !important;
          height: 100%;
        }

        .react-datepicker__time-list {
          padding: 8px 0;
          height: 100%;
          // overflow-y: auto;
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

        /* Today button */
        .react-datepicker__today-button {
          background: #f9fafb;
          border-top: 1px solid #e5e7eb;
          color: #6366f1;
          font-weight: 500;
          // padding: 10px 0;
          cursor: pointer;
          font-size: 13px;
        }

        /* Popper positioning */
        .custom-popper {
          z-index: 100;
          padding-top: 8px;
        }
      `}</style>
    </View>
  );
}
