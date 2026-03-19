import { type Lang } from "@/data/helpContent";
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
  lang,
  children,
}: {
  title: string;
  lang: Lang;
  children: React.ReactNode;
}) => (
  <div className="my-4 overflow-hidden rounded-lg border border-dashed border-[var(--primary-color)]/40">
    <div className="flex items-center gap-2 border-b border-[var(--border-color)] bg-[var(--background-color)] px-4 py-2">
      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--primary-color)]">
        {lang === "en" ? "Try it" : "စမ်းကြည့်ပါ"}
      </span>
      <span className="text-[10px] text-[var(--text-secondary)]">— {title}</span>
    </div>
    <div className="space-y-3 bg-[var(--primary-bg)] px-4 py-4">{children}</div>
  </div>
);

export const RetailPriceCalc = ({ lang = "en" }: { lang?: Lang }) => {
  const [purchasePrice, setPurchasePrice] = useState(1000);
  const [pricePercent, setPricePercent] = useState(30);
  const retail = purchasePrice + (purchasePrice * pricePercent) / 100;

  const labels = {
    en: {
      title: "retail price calculator",
      purchase: "Purchase Price (MMK)",
      percent: "Price Percent",
      retail: "Retail Price",
    },
    my: {
      title: "လက်လီဈေးနှုန်း တွက်ချက်ကိရိယာ",
      purchase: "ဝယ်ဈေး (MMK)",
      percent: "ဈေးတင်နှုန်း (%)",
      retail: "လက်လီဈေးနှုန်း",
    },
  }[lang];

  return (
    <CalcWrapper title={labels.title} lang={lang}>
      <CalcRow label={labels.purchase} value={purchasePrice} onChange={setPurchasePrice} />
      <CalcRow label={labels.percent} value={pricePercent} onChange={setPricePercent} suffix="%" />
      <div className="border-t border-[var(--border-color)] pt-3">
        <CalcResult label={labels.retail} value={retail} suffix="MMK" />
      </div>
    </CalcWrapper>
  );
};

export const InvoiceTotalCalc = ({ lang = "en" }: { lang?: Lang }) => {
  const [subtotal, setSubtotal] = useState(7600);
  const [itemDiscount, setItemDiscount] = useState(400);
  const [invoiceDiscount, setInvoiceDiscount] = useState(600);
  const total = Math.max(0, subtotal - itemDiscount - invoiceDiscount);

  const labels = {
    en: {
      title: "invoice total calculator",
      subtotal: "Sub Total (MMK)",
      itemDiscount: "Total Item Discount (MMK)",
      invoiceDiscount: "Invoice Discount (MMK)",
      total: "Total Amount",
    },
    my: {
      title: "စုစုပေါင်းကျသင့်ငွေ တွက်ချက်ကိရိယာ",
      subtotal: "စုစုပေါင်း (MMK)",
      itemDiscount: "ပစ္စည်းလျှော့ဈေး (MMK)",
      invoiceDiscount: "ဘေလ်လျှော့ဈေး (MMK)",
      total: "စုစုပေါင်း ကျသင့်ငွေ",
    },
  }[lang];

  return (
    <CalcWrapper title={labels.title} lang={lang}>
      <CalcRow label={labels.subtotal} value={subtotal} onChange={setSubtotal} />
      <CalcRow label={labels.itemDiscount} value={itemDiscount} onChange={setItemDiscount} />
      <CalcRow label={labels.invoiceDiscount} value={invoiceDiscount} onChange={setInvoiceDiscount} />
      <div className="border-t border-[var(--border-color)] pt-3">
        <CalcResult label={labels.total} value={total} suffix="MMK" />
      </div>
    </CalcWrapper>
  );
};
