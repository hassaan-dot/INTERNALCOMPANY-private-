import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { View, Text } from "react-native";

export default function CustomDateTimePicker({
  title = "Select Date & Time",
  onDateChange = (date) => {},
}) {
  const [startDate, setStartDate] = useState(new Date());

  const handleDateChange = (date) => {
    setStartDate(date);
    onDateChange(date); // Optional callback to parent component
    console.log("Selected date is ", date);
  };

  return (
    <View style={{ marginVertical: 10 }}>
      <div className="picker-header">
        <View style={{ marginBottom: 5 }}>
          <Text>{title}</Text>
        </View>
      </div>

      <div className="picker-content">
        <DatePicker
          selected={startDate}
          onChange={handleDateChange}
          showTimeSelect
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          timeFormat="h:mm aa"
          className="custom-date-picker"
          calendarClassName="custom-calendar"
          popperClassName="custom-popper"
          wrapperClassName="custom-wrapper"
          minDate={null} // Remove minDate to allow past dates
          placeholderText="Select date and time"
          showPopperArrow={false}
          isClearable
          todayButton="Today"
          dropdownMode="select"
          timeCaption="Time"
          shouldCloseOnSelect={false}
        />
      </div>
      {/* <style jsx global>{`
        .picker-title {
          margin: 0;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .picker-container {
          marginvertical: 12px 15px;
        }

        .picker-content {
          // flex: 1;
          // padding: 20px;
          // display: flex;
          // flex-direction: column;
        }

        .custom-date-picker {
          flex: 1;
          padding: 12px 15px;
          font-size: 16px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          width: 100%;
          color: #2d3748;
          background-color: #f8fafc;
          transition: all 0.2s ease;
        }

        .custom-date-picker:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
        }

        .custom-wrapper {
          // position: relative;
          display: flex;
          flex: 1;
        }

        .custom-calendar {
          border-radius: 8px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
          border: 1px solid #e2e8f0;
          font-family: inherit;
        }

        .react-datepicker__header {
          background-color: #4f46e5;
          color: white;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          border-bottom: none;
          padding: 12px 0;
        }

        .react-datepicker__current-month,
        .react-datepicker-time__header,
        .react-datepicker__day-name {
          color: white;
        }

        .react-datepicker__day {
          color: #2d3748;
          transition: all 0.2s ease;
        }

        .react-datepicker__day:hover {
          background-color: #e2e8f0;
        }

        .react-datepicker__day--selected,
        .react-datepicker__day--keyboard-selected {
          background-color: #4f46e5;
          color: white;
        }

        .react-datepicker__day--today {
          font-weight: bold;
          color: #4f46e5;
        }

        .react-datepicker__time-container {
          border-left: 1px solid #e2e8f0;
        }

        .react-datepicker__time-box {
          width: 100px !important;
        }

        .react-datepicker__time-list-item {
          // padding: 8px 10px;
        }

        .react-datepicker__time-list-item:hover {
          background-color: #e2e8f0;
        }

        .react-datepicker__time-list-item--selected {
          background-color: #4f46e5;
          color: white;
        }

        .custom-popper {
          z-index: 100;
        }

        .react-datepicker__close-icon::after {
          background-color: #4f46e5;
          color: white;
          border-radius: 50%;
          font-size: 12px;
          padding: 2px;
        }
      `}</style> */}
      <style jsx global>{`
        .picker-title {
          margin: 0px;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .picker-container {
          marginvertical: 200px 200px;
        }

        .custom-date-picker {
          padding: 12px 15px;
          font-size: 16px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          width: 185%;
          color: #2d3748;
          // flex: 1;
          background-color: #fff;
          // transition: all 0.2s ease;
        }

        .custom-date-picker:focus {
          outline: none;
          margin: 20px;
          // border-color: #4f46e5;
          // box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
        }

        /* Calendar Container */
        .custom-calendar {
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          font-family: inherit;
          margin: 0px 0px -100px 80px;
        }

        /* Header Styling */
        .react-datepicker__header {
          background-color: #4f46e5;
          color: white;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          border-bottom: none;
          padding: 12px 0;
        }

        .react-datepicker__current-month,
        .react-datepicker-time__header,
        .react-datepicker__day-name {
          color: white;
          font-weight: 500;
        }

        .react-datepicker__day {
          color: #2d3748;
          transition: all 0.2s ease;
          border-radius: 4px;
          margin: 0.166rem;
          padding: 0.25rem;
        }

        .react-datepicker__day:hover {
          background-color: #e2e8f0;
        }

        .react-datepicker__day--selected,
        .react-datepicker__day--keyboard-selected {
          background-color: #4f46e5;
          color: white;
        }

        .react-datepicker__day--today {
          font-weight: bold;
          color: #4f46e5;
          background-color: #e9d8fd;
        }

        .react-datepicker__day--outside-month {
          color: #cbd5e0;
        }

        /* Navigation Arrows */
        .react-datepicker__navigation {
          top: 10px;
        }

        .react-datepicker__navigation--previous {
          border-right-color: white;
        }

        .react-datepicker__navigation--next {
          border-left-color: white;
        }

        .react-datepicker__time-container {
          border-left: 1px solid #e2e8f0;
          width: 110px;
        }

        .react-datepicker__time-container .react-datepicker__time {
          background: white;
          border-bottom-right-radius: 8px;
        }

        .react-datepicker__time-box {
          width: 100% !important;
        }

        .react-datepicker__time-list {
          padding: 0;
        }

        .react-datepicker__time-list-item {
          padding: 8px 10px;
          font-weight: 500;
          color: #2d3748;
          transition: all 0.2s ease;
        }

        .react-datepicker__time-list-item:hover {
          background-color: #e2e8f0;
        }

        .react-datepicker__time-list-item--selected {
          background-color: #4f46e5 !important;
          color: white;
          font-weight: 600;
        }

        /* Today Button */
        .react-datepicker__today-button {
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          color: #4f46e5;
          font-weight: 500;
          padding: 8px 0;
          cursor: pointer;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
          transition: background 0.2s ease;
        }

        .react-datepicker__today-button:hover {
          background: #e2e8f0;
        }

        /* Clear Button */
        .react-datepicker__close-icon::after {
          background-color: #4f46e5;
          color: white;
          border-radius: 50%;
          font-size: 12px;
          padding: 2px;
          height: 16px;
          width: 16px;
          line-height: 16px;
        }

        /* Popper Positioning */
        .custom-popper {
          z-index: 100;
        }
      `}</style>
    </View>
  );
}
