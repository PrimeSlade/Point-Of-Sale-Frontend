import { format } from "date-fns";

const formatDate = (date: Date) => {
  return format(date, "dd/MM/yyyy");
};

const formatText = (input: string): string => {
  return input
    .split("_")
    .map((text) => text[0].toUpperCase() + text.slice(1))
    .join(" ");
};

const calcAge = (dob: Date): string => {
  const age = new Date().getFullYear() - dob.getFullYear();
  const month = new Date().getMonth() - dob.getMonth();

  return age > 1
    ? `${age} yrs`
    : month > 1
    ? `${month} months`
    : `${month} month`;
};

const formatLocalDate = (date?: Date) => {
  if (!date) return undefined;

  return format(date, "yyyy-MM-dd'T'HH:mm:ss");
};

export { formatDate, calcAge, formatText, formatLocalDate };
