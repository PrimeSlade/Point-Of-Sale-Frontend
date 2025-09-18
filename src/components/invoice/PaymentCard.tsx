import { useAuth } from "@/hooks/useAuth";
import type { ItemUnits } from "@/types/ItemType";
import type { ServiceData } from "@/types/ServiceType";
import { calculatePriceWithIncrease } from "@/utils/calcPrice";
import type { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toUpperCase } from "@/utils/formatText";
import CustomTextarea from "../textarea/TreatmentTextarea";

type PaymentCardProps = {
  form: UseFormReturn<any>;
};

const paymentMethod = ["kpay", "wave", "cash", "others"];

const PaymentCard = ({ form }: PaymentCardProps) => {
  const watchedItems = form.watch("invoiceItems") || [];
  const watchedServices = form.watch("invoiceService") || [];
  const discountAmount = form.watch("discountAmount") || 0;

  const { user } = useAuth();

  //For UI displaying
  const calculateTotal = () => {
    const itemsTotals = watchedItems.reduce(
      (
        acc: { subTotal: number; discount: number },
        item: Partial<ItemUnits & { discountPrice: number }>
      ) => {
        const price =
          calculatePriceWithIncrease(item.purchasePrice!, user!.pricePercent) ||
          0;
        const quantity = item.quantity || 0;
        const discount = item.discountPrice || 0;

        acc.subTotal += price * quantity;
        acc.discount += discount * quantity;

        return acc;
      },
      { subTotal: 0, discount: 0 }
    );

    const servicesTotal = watchedServices.reduce(
      (sum: number, service: ServiceData) => {
        return sum + (service?.retailPrice || 0);
      },
      0
    );

    return {
      subTotal: itemsTotals.subTotal + servicesTotal,
      itemDiscount: itemsTotals.discount,
      total:
        itemsTotals.subTotal +
        servicesTotal -
        itemsTotals.discount -
        discountAmount,
    };
  };

  const { subTotal, itemDiscount, total } = calculateTotal();

  return (
    <div className="space-y-4">
      <div className="border border-[var(--border-color)] shadow-sm rounded-lg">
        <div className="bg-[var(--background-color)] border-b border-[var(--border-color)] p-4 rounded-t-lg">
          <div className="text-lg font-semibold text-[var(--text-primary)] flex flex-row gap-5 items-center">
            <FormField
              control={form.control}
              name="discountAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Amount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Discount Amount"
                      type="number"
                      className="no-spinner"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"paymentMethod"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span>
                      Payment Method
                      <span className="text-[var(--danger-color)]">*</span>
                    </span>
                  </FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-50">
                        <SelectValue placeholder="Payment Method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {paymentMethod.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {toUpperCase(opt)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div className="space-y-3">
            <h2 className="font-bold text-xl">Payment Summary</h2>
            <div className="flex justify-between items-center">
              <span className="text-[var(--text-secondary)]">Subtotal</span>
              <span className="font-medium text-[var(--text-primary)]">
                {subTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[var(--text-secondary)]">
                Item Discount
              </span>
              <span className="font-medium text-[var(--danger-color)]">
                -{itemDiscount.toFixed(2)}
              </span>
            </div>
            <hr className="border-[var(--border-color)]" />
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-[var(--text-primary)]">
                Total Amount
              </span>
              <span className="text-lg font-bold text-[var(--success-color)]">
                {total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="pt-7 space-y-3">
            <CustomTextarea
              label="note"
              placeholder="Type your note here"
              title="Note"
              form={form}
              name="note"
              optional
            />
            <CustomTextarea
              label="paymentDescription"
              placeholder="Type your Payment Description here"
              title="Payment Description"
              form={form}
              name="Payment Description"
              optional
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
