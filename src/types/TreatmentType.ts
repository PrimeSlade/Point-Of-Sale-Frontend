import type { DoctorData } from "./DoctorType";
import type { PatientData } from "./PatientType";

type TreatmentData = {
  id?: number;
  createdAt: string; // ISO date string
  doctorId: string; // UUID string
  patientId: number;
  diagnosis?: string;
  treatment: string;
  doctor?: DoctorData;
  patient?: PatientData;
};

type TreatmentForm = {
  id?: number;
  doctorId: string;
  patientId: number;
  diagnosis?: string;
  treatment: string;
};

type DateRange = {
  startDate: Date | undefined;
  endDate: Date | undefined;
};

export type { TreatmentData, TreatmentForm, DateRange };
