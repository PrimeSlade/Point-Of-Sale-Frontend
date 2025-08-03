type Treatment = {
  id: number;
  createdAt: string; // ISO date string
  doctorId: string; // UUID string
  patientId: number;
  diagnosis: string;
  treatment: string;
};

export type { Treatment };
