function getCurrentDateTime() {
  const currentDate = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };

  const dateString = currentDate.toLocaleDateString(undefined, dateOptions);
  const timeString = currentDate.toLocaleTimeString(undefined, timeOptions);

  return `${dateString} ${timeString}`;
}
module.exports = { getCurrentDateTime };
