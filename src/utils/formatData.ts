import { format } from "date-fns";

const formatDate = (date: Date) => {
  return format(date, "dd/MM/yyyy");
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

export { formatDate, calcAge };
