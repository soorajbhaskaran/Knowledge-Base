import dayjs from "dayjs";

export const formatDateWithDayAndTime = (dateTime) =>
  dayjs(dateTime).format(`hh:mm A, D/MM/YY`);
