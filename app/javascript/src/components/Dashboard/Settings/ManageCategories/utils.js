import dayjs from "dayjs";

const formatDateRelativeToNow = (dateTime) => dayjs(dateTime).fromNow();
const formatDateWithDayAndTime = (dateTime) =>
  dayjs(dateTime).format(`dddd MMMM DD, YYYY hh:mm A`);

export { formatDateRelativeToNow, formatDateWithDayAndTime };
