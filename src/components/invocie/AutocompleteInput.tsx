import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import type { PatientData } from "@/types/PatientType";
import type { DoctorData } from "@/types/DoctorType";
import type { SelectedItems } from "./InvoieTreatmentBox";
import { Input } from "../ui/input";
import { formatText } from "@/utils/formatDate";

type AutocompleteInputProps = {
  data: PatientData[] | DoctorData[];
  setSelectedItems: React.Dispatch<React.SetStateAction<SelectedItems>>;
  labelName: string;
  type: "patient" | "doctor";
};

const AutocompleteInput = ({
  data,
  setSelectedItems,
  labelName,
  type,
}: AutocompleteInputProps) => {
  const [pDName, setPDName] = useState({
    patient: "",
    doctor: "",
  });

  const filteredPatients =
    type === "patient"
      ? (data as PatientData[])?.filter((patient: PatientData) =>
          patient.name.toLowerCase().includes(pDName.patient.toLowerCase())
        )
      : [];

  const filteredDoctors =
    type === "doctor"
      ? (data as DoctorData[])?.filter((doctor: DoctorData) =>
          doctor.name.toLowerCase().includes(pDName.doctor.toLowerCase())
        )
      : [];

  const [showSuggestions, setShowSuggestions] = useState({
    patient: false,
    doctor: false,
  });

  const handleInputChange = (e: any, objectName: string) => {
    const value = e.target.value;
    setPDName((pd) => ({
      ...pd,
      [objectName]: value,
    }));

    setSelectedItems((prev) => ({
      ...prev,
      [objectName]: null,
    }));

    setShowSuggestions((prev) => ({
      ...prev,
      [objectName]: value.length > 0,
    }));
  };

  const handleSelect = (
    input: PatientData | DoctorData,
    objectName: string
  ) => {
    setPDName((pd) => ({
      ...pd,
      [objectName]: input.name,
    }));
    setSelectedItems((prev) => ({ ...prev, [objectName]: input.name }));
    setShowSuggestions((prev) => ({ ...prev, [objectName]: false }));
  };

  return (
    <div>
      <div className="space-y-2 w-70">
        <label
          htmlFor="patient-search"
          className="text-sm font-medium text-gray-700"
        >
          {labelName}
        </label>
        <div className="relative">
          <Input
            id="patient-search"
            type="text"
            placeholder={`${formatText(type)} name...`}
            value={pDName[type]}
            onChange={(e) => handleInputChange(e, type)}
            className="w-full"
          />

          {/* Patient suggestions dropdown */}
          {showSuggestions[type] &&
            (type === "patient" ? filteredPatients : filteredDoctors).length >
              0 && (
              <Card className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-y-auto">
                <CardContent className="p-0">
                  {(type === "patient"
                    ? filteredPatients
                    : filteredDoctors
                  ).map((data: PatientData | DoctorData) => (
                    <div
                      key={data.id}
                      className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 transition-colors"
                      onClick={() => handleSelect(data, type)}
                    >
                      <div className="font-medium text-gray-900">
                        {data.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        ({data.phoneNumber.number})
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          {/* No patient results message */}
          {showSuggestions[type] &&
            pDName[type].length > 0 &&
            (type === "patient" ? filteredPatients : filteredDoctors).length ===
              0 && (
              <Card className="absolute top-full left-0 right-0 z-50 mt-1">
                <CardContent className="p-3 text-gray-500 text-center">
                  No {type} found matching "{pDName[type]}"
                </CardContent>
              </Card>
            )}
        </div>
      </div>
    </div>
  );
};

export default AutocompleteInput;
