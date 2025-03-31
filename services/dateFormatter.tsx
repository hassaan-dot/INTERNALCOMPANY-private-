// import { useMemo } from "react";

// export const useFormattedDate = (dateString) => {
//   return useMemo(() => {
//     if (!dateString) return "";

//     const date = new Date(dateString);

//     // Get timezone offset in minutes and convert to hours:minutes format
//     const offset = -date.getTimezoneOffset();
//     const sign = offset >= 0 ? "+" : "-";
//     const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0");
//     const minutes = String(Math.abs(offset) % 60).padStart(2, "0");

//     // Format the date in ISO format with the correct timezone offset
//     return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
//       2,
//       "0"
//     )}-${String(date.getDate()).padStart(2, "0")}T${String(
//       date.getHours()
//     ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(
//       date.getSeconds()
//     ).padStart(2, "0")}${sign}${hours}:${minutes}`;
//   }, [dateString]);
// };
// export const formatDateForAPI = (dateString) => {
//   if (!dateString) return "";

//   const date = new Date(dateString);

//   // Get timezone offset in minutes and convert to hours:minutes format
//   const offset = -date.getTimezoneOffset();
//   const sign = offset >= 0 ? "+" : "-";
//   const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0");
//   const minutes = String(Math.abs(offset) % 60).padStart(2, "0");

//   // Format the date in ISO format with the correct timezone offset
//   return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
//     2,
//     "0"
//   )}-${String(date.getDate()).padStart(2, "0")}T${String(
//     date.getHours()
//   ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(
//     date.getSeconds()
//   ).padStart(2, "0")}${sign}${hours}:${minutes}`;
// };
export const formatDateForAPI = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  // Get timezone offset in minutes and convert to hours:minutes format
  const offset = -date.getTimezoneOffset();
  const sign = offset >= 0 ? "+" : "-";
  const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0");
  const minutes = String(Math.abs(offset) % 60).padStart(2, "0");

  // Format as full ISO string: YYYY-MM-DD HH:mm:ss (with timezone offset)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")} ${String(
    date.getHours()
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(
    date.getSeconds()
  ).padStart(2, "0")}${sign}${hours}:${minutes}`;
};
