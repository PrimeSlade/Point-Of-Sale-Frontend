import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { TreatmentData } from "@/types/TreatmentType";
import { formatDate } from "@/utils/formatDate";
import { Eye } from "lucide-react";

type TreatmentCardProps = {
  data: TreatmentData;
};

const TreatmentCard = ({ data }: TreatmentCardProps) => {
  const formatted = formatDate(new Date(data.createdAt));

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Eye
            size={20}
            className="text-[var(--success-color)] hover:text-[var(--success-color-hover)] hover:border hover:border-white"
          />
        </DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Treatment Details</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-y-3 p-5">
            <h1 className="font-bold text-[var(--text-secondary)]">Name</h1>
            <h1 className="font-bold text-[var(--text-secondary)]">
              Patient Name
            </h1>
            <h1 className="font-bold text-[var(--text-secondary)]">Date</h1>

            <div className="col-span-3 grid grid-cols-3 rounded-md border bg-[var(--background-color)]">
              <div className="px-3 py-2">{data.patient?.name}</div>
              <div className="px-3 py-2">{data.doctor?.name}</div>
              <div className="px-3 py-2">{formatted}</div>
            </div>

            {data.investigation && (
              <>
                <h1 className="font-bold text-[var(--text-secondary)] col-span-3">
                  Investigation
                </h1>
                <div className="px-3 py-2 border rounded-md bg-[var(--background-color)] col-span-3">
                  {data.investigation}
                </div>
              </>
            )}

            {data.diagnosis && (
              <>
                <h1 className="font-bold text-[var(--text-secondary)] col-span-3">
                  Diagnosis
                </h1>
                <div className="px-3 py-2 border rounded-md bg-[var(--background-color)] col-span-3">
                  {data.diagnosis}
                </div>
              </>
            )}

            <h1 className="font-bold text-[var(--text-secondary)] col-span-3">
              Treatment
            </h1>
            <div className="px-3 py-2 border rounded-md bg-[var(--background-color)] col-span-3">
              {data.treatment}
            </div>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default TreatmentCard;
