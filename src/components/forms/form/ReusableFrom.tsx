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

export type types = "text" | "number" | "tel" | "email" | "password";

export type FormFieldConfig = {
  name: string;
  label: string;
  placeholder: string;
  type?: types;
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {fields.map(({ name, label, placeholder, type = "text" }) => (
              <FormField
                key={name}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input placeholder={placeholder} type={type} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <DialogFooter>
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
