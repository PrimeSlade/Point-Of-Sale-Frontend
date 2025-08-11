import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { DoctorData } from "@/types/DoctorType";
import type { PatientData } from "@/types/PatientType";
import { calcAge } from "@/utils/formatDate";
import { Plus, UserRound, X } from "lucide-react";
import { useState } from "react";

type PersonSelectorProps<T> = {
  btnLabel: string;
  dialogTitle: string;
  placeholder: string;
  setSelectedPerson: React.Dispatch<React.SetStateAction<T | null>>;
  data: T[];
  selectedPerson: T | null;
  type: "Doctor" | "Patient";
};

const PersonSelector = <T extends PatientData | DoctorData>({
  btnLabel,
  dialogTitle,
  placeholder,
  setSelectedPerson,
  selectedPerson,
  data,
  type,
}: PersonSelectorProps<T>) => {
  const [filter, setFilter] = useState("");

  const persons = data.filter((d) =>
    d.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handlePersonSelect = (person: T) => {
    setSelectedPerson(person);

    setFilter("");
  };

  const bgColor = (type: string) => {
    return type === "Patient"
      ? "border-[var(--success-color)] bg-[var(--success-bg)]"
      : "border-[var(--primary-color)] bg-[var(--primary-bg)]";
  };

  return (
    <Dialog>
      {selectedPerson ? (
        <div
          className={`border rounded-md p-5 flex justify-between ${bgColor(
            type
          )}`}
        >
          <div>
            <div className="flex gap-3">
              {type === "Patient" ? (
                <>
                  <div className="flex items-center justify-center  p-2 rounded-full w-10 h-10 bg-emerald-100">
                    <UserRound
                      size={30}
                      className="text-[var(--success-color)]"
                    />
                  </div>
                  <div>
                    <div>
                      <span className="font-bold">{selectedPerson.name}</span> (
                      {calcAge(
                        new Date((selectedPerson as PatientData).dateOfBirth)
                      )}
                      )
                    </div>
                    <div className="text-[var(--text-secondary)]">
                      {selectedPerson.phoneNumber.number}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <div>
                      <span className="font-bold text-[var(--primary-color-hover)]">
                        {selectedPerson.name}
                      </span>
                    </div>
                    <div className="text-[var(--text-secondary)]">
                      {selectedPerson.phoneNumber.number}
                    </div>
                    <div className="text-[var(--text-secondary)]">
                      Commission: {(selectedPerson as DoctorData).commission}%
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center text-[var(--text-secondary)] hover:text-black">
            <X size={20} onClick={() => setSelectedPerson(null)} />
          </div>
        </div>
      ) : (
        <DialogTrigger asChild>
          <div className="border-2 border-dotted rounded-md p-5 flex flex-col items-center hover:border-[var(--text-secondary)]">
            <div>
              <Plus />
            </div>
            <div className="text-[var(--text-secondary)]">{btnLabel}</div>
          </div>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Input
              id="name-1"
              name="name"
              placeholder={placeholder}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3 h-[420px] overflow-y-scroll">
            {persons.map((d) => (
              <DialogClose asChild>
                <div
                  className="p-3 border rounded-xl hover:bg-gray-100"
                  key={d.id}
                  onClick={() => {
                    handlePersonSelect(d);
                  }}
                >
                  <div className="font-bold">{d.name}</div>
                  <div className="text-[var(--text-secondary)]">
                    {d.phoneNumber.number}
                  </div>
                </div>
              </DialogClose>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PersonSelector;
