import AlertBox from "@/components/alertBox/AlertBox";
import ExpenseColumns from "@/components/columns/ExpenseColumns";
import ReportDataTable from "@/components/report/ReportDataTable ";
import { useReportExpenses } from "@/hooks/useExpenses";
import type { ExpenseType } from "@/types/ExpenseType";
import { parseDateFromURL } from "@/utils/formatDate";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const calcTotalAmount = (data: ExpenseType[]) => {
  if (!data) return 0;
  return data.reduce((acc, exp) => acc + exp.amount, 0);
};

const ExpenseReportPage = () => {
  const [errorOpen, setErrorOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const {
    data,
    isLoading,
    error: fetchExpenseError,
  } = useReportExpenses(
    parseDateFromURL(searchParams.get("startDate")),
    parseDateFromURL(searchParams.get("endDate"))
  );

  useEffect(() => {
    if (fetchExpenseError) {
      setErrorOpen(true);
    }
  }, [fetchExpenseError]);

  const columns = ExpenseColumns({
    page: 0,
    serverSide: false,
    action: false,
  });

  return (
    <div>
      <ReportDataTable
        columns={columns}
        data={data?.data ?? []}
        prompt="Search by names, descriptions or categories"
        showTotalAmount={true}
        totalAmount={calcTotalAmount(data?.data)}
      />
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

export default ExpenseReportPage;
