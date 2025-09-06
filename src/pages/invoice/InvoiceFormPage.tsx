import { getInvoiceById } from "@/api/invoice";
import { getLocations } from "@/api/locations";
import DialogButton from "@/components/button/DialogButton";
import InvoiceForm from "@/components/forms/wrapper/InvoiceForm";
import Header from "@/components/header/Header";
import Loading from "@/components/loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

//used for both create and edit
const InvoiceFormPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const isEdit = Boolean(id);

  //tenstack
  const { data: invoiceData, isLoading: isFetchingInvoice } = useQuery({
    queryKey: ["invoice", id],
    queryFn: () => getInvoiceById(Number(id)),
    enabled: Boolean(id),
  });

  const {
    data: locationData,
    isLoading: location,
    error: fetchError,
  } = useQuery({
    queryFn: getLocations,
    queryKey: ["locations"],
  });

  const isLoading = isFetchingInvoice || location;

  if (isLoading)
    return <Loading className="flex justify-center h-screen items-center" />;

  return (
    <div>
      <Header
        header={!isEdit ? "Generate Invoice" : "Edit Invoice"}
        className="text-3xl mb-5"
        subHeader=""
        action={
          <DialogButton
            name="Back to Invoice Page"
            openFrom={() => navigate("/dashboard/invoices")}
          />
        }
      />
      <InvoiceForm
        mode={isEdit ? "edit" : "create"}
        invoiceData={invoiceData}
        locationData={locationData}
      />
    </div>
  );
};

export default InvoiceFormPage;
