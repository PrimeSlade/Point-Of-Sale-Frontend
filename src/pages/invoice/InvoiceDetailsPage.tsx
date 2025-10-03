import InvoicePDF from "@/components/invoice/InvoicePDF";
import InvoicePreview from "@/components/invoice/InvoicePreview";
import Loading from "@/components/loading/Loading";
import { Button } from "@/components/ui/button";
import { useInvoice } from "@/hooks/useInvoices";
import {
  BlobProvider,
  pdf,
  PDFDownloadLink,
  PDFViewer,
  usePDF,
} from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const InvoiceDetailsPage = () => {
  const { id } = useParams();
  const [errorOpen, setErrorOpen] = useState(false);

  const navigate = useNavigate();

  const {
    data: invoice,
    isLoading: isFetchingInvoice,
    error: fetchInvoiceError,
  } = useInvoice(id);

  const [instance, updateInstance] = usePDF({
    document: <InvoicePDF data={invoice?.data} />,
  });

  useEffect(() => {
    if (invoice?.data) {
      updateInstance(<InvoicePDF data={invoice.data} />);
    }
  }, [invoice?.data]);

  if (isFetchingInvoice)
    return <Loading className="flex justify-center h-screen items-center" />;

  if (instance.loading) return <div>Loading...</div>;

  if (!instance.url) return <div>Error generating PDF</div>;

  return (
    <div className="m-20">
      <InvoicePreview data={invoice?.data} />
      <div className="flex justify-end mt-10 gap-5">
        <Button
          className="bg-[var(--danger-color)] rounded-md hover:bg-[var(--danger-color-hover)] w-25"
          onClick={() => navigate("/dashboard/invoices")}
        >
          Back
        </Button>
        <Button className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-md hover:bg-[var(--primary-color-hover)]">
          <a href={instance.url}>Print PDF</a>
        </Button>
      </div>
    </div>
  );
};

export default InvoiceDetailsPage;
