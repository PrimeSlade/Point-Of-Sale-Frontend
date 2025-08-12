import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { type UseFormReturn } from "react-hook-form"; //React hook form

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { formatDate } from "@/utils/formatDate";

export type Types = "text" | "number" | "email" | "password";

export type FieldType = "input" | "select" | "date";

export type FormFieldConfig = {
  name: string;
  label: string;
  placeholder: string;

  //Might delete it later
  type?: Types;
  fieldType?: FieldType;
  options?: { value: string; label: string }[];
  optional?: boolean;
};

type ReusableFormDialogProps<T> = {
  open: boolean;
  onClose: (open: boolean) => void;
  title: string;
  fields: FormFieldConfig[];
  form: UseFormReturn<any>;
  onSubmit: (values: T) => void;
  mode?: "create" | "edit";
  isPending?: boolean;
};

function ReusableFormDialog<T>({
  open,
  onClose,
  title,
  fields,
  form,
  onSubmit,
  mode = "create",
  isPending = false,
}: ReusableFormDialogProps<T>) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      {/* it fields len is more than 6, remove the w and apply grid  */}
      <DialogContent
        className={`${fields.length > 6 ? "" : "sm:max-w-[425px]"}`}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={`space-y-4 ${
              fields.length > 6 ? "grid grid-cols-2 gap-3" : ""
            } `}
          >
            {/*three main inputs which are select,date and normal input(number or others)  */}
            {fields.map(
              ({
                name,
                label,
                placeholder,
                type = "text",
                fieldType = "input",
                options,
                optional,
              }) => {
                if (fieldType === "date") {
                  return (
                    <FormField
                      key={name}
                      control={form.control}
                      name={name}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <span>
                              {label}
                              <span className="text-[var(--danger-color)]">
                                *
                              </span>
                            </span>
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    " pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    formatDate(field.value)
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                captionLayout="dropdown"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  );
                }

                if (fieldType === "select" && options) {
                  return (
                    <FormField
                      key={name}
                      control={form.control}
                      name={name}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <span>
                              {label}
                              <span className="text-[var(--danger-color)]">
                                *
                              </span>
                            </span>
                          </FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder={placeholder} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {options.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                  {opt.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  );
                }

                return (
                  <FormField
                    key={name}
                    control={form.control}
                    name={name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <span>
                            {label}
                            {!optional && (
                              <span className="text-[var(--danger-color)]">
                                *
                              </span>
                            )}
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={placeholder}
                            type={type}
                            {...field}
                            className="no-spinner"
                            onChange={
                              type === "number"
                                ? (e) =>
                                    field.onChange(
                                      e.target.value === ""
                                        ? ""
                                        : Number(e.target.value)
                                    )
                                : field.onChange
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              }
            )}

            <DialogFooter className="col-span-2">
              <DialogClose asChild>
                <Button
                  className="bg-[var(--danger-color)] hover:bg-[var(--danger-color-hover)]"
                  onClick={() => form.reset()}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-[var(--success-color)] hover:bg-[var(--success-color-hover)]"
              >
                {mode === "create" ? "Add" : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ReusableFormDialog;
