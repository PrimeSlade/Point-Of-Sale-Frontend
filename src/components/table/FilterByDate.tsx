import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { formatDate } from "@/utils/formatDate";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "@/types/TreatmentType";
import type { Table } from "@tanstack/react-table";

type FilterByDateProps<TData> = {
  date: DateRange;
  setDate: React.Dispatch<React.SetStateAction<DateRange>>;
  table?: Table<TData>;
  serverSideSearch: boolean;
};

const FilterByDate = <TData,>({
  table,
  date,
  setDate,
  serverSideSearch,
}: FilterByDateProps<TData>) => {
  return (
    <div className="flex gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[140px] pl-3 text-left font-normal",
              !date.startDate && "text-muted-foreground"
            )}
          >
            {date.startDate ? (
              formatDate(date?.startDate)
            ) : (
              <span>Start Date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date?.startDate}
            onSelect={(selectedDate) => {
              setDate((prev) => {
                const newState = {
                  ...prev,
                  startDate: selectedDate,
                };
                if (
                  newState.startDate &&
                  newState.endDate &&
                  serverSideSearch
                ) {
                  table!.setPageIndex(0);
                }
                return newState;
              });
            }}
            disabled={(d) => d > new Date() || d < new Date("1900-01-01")}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
      <div className="flex items-center justify-center">From</div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[140px] pl-3 text-left font-normal",
              !date.endDate && "text-muted-foreground"
            )}
          >
            {date.endDate ? formatDate(date?.endDate) : <span>End Date</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date?.endDate}
            onSelect={(selectedDate) =>
              setDate((prev) => {
                const newState = {
                  ...prev,
                  endDate: selectedDate,
                };
                if (
                  newState.startDate &&
                  newState.endDate &&
                  serverSideSearch
                ) {
                  table!.setPageIndex(0);
                }
                return newState;
              })
            }
            disabled={(d) => d > new Date() || d < new Date("1900-01-01")}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FilterByDate;
