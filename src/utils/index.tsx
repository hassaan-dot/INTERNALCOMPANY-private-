import { format } from "date-fns";

export function formatDate(input: any) {
  if (!input) return "";
  const date = new Date(input);

  const formatedDate = format(date.toLocaleString(), "yyyy-MM-dd HH:mm:ss");
  return formatedDate;
}

export function formatDateForDisplay(isoString: any) {
  return format(new Date(isoString), "Pp");
}

export const handleDownload = async (url?: any, title?: any) => {
  if (!url || !title) return;
  try {
    const response = await fetch(url, {
      mode: "cors",
    });

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", title);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error("Download failed", err);
  }
};

export function getValueFromKey(data: any, key: string) {
  if (key.includes(".")) {
    // If it's a nested key, split by the dot and use reduce to access nested properties
    return key
      .split(".")
      .reduce(
        (obj, part) => (obj && obj[part] !== undefined ? obj[part] : undefined),
        data
      );
  }

  // If it's a simple key, return the value directly
  return data[key];
}

export const groupHoursByLocalDay = (records: any[]) => {
  const weekDays = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];

  const frontColor = [
    "#b0dab9",
    "#b7b3e3",
    "#FECACA",
    "#add8e6",
    "#a3a3ff",
    "#8b5a2b",
    "#a0d7b4",
  ];

  const dailyHours = weekDays.map((day, index) => ({
    label: day,
    value: 0,
    frontColor: frontColor[index],
  }));

  records.forEach((record) => {
    const inTime = new Date(record.clock_in);
    const outTime = record.clock_out ? new Date(record.clock_out) : new Date(); // Use now if still clocked in

    // Convert to local day index (0 = Monday, 6 = Sunday)
    const localDayIndex = (inTime.getDay() + 6) % 7;

    const workedMs = outTime.getTime() - inTime.getTime();
    const workedHrs = workedMs / (1000 * 60 * 60);

    dailyHours[localDayIndex].value += parseFloat(workedHrs.toFixed(2));
  });

  return dailyHours;
};
