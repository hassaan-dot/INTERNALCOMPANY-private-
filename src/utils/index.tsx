import { format, parseISO } from "date-fns";

export function formatDate(input: any) {
  if (!input) return "";
  const formatedDate = format(input, "yyyy-MM-dd HH:mm:ss");
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
