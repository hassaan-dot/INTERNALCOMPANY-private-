export const languageProvider = (text: any) => {
  const rtlRegex = /^[\u0600-\u06FF]/;
  return rtlRegex.test(text);
};
