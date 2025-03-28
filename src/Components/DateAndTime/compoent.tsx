// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import DateTimePicker, {
//   DateTimePickerEvent,
// } from "@react-native-community/datetimepicker";
// import { format } from "date-fns";
// import { styles } from "./styles";
// type Mode = "date" | "time";

// const DateTimeSelector = () => {
//   const [date, setDate] = useState<Date>(new Date());
//   const [mode, setMode] = useState<Mode>("date");
//   const [show, setShow] = useState<boolean>(false);

//   const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
//     const currentDate = selectedDate || date;
//     setShow(false);
//     setDate(currentDate);
//   };

//   const showMode = (currentMode: Mode) => {
//     setShow(true);
//     setMode(currentMode);
//   };

//   const showDatepicker = () => {
//     console.log("Hassaam");
//     setShow(true);

//     // showMode('date');
//   };

//   const showTimepicker = () => {
//     showMode("time");
//   };

//   return (
//     <View style={styles.container}>
//       {/* <Text style={styles.label}>Select Date and Time</Text> */}
//       <View style={styles.pickerContainer}>
//         <TouchableOpacity onPress={showDatepicker} style={styles.button}>
//           <Text style={styles.buttonText}>{format(date, "dd MMM yyyy")}</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={showTimepicker} style={styles.button}>
//           <Text style={styles.buttonText}>{format(date, "HH:mm")}</Text>
//         </TouchableOpacity>
//       </View>

//       {!show && (
//         <DateTimePicker
//           testID="dateTimePicker"
//           value={date}
//           mode={mode}
//           is24Hour={true}
//           // display="default"
//           onChange={onChange}
//         />
//       )}
//     </View>
//   );
// };

// export default DateTimeSelector;
// import { useState } from "react";
// import { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// export default function CustomDateTimePicker() {
//   const [startDate, setStartDate] = useState(new Date());

//   return (
//     // <div>
//     <DatePicker
//       selected={startDate}
//       onChange={(date) => setStartDate(date)}
//       showTimeSelect
//       dateFormat="MMMM d, yyyy h:mm aa"
//       timeFormat="HH:mm"
//     />
//     // </div>
//   );
// }
// import { useState } from "react";
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
      <style jsx global>{`
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
          display: flex;
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
      `}</style>
    </View>
  );
}
