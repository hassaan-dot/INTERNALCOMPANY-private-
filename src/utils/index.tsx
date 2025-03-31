import { format, parseISO } from "date-fns";

export function formatDate(input: any) {
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
