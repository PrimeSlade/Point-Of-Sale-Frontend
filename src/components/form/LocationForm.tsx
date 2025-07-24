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
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import type { CreateLocationProps } from "@/types/LocationType";
import { addLocation, editLocation } from "@/api/locations";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const LocationForm = ({
  open,
  onClose,
  mode,
  oldName,
  oldAddress,
  oldPhoneNumber,
  id,
}: CreateLocationProps) => {
  //TenStack
  const queryClient = useQueryClient();

  const {
    mutate: addLocationMutate,
    isPending: isCreating,
    error: createError,
  } = useMutation({
    mutationFn: addLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] }),
        form.reset(),
        onClose(false);
    },
  });

  const {
    mutate: editLocationMutate,
    isPending: isEditing,
    error: editError,
  } = useMutation({
    mutationFn: editLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] }),
        form.reset(),
        onClose(false);
    },
  });

  //From
  const formSchema = z.object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters." })
      .max(50, { message: "Name must be at most 50 characters." }),

    address: z
      .string()
      .min(2, { message: "Address must be at least 2 characters." })
      .max(50, { message: "Address must be at most 50 characters." }),

    phoneNumber: z.string().regex(/^\+?[0-9]{9,15}$/, {
      message:
        "Phone number must contain only digits and be 9–15 characters long.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "" || oldName,
      address: "" || oldAddress,
      phoneNumber: "" || oldPhoneNumber,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (mode === "create") {
      addLocationMutate(values);
    } else {
      editLocationMutate({ id: id!, input: values });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Location</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {createError && (
                <div className="text-[var(--danger-color)] text-center font-medium">
                  {createError.message}
                </div>
              )}
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
                  disabled={isCreating}
                  className="bg-[var(--success-color)] hover:bg-[var(--success-color-hover)]"
                >
                  {mode === "create" ? "Add" : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LocationForm;
