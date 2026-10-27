import { WEEKDAYS } from "../constants";
import type { Todo, WeekdayKey } from "../types";

export const isWeekdayKey = (value: string): value is WeekdayKey =>
  WEEKDAYS.some((weekday) => weekday.day === value);

export const createTodo = (title: string): Todo => ({
  id: crypto.randomUUID(),
  title,
  day: null,
  isCompleted: false,
});
