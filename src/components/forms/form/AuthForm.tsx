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
import { LockKeyhole, Mail } from "lucide-react";

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
  const getFieldIcon = (name: keyof LoginForm) => {
    if (name === "email")
      return <Mail size={16} className="text-[var(--text-secondary)]" />;

    return <LockKeyhole size={16} className="text-[var(--text-secondary)]" />;
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 bg-transparent p-0"
      >
        <div>
          <h1 className="text-3xl font-black text-[var(--text-primary)]">
            Welcome back
          </h1>
          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
            Enter your credentials to continue.
          </p>
        </div>
        {fields.map(({ name, label, placeholder, type = "text" }) => (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-semibold text-[var(--text-primary)]">
                  <span>{label}</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                      {getFieldIcon(name)}
                    </div>
                    <Input
                      placeholder={placeholder}
                      {...field}
                      type={type}
                      className="h-12 rounded-none border-0 border-b border-[var(--border-color)] bg-transparent pl-10 pr-0 text-[var(--text-primary)] shadow-none focus-visible:border-[var(--primary-color)] focus-visible:ring-0"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <DialogFooter className="col-span-2 pt-2">
          <Button
            type="submit"
            disabled={isPending}
            className="h-12 w-full rounded-none bg-[var(--primary-color)] text-base font-semibold text-white hover:bg-[var(--primary-color-hover)]"
          >
            {isPending ? "Signing In..." : "Log In"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AuthForm;
