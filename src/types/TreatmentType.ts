import type { Doctor } from "./DoctorType";
import type { PatientData } from "./PatientType";

type TreatmentData = {
  id: number;
  createdAt: string; // ISO date string
  doctorId: string; // UUID string
  patientId: number;
  diagnosis: string;
  treatment: string;
  doctor?: Doctor;
  patient?: PatientData;
};

export type { TreatmentData };
