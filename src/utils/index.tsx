// export function formatDate(input: string) {
//   const date = new Date(input);
//   const formatedDate = date.toLocaleDateString("en-GB");
//   return formatedDate;
// }

// export const handleDownload = async (url?: string, title?: string) => {
//   if (!url || !title) return;
//   try {
//     const response = await fetch(url, {
//       mode: "cors",
//     });

//     const blob = await response.blob();
//     const blobUrl = window.URL.createObjectURL(blob);

//     const link = document.createElement("a");
//     link.href = blobUrl;
//     link.setAttribute("download", title);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     window.URL.revokeObjectURL(blobUrl);
//   } catch (err) {
//     console.error("Download failed", err);
//   }
// };
export function formatDate(input: string) {
  const date = new Date(input);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return date
    .toLocaleDateString("en-GB", options)
    .replace(/,/g, "") // Remove any commas
    .replace(/(\d+)(th|st|nd|rd)/, "$1"); // Remove ordinal suffixes if present
}

export const handleDownload = async (url?: string, title?: string) => {
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
