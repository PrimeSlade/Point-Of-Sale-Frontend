import AlertBox from "@/components/alertBox/AlertBox";
import InvoiceColumns from "@/components/columns/InvoiceColumns";
import PaymentSummaryBox from "@/components/report/PaymentSummaryBox";
import ReportDataTable from "@/components/report/ReportDataTable ";
import { useInvoices } from "@/hooks/useInvoices";
import type { Invoice } from "@/types/InvoiceType";
import { parseDateFromURL } from "@/utils/formatDate";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const calcTotalAmount = (data: Invoice[]) => {
  if (!data) return;
  return data.reduce(
    (acc, inv) => {
      acc.totalAmount += inv.totalAmount;

      if (!acc[inv.paymentMethod]) {
        acc[inv.paymentMethod] = 0;
      }

      acc[inv.paymentMethod] += inv.totalAmount;

      return acc;
    },
    {
      totalAmount: 0,
    } as Record<string, number> & { totalAmount: number }
  );
};

const InvoiceReportPage = () => {
  const [errorOpen, setErrorOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) - 1 || 1;

  const {
    data,
    isLoading,
    error: fetchExpenseError,
  } = useInvoices(
    Number(searchParams.get("page") || 1),
    15,
    searchParams.get("search") || "",
    parseDateFromURL(searchParams.get("startDate")),
    parseDateFromURL(searchParams.get("endDate")),
    searchParams.get("filter") || ""
  );

  console.log(calcTotalAmount(data?.data));

  useEffect(() => {
    if (fetchExpenseError) {
      setErrorOpen(true);
    }
  }, [fetchExpenseError]);

  const columns = InvoiceColumns({
    page: page - 1,
    action: false,
  });

  return (
    <div>
      <ReportDataTable
        columns={columns}
        data={data?.data}
        totalPages={data?.meta.totalPages}
        prompt="Search by patient names or item names"
        showTotalAmount={false}
        totalAmount={0}
      />
      <PaymentSummaryBox data={data?.data} calcTotalAmount={calcTotalAmount} />
      {fetchExpenseError && (
        <AlertBox
          open={errorOpen}
          onClose={() => setErrorOpen(false)}
          title="Error"
          description={fetchExpenseError.message}
          mode={"error"}
        />
      )}
    </div>
  );
};

export default InvoiceReportPage;
