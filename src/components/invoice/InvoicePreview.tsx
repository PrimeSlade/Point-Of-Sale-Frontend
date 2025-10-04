import type { InvoiceProps } from "./InvoicePDF";
import { formatDate } from "@/utils/formatDate";
import { generateInvoiceId } from "@/utils/formatText";

const InvoicePreview = ({ data }: InvoiceProps) => {
  const allItems = [
    ...(data?.invoiceItems || []).map((item) => ({
      ...item,
      itemType: "product" as const,
    })),
    ...(data?.invoiceServices || []).map((service) => ({
      ...service,
      itemType: "service" as const,
    })),
  ];

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg">
      <img
        src="/images/YnoLogo.JPG"
        alt="Yno Logo"
        className="w-16 h-16 rounded-lg object-cover mx-auto"
      />
      <div className="flex justify-between items-start mb-8 pb-6 border-b-2 border-gray-300">
        <div>
          <h1 className="text-2xl font-bold mb-2">Yaung Ni Oo</h1>
          <p className="text-gray-600">
            #{generateInvoiceId(data!.id, data!.location.name)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Invoice Date</p>
          <p className="font-semibold">
            {formatDate(new Date(data!.createdAt))}
          </p>
        </div>
      </div>
      <div className="mb-8">
        <table className="w-full">
          <thead>
            <tr className="bg-[var(--primary-color)] text-white font-semibold">
              <th className="text-left py-3 px-4 ">No</th>
              <th className="text-left py-3 px-4 ">Name</th>
              <th className="text-right py-3 px-4 ">Qty</th>
              <th className="text-right py-3 px-4 ">Unit</th>
              <th className="text-right py-3 px-4 ">Unit Price</th>
              <th className="text-right py-3 px-4 ">Discount Price</th>
              <th className="text-right py-3 px-4">Amount</th>
            </tr>
          </thead>
          <tbody>
            {allItems.map((item, index) => {
              const isProduct = item.itemType === "product";
              const name = isProduct ? item.itemName : `${item.name} (Service)`;
              const price = item.retailPrice;
              const discount = isProduct ? item.discountPrice : 0;
              const total = price - discount!;

              return (
                <tr
                  key={`${item.itemType}-${item.id}`}
                  className="border-b border-gray-200"
                >
                  <td className="py-4 px-4 ">{index + 1}</td>
                  <td className="py-4 px-4">{name}</td>
                  <td className="py-4 px-4 text-right ">
                    {isProduct ? item.unitType : "-"}
                  </td>
                  <td className="py-4 px-4 text-right ">
                    {isProduct ? item.quantity : "-"}
                  </td>
                  <td className="py-4 px-4 text-right ">{price}</td>
                  <td className="py-4 px-4 text-right font-semibold ">
                    {discount}
                  </td>
                  <td
                    className="py-4 px-4 text-right font-semibold 
                  "
                  >
                    {total}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mb-8">
        <div className="w-64">
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold ">{data?.totalAmount}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Item Discount</span>
            <span className="font-semibold ">{data?.totalItemDiscount}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Total Discount</span>
            <span className="font-semibold ">{data?.discountAmount}</span>
          </div>
          <div className="flex justify-between py-3 border-t-2 border-gray-300 mt-2">
            <span className="text-lg font-bold ">Total Amount</span>
            <span className="text-lg font-bold ">{data?.totalAmount}</span>
          </div>
        </div>
      </div>
      <footer className="flex justify-center text-sm">Thank you</footer>
    </div>
  );
};

export default InvoicePreview;
