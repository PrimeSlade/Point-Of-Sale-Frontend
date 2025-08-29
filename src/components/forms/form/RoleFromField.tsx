import { get, type UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Permission } from "@/types/RoleType";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toUpperCase } from "@/utils/formatText";
import { Label } from "@/components/ui/label";

type RoleFormFieldProps<T> = {
  permissions: Permission[] | any;
  form: UseFormReturn<any>;
  onSubmit: (values: T) => void;
  mode?: "create" | "edit";
  isPending?: boolean;
};

const RoleFormField = <T,>({
  permissions,
  form,
  onSubmit,
  mode,
  isPending,
}: RoleFormFieldProps<T>) => {
  const groupedPermissions = permissions.reduce(
    (acc: any, permission: Permission) => {
      if (!acc[permission.subject]) {
        acc[permission.subject] = [];
      }
      acc[permission.subject].push(permission);

      return acc;
    },
    {}
  );

  const error = form.formState.errors.permissions;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="py-3">
          <FormField
            control={form.control}
            name={"name"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span>Name</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={"Enter role name"}
                    type="text"
                    {...field}
                    className="no-spinner w-[30%]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          {Object.entries(groupedPermissions).map(
            ([subject, subjectPermission]: any) => (
              <div className="space-y-3" key={subject}>
                <div className="font-bold">
                  {subject === "all" ? "Admin" : subject}
                </div>

                <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
                  {subjectPermission.map((permission: Permission) => (
                    <Label
                      className={`border p-3 rounded-md mb-3 hover:bg-accent/50 flex items-start has-[[aria-checked=true]]:border-[var(--primary-color-hover)] has-[[aria-checked=true]]:bg-blue-50 cursor-pointer ${
                        error ? "border-[var(--danger-color)]" : ""
                      }`}
                      key={permission.id}
                    >
                      <FormField
                        key={permission.id}
                        control={form.control}
                        name="permissions"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center gap-2">
                            <FormControl>
                              <Checkbox
                                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-[var(--primary-color-hover)] dark:data-[state=checked]:bg-[var(--primary-color-hover)]"
                                checked={field.value?.some(
                                  (item: { id: number }) =>
                                    item.id === permission.id
                                )}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        { id: permission.id },
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (
                                            value: { id: number } // Type is now object
                                          ) => value.id !== permission.id // Compare the id property
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              <div>{toUpperCase(permission.action)}</div>
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    </Label>
                  ))}
                </div>
              </div>
            )
          )}
          {error && (
            <div className="text-red-600 text-sm">
              {get(error, "message") || "An error occurred"}
            </div>
          )}
        </div>

        <div className="mb-5 flex justify-end">
          <Button
            type="submit"
            disabled={isPending}
            className="bg-[var(--success-color)] hover:bg-[var(--success-color-hover)] min-w-20"
          >
            {mode === "create" ? "Add" : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RoleFormField;
