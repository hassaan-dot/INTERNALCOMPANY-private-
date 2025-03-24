function getCurrentDateTime() {
    const currentDate = new Date();
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
  
    const dateString = currentDate.toLocaleDateString(undefined, dateOptions);
    const timeString = currentDate.toLocaleTimeString(undefined, timeOptions);
  
    return `${dateString} ${timeString}`;
  }
module.exports = { getCurrentDateTime };
