import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { LoginForm } from "@/types/AuthType";
import type { UseFormReturn } from "react-hook-form";
import type { Types } from "./ReusableFrom";

type LoginFieldType = {
  name: keyof LoginForm;
  label: string;
  placeholder: string;
  type?: Types;
};

type LoginFormProps = {
  form: UseFormReturn<LoginForm>;
  onSubmit: (values: LoginForm) => void;
  fields: LoginFieldType[];
  isPending: boolean;
};

const AuthForm = ({ form, onSubmit, fields, isPending }: LoginFormProps) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-[30%] mx-auto border rounded-2xl shadow p-5 bg-white"
      >
        <h1 className="font-bold text-center text-2xl text-[var(--primary-color)]">
          Yaung Ni Oo
        </h1>
        {fields.map(({ name, label, placeholder, type = "text" }) => (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span>{label}</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder={placeholder} {...field} type={type} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <DialogFooter className="col-span-2">
          <Button
            type="submit"
            disabled={isPending}
            className="bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)]"
          >
            Log In
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AuthForm;
