import AlertBox from "@/components/alertBox/AlertBox";
import { useExpenses } from "@/hooks/useExpenses";
import { parseDateFromURL } from "@/utils/formatDate";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const InvoiceReportPage = () => {
  const [errorOpen, setErrorOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const {
    data,
    isLoading,
    error: fetchExpenseError,
  } = useExpenses(
    Number(searchParams.get("page") || 1),
    15,
    searchParams.get("search") || "",
    parseDateFromURL(searchParams.get("startDate")),
    parseDateFromURL(searchParams.get("endDate"))
  );

  useEffect(() => {
    if (fetchExpenseError) {
      setErrorOpen(true);
    }
  }, [fetchExpenseError]);

  return (
    <div>
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
