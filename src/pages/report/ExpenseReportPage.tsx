import AlertBox from "@/components/alertBox/AlertBox";
import { useExpenseColumns } from "@/components/columns/ExpenseColumns";
import ReportDataTable from "@/components/report/ReportDataTable ";
import { useReportExpenses } from "@/hooks/useExpenses";
import type { ExpenseType } from "@/types/ExpenseType";
import { parseDateFromURL } from "@/utils/formatDate";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const calcTotalAmount = (data: ExpenseType[]) => {
  if (!data) return 0;
  return data.reduce((acc, exp) => acc + exp.amount, 0);
};

const ExpenseReportPage = () => {
  const { t } = useTranslation();
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

  const columns = useExpenseColumns({
    page: 0,
    serverSide: false,
    action: false,
  });

  return (
    <div>
      <ReportDataTable
        columns={columns}
        data={data?.data ?? []}
        prompt={t("expense.searchPlaceholder")}
        showTotalAmount={true}
        totalAmount={calcTotalAmount(data?.data)}
      />
      {fetchExpenseError && (
        <AlertBox
          open={errorOpen}
          onClose={() => setErrorOpen(false)}
          title={t("common.error")}
          description={fetchExpenseError.message}
          mode={"error"}
        />
      )}
    </div>
  );
};

export default ExpenseReportPage;
