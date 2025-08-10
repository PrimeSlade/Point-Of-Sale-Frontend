import type { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

type TreatmentTextareaProps = {
  label: string;
  placeholder: string;
  title: string;
  form: UseFormReturn<any>;
  name: string;
};

const TreatmentTextarea = ({
  title,
  placeholder,
  form,
  name,
}: TreatmentTextareaProps) => {
  return (
    <div className="flex flex-col gap-3">
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-bold">{title}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={placeholder}
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* <div>
        <label htmlFor={label} className="font-bold">
          {title}
        </label>
      </div>
      <div>
        <Textarea id={label} placeholder={placeholder} />
      </div> */}
    </div>
  );
};

export default TreatmentTextarea;
