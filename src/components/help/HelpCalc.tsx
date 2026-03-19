import { useState } from "react";

const CalcRow = ({
  label,
  value,
  onChange,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
}) => (
  <div className="flex items-center justify-between gap-4">
    <span className="text-xs text-[var(--text-secondary)]">{label}</span>
    <div className="flex items-center gap-1.5">
      <input
        type="number"
        value={value}
        min={0}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="w-28 rounded border border-[var(--border-color)] bg-white px-2 py-1 text-right text-xs font-mono text-[var(--text-primary)] focus:border-[var(--primary-color)] focus:outline-none"
      />
      {suffix && (
        <span className="w-6 text-xs text-[var(--text-secondary)]">{suffix}</span>
      )}
    </div>
  </div>
);

const CalcResult = ({
  label,
  value,
  suffix,
}: {
  label: string;
  value: number;
  suffix?: string;
}) => (
  <div className="flex items-center justify-between rounded-md bg-[var(--primary-color)]/10 px-3 py-2">
    <span className="text-xs font-semibold text-[var(--text-primary)]">{label}</span>
    <span className="font-mono text-sm font-bold text-[var(--primary-color)]">
      {value.toLocaleString()} {suffix}
    </span>
  </div>
);

const CalcWrapper = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="my-4 overflow-hidden rounded-lg border border-dashed border-[var(--primary-color)]/40">
    <div className="flex items-center gap-2 border-b border-[var(--border-color)] bg-[var(--background-color)] px-4 py-2">
      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--primary-color)]">
        Try it
      </span>
      <span className="text-[10px] text-[var(--text-secondary)]">— {title}</span>
    </div>
    <div className="space-y-3 bg-[var(--primary-bg)] px-4 py-4">{children}</div>
  </div>
);

export const RetailPriceCalc = () => {
  const [purchasePrice, setPurchasePrice] = useState(1000);
  const [pricePercent, setPricePercent] = useState(30);
  const retail = purchasePrice + (purchasePrice * pricePercent) / 100;
  return (
    <CalcWrapper title="retail price calculator">
      <CalcRow label="Purchase Price (MMK)" value={purchasePrice} onChange={setPurchasePrice} />
      <CalcRow label="Price Percent" value={pricePercent} onChange={setPricePercent} suffix="%" />
      <div className="border-t border-[var(--border-color)] pt-3">
        <CalcResult label="Retail Price" value={retail} suffix="MMK" />
      </div>
    </CalcWrapper>
  );
};

export const InvoiceTotalCalc = () => {
  const [subtotal, setSubtotal] = useState(7600);
  const [itemDiscount, setItemDiscount] = useState(400);
  const [invoiceDiscount, setInvoiceDiscount] = useState(600);
  const total = Math.max(0, subtotal - itemDiscount - invoiceDiscount);
  return (
    <CalcWrapper title="invoice total calculator">
      <CalcRow label="Sub Total (MMK)" value={subtotal} onChange={setSubtotal} />
      <CalcRow label="Total Item Discount (MMK)" value={itemDiscount} onChange={setItemDiscount} />
      <CalcRow label="Invoice Discount (MMK)" value={invoiceDiscount} onChange={setInvoiceDiscount} />
      <div className="border-t border-[var(--border-color)] pt-3">
        <CalcResult label="Total Amount" value={total} suffix="MMK" />
      </div>
    </CalcWrapper>
  );
};
