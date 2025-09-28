import type { Invoice } from "@/types/InvoiceType";

type PaymentSummaryBoxProps = {
  data: Invoice[] | undefined;
  calcTotalAmount: (
    data: Invoice[]
  ) => (Record<string, number> & { totalAmount: number }) | undefined;
};

const PaymentSummaryBox = ({
  data,
  calcTotalAmount,
}: PaymentSummaryBoxProps) => {
  const summary = calcTotalAmount(data || []);

  return (
    <div className="mt-6 border rounded-lg">
      <div className="grid grid-cols-3 gap-3 border-b">
        <div className="col-span-2">
          <h1 className="font-bold col-span-2 border-r py-2 px-3">
            Payment Method
          </h1>
        </div>
        <div>
          <h1 className="font-bold p-2">Amount</h1>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 border-b">
        <div className="col-span-2">
          <h1 className="col-span-2 border-r py-2 px-3">Kpay</h1>
        </div>
        <div>
          <h1 className="p-2">{summary?.kpay ?? 0}</h1>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 border-b">
        <div className="col-span-2">
          <h1 className=" col-span-2 border-r py-2 px-3">Wave</h1>
        </div>
        <div>
          <h1 className="p-2">{summary?.wave ?? 0}</h1>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 border-b">
        <div className="col-span-2">
          <h1 className=" col-span-2 border-r py-2 px-3">Cash</h1>
        </div>
        <div>
          <h1 className="p-2">{summary?.cash ?? 0}</h1>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 border-b">
        <div className="col-span-2">
          <h1 className="col-span-2 border-r py-2 px-3">Other</h1>
        </div>
        <div>
          <h1 className="p-2">{summary?.other ?? 0}</h1>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <h1 className="font-bold col-span-2 border-r py-2 px-3 flex justify-end">
            Total Amount
          </h1>
        </div>
        <div>
          <h1 className="font-bold p-2">{summary?.totalAmount ?? 0}</h1>
        </div>
      </div>

      {/* <div className="col-span-2 border-r">Kpay</div>
      <div>{summary?.kpay ?? 0}</div>

      <div className="col-span-2 border-r">Wave</div>
      <div>{summary?.wave ?? 0}</div>

      <div className="col-span-2 border-r">Cash</div>
      <div>{summary?.cash ?? 0}</div>

      <div className="col-span-2 border-r">Other</div>
      <div>{summary?.other ?? 0}</div>

      <div className="col-span-2 border-r">Total Amount</div>
      <div>{summary?.totalAmount ?? 0}</div> */}
    </div>
  );
};

export default PaymentSummaryBox;
