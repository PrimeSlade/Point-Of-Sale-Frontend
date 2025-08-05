import type { Doctor } from "./DoctorType";

type Treatment = {
  length: any;
  id: number;
  createdAt: string; // ISO date string
  doctorId: string; // UUID string
  patientId: number;
  diagnosis: string;
  treatment: string;
  doctor?: Doctor;
};

export type { Treatment };
