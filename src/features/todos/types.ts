import type { WEEKDAYS } from "./constants";

export type Weekday = (typeof WEEKDAYS)[number];
export type WeekdayKey = Weekday["day"];

export type Todo = {
  id: string;
  title: string;
  day: WeekdayKey | null;
  isCompleted: boolean;
};
