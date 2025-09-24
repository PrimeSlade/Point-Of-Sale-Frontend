import { format } from "date-fns";

const formatDate = (date: Date) => {
  return format(date, "dd/MM/yyyy");
};

const formatDateForURL = (date: Date) => {
  return format(date, "dd-MM-yyyy");
};

const parseDateFromURL = (dateString: string | null) => {
  if (!dateString) return undefined;
  const [day, month, year] = dateString.split("-");
  return new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day)
  );
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

export {
  formatDate,
  formatDateForURL,
  parseDateFromURL,
  calcAge,
  formatText,
  formatLocalDate,
};
