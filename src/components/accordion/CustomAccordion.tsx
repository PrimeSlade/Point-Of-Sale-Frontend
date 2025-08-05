import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { PatientData } from "@/types/PatientType";
import { format } from "date-fns";

type CustomAccordionProps = {
  data: PatientData;
};

const CustomAccordion = ({ data }: CustomAccordionProps) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="max-h-[620px] overflow-y-auto"
    >
      {data?.treatments.map((tre) => {
        const formatted = format(tre.createdAt, "P");
        return (
          <AccordionItem value={tre.id + ""}>
            <AccordionTrigger>
              <div className="flex flex-col gap-3">
                <div>{formatted}</div>
                <div>
                  <span className="text-[var(--text-secondary)]">Doctor:</span>{" "}
                  {tre.doctor?.name}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-3 border p-5 rounded-xl mb-5">
              <div className="flex flex-col gap-2">
                <h1 className="font-bold">Disgnosis</h1>
                <div>{tre.diagnosis}</div>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-bold">Treatment</h1>
                <div>{tre.treatment}</div>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default CustomAccordion;
