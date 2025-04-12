import { format } from "date-fns";

export function formatDate(input: any) {
  if (!input) return "";
  const date = new Date(input).toLocaleString();

  const formatedDate = format(date, "yyyy-MM-dd HH:mm:ss");
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
    let inTime = new Date(record.clock_in);
    let outTime = record.clock_out ? new Date(record.clock_out) : new Date();

    while (inTime < outTime) {
      // Start of next day
      const nextDay = new Date(inTime);
      nextDay.setHours(24, 0, 0, 0);

      const intervalEnd = outTime < nextDay ? outTime : nextDay;
      const workedMs = intervalEnd.getTime() - inTime.getTime();
      const workedHrs = workedMs / (1000 * 60 * 60);

      const localDayIndex = (inTime.getDay() + 6) % 7;
      dailyHours[localDayIndex].value += parseFloat(workedHrs.toFixed(2));

      inTime = intervalEnd;
    }
  });
  return dailyHours;
};
