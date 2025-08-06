import { format } from "date-fns";

const formatDate = (date: Date) => {
  return format(date, "dd/MM/yyyy");
};

export { formatDate };
