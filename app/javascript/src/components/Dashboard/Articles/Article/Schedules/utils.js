import dayjs from "dayjs";

export const getDisabledDate = current =>
  current.isBefore(dayjs().subtract(1, "day"));
