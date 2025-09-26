import AlertBox from "@/components/alertBox/AlertBox";
import ExpenseColumns from "@/components/columns/ExpenseColumns";
import ReportDataTable from "@/components/report/ReportDataTable ";
import { useExpenses } from "@/hooks/useExpenses";
import { parseDateFromURL } from "@/utils/formatDate";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const ExpenseReportPage = () => {
  const [errorOpen, setErrorOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) - 1 || 1;

  const {
    data,
    isLoading,
    error: fetchExpenseError,
  } = useExpenses(
    Number(searchParams.get("page") || 1),
    15,
    searchParams.get("search") || "",
    parseDateFromURL(searchParams.get("startDate")),
    parseDateFromURL(searchParams.get("endDate")),
    searchParams.get("filter") || ""
  );

  useEffect(() => {
    if (fetchExpenseError) {
      setErrorOpen(true);
    }
  }, [fetchExpenseError]);

  const columns = ExpenseColumns({
    page: page - 1,
    action: false,
  });

  return (
    <div>
      <ReportDataTable
        columns={columns}
        data={data?.data}
        totalPages={data?.meta.totalPages}
        prompt="Search by names, descriptions or categories"
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
