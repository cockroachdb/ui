import { aYear, aMonth, aDay, anHour, aMinute, aSecond } from "./constants";

// A time unit represents a relative time unit to display time in (seconds, hours, years, etc)
export type TimeUnit = {
  amount: number; // the amount of time the unit represents (number of milliseconds)
  comparator: (x: number) => boolean; // a function to to decide if this unit should be used or not
  template: (d: number) => string; // a string template used to display time unit given number of milliseconds
};

export const gteq = (x: number, y: number): boolean => x >= y;
export const lt = (x: number, y: number): boolean => x < y;
export const compare = (fn: Function) => (y: number) => (x: number) => fn(x, y);
export const gteqUnit = compare(gteq);
export const gteqZero = compare(gteq)(0);
export const ltZero = compare(lt)(0);

export const pastTemplate = (duration: number, label: string) =>
  `${duration} ${label}${duration > 1 ? "s" : ""} ago`;

export const TimeUnits: Array<TimeUnit> = [
  {
    amount: aYear,
    comparator: gteqUnit(aYear),
    template: (d: number) => pastTemplate(d, "year"),
  },
  {
    amount: aMonth,
    comparator: gteqUnit(aMonth),
    template: (d: number) => pastTemplate(d, "month"),
  },
  {
    amount: aDay,
    comparator: gteqUnit(aDay),
    template: (d: number) => pastTemplate(d, "day"),
  },
  {
    amount: anHour,
    comparator: gteqUnit(anHour),
    template: (d: number) => pastTemplate(d, "hour"),
  },
  {
    amount: aMinute,
    comparator: gteqUnit(aMinute),
    template: (d: number) => pastTemplate(d, "min"),
  },
  {
    amount: aSecond,
    comparator: gteqUnit(aSecond),
    template: (d: number) => pastTemplate(d, "sec"),
  },
  {
    amount: 1,
    comparator: gteqZero,
    template: () => "just now",
  },
  {
    amount: 1,
    comparator: ltZero,
    template: () => "the future",
  },
];

// fuzzyFormatter will return a formatting function given an offset
// Usage:
//    const formatter = fuzzyFormatter(numberOfMilliseconds);
//    const fuzzyTimeString = formatter(timeUnit);
//
export const fuzzyFormatter = (offset: number) => (unit: TimeUnit) => {
  if (unit === undefined || offset === undefined) return "";
  const duration = Math.floor(offset / unit.amount);
  return unit.template(duration);
};

// setFuzzy takes a date representing "now" and returns a function that will format
// a given date in a "time ago" form.
// Usage:
//    const getFuzzyTime = setFuzzy(now);
//    const fuzzyTime = getFuzzyTime(someDate);
//
export const setFuzzy = (now: Date) => (timedate: Date) => {
  const diff = now.getTime() - timedate.getTime();
  const format = fuzzyFormatter(diff);
  const unit = TimeUnits.find((t) => t.comparator(diff));

  return format(unit);
};

export const fuzzy = (d: Date) => setFuzzy(new Date())(d);
