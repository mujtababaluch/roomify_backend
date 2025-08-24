export function isISODateString(value) {
  const date = new Date(value);
  return !isNaN(date.getTime());
}

export function validateBookingTimes(startTime, endTime) {
  const start = new Date(startTime);
  const end = new Date(endTime);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return 'Invalid date format';
  }
  if (end <= start) return 'endTime must be after startTime';
  return null;
}
