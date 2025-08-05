import type { Location } from "./ItemType";
import type { PhoneNumber } from "./LocationType";
import type { Treatment } from "./TreatmentType";

type Gender = "male" | "female";
type PatientStatus = "new_patient" | "follow_up" | "post_op";
type PatientCondition = "disable" | "pregnant_woman";
type PatientType = "in" | "out";
type Department = "og" | "oto" | "surgery" | "general";

type PatientFormData = {
  id?: number;
  name: string;
  email?: string;
  gender: Gender;
  dateOfBirth: Date;
  address?: string;
  patientStatus: PatientStatus;
  patientCondition: PatientCondition;
  patientType: PatientType;
  department: Department;
  locationId: number;
  phoneNumber: string;
};

type PatientData = {
  id?: number;
  name: string;
  email?: string;
  gender: Gender;
  dateOfBirth: Date;
  address?: string;
  patientStatus: PatientStatus;
  patientCondition: PatientCondition;
  patientType: PatientType;
  department: Department;
  locationId: number;
  location: Location;
  phoneNumberId: number;
  phoneNumber: PhoneNumber;
  registeredAt: Date;
  treatments: Treatment[];
};

export type { PatientFormData, PatientData };
