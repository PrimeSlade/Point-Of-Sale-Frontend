import InvoicePDF from "@/components/invoice/InvoicePDF";
import InvoicePreview from "@/components/invoice/InvoicePreview";
import Loading from "@/components/loading/Loading";
import { Button } from "@/components/ui/button";
import { useInvoice } from "@/hooks/useInvoices";
import { usePDF } from "@react-pdf/renderer";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const InvoiceDetailsPage = () => {
  const { id } = useParams();
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
  }, [invoice, updateInstance]);

  const handlePrint = () => {
    // Create iframe for printing
    if (instance.url) {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = instance.url;
      document.body.appendChild(iframe);

      iframe.onload = () => {
        iframe.contentWindow?.print();

        // Clean up after print
        iframe.contentWindow?.addEventListener("afterprint", () => {
          document.body.removeChild(iframe);
        });
      };
    }
  };

  if (isFetchingInvoice) {
    return <Loading className="flex justify-center h-screen items-center" />;
  }

  if (fetchInvoiceError) {
    return (
      <div className="flex justify-center h-screen items-center">
        <p>Error fetching invoice details: {fetchInvoiceError.message}</p>
      </div>
    );
  }

  if (!invoice?.data) {
    return (
      <div className="flex justify-center h-screen items-center">
        <p>Invoice not found.</p>
      </div>
    );
  }

  if (instance.loading) {
    return (
      <div className="flex justify-center h-screen items-center">
        Loading PDF...
      </div>
    );
  }

  if (instance.error) {
    return (
      <div className="flex justify-center h-screen items-center">
        <p>Error generating PDF: {instance.error}</p>
      </div>
    );
  }

  return (
    <div className="m-20">
      <InvoicePreview data={invoice.data} />
      <div className="flex justify-end mt-10 gap-3">
        <Button
          className="bg-[var(--danger-color)] rounded-md hover:bg-[var(--danger-color-hover)] w-25"
          onClick={() => navigate("/dashboard/invoices")}
        >
          Back
        </Button>
        <a href={instance.url!} download={`Invoice-${id}.pdf`}>
          <Button className="bg-[var(--success-color)] hover:bg-[var(--success-color-hover)]">
            Download
          </Button>
        </a>
        <Button
          className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-md hover:bg-[var(--primary-color-hover)]"
          onClick={handlePrint}
        >
          Print PDF
        </Button>
      </div>
    </div>
  );
};

export default InvoiceDetailsPage;
