export const WEEKDAYS = [
  { day: "sat", label: "السبت", short: "SAT" },
  { day: "sun", label: "الأحد", short: "SUN" },
  { day: "mon", label: "الإثنين", short: "MON" },
  { day: "tue", label: "الثلاثاء", short: "TUE" },
  { day: "wed", label: "الأربعاء", short: "WED" },
  { day: "thu", label: "الخميس", short: "THU" },
  { day: "fri", label: "الجمعة", short: "FRI" },
] as const;

export type Weekday = (typeof WEEKDAYS)[number];
export type WeekdayKey = Weekday["day"];

export type Todo = {
  id: string;
  title: string;
  day: WeekdayKey | null;
  isCompleted: boolean;
};

export const isWeekdayKey = (value: string): value is WeekdayKey =>
  WEEKDAYS.some((weekday) => weekday.day === value);

export const createTodo = (title: string): Todo => ({
  id: crypto.randomUUID(),
  title,
  day: null,
  isCompleted: false,
});
