import { useAuth } from "@/hooks/useAuth";
import type { ItemUnits } from "@/types/ItemType";
import type { ServiceData } from "@/types/ServiceType";
import { calculatePriceWithIncrease } from "@/utils/calcPrice";
import type { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PaymentCardProps = {
  form: UseFormReturn<any>;
};

const PaymentCard = ({ form }: PaymentCardProps) => {
  const watchedItems = form.watch("invoiceItems") || [];
  const watchedServices = form.watch("invoiceService") || [];

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
      subtotal: itemsTotals.subTotal + servicesTotal,
      itemDiscount: itemsTotals.discount,
      total: itemsTotals.subTotal + servicesTotal - itemsTotals.discount,
    };
  };

  const { subtotal, itemDiscount, total } = calculateTotal();

  return (
    <div className="space-y-4">
      <Card className="border border-[var(--border-color)] shadow-sm">
        <CardHeader className="bg-[var(--background-color)] border-b border-[var(--border-color)]">
          <CardTitle className="text-lg font-semibold text-[var(--text-primary)] flex flex-col justify-center"></CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          {/* Calculation Summary */}
          <div className="space-y-3">
            <h2 className="font-bold text-xl">Payment Summary</h2>
            <div className="flex justify-between items-center">
              <span className="text-[var(--text-secondary)]">Subtotal</span>
              <span className="font-medium text-[var(--text-primary)]">
                {subtotal.toFixed(2)}
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

          {/* Spacer for future payment inputs */}
          <div className="pt-4 space-y-3">
            {/* Payment Method Section - Space reserved */}
            <div className="min-h-[60px] border-2 border-dashed border-[var(--border-color)] rounded-md flex items-center justify-center">
              <span className="text-[var(--text-secondary)] text-sm">
                Payment Method Section
              </span>
            </div>

            {/* Additional Payment Details Section - Space reserved */}
            <div className="min-h-[40px] border-2 border-dashed border-[var(--border-color)] rounded-md flex items-center justify-center">
              <span className="text-[var(--text-secondary)] text-sm">
                Payment Details Section
              </span>
            </div>

            {/* Notes Section - Space reserved */}
            <div className="min-h-[60px] border-2 border-dashed border-[var(--border-color)] rounded-md flex items-center justify-center">
              <span className="text-[var(--text-secondary)] text-sm">
                Notes Section
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentCard;
