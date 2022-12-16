import dayjs from "dayjs";
import { range } from "ramda";

export const getDisabledHours = () => range(0, dayjs().hour());

export const getDisabledDate = current =>
  current.isBefore(dayjs().subtract(1, "day"));
