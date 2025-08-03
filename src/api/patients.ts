import axiosInstance from "@/axiosInstance";
import type { PatientFormData } from "@/types/PatientType";

const addPatient = async (input: PatientFormData) => {
  try {
    const { data } = await axiosInstance.post("/patients/add", input);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const fetchPatients = async () => {
  try {
    const { data } = await axiosInstance.get("/patients");

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const editPatientById = async (input: PatientFormData) => {
  try {
    const { data } = await axiosInstance.put(`/patients/${input.id}`, input);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const deletePatientById = async (id: number) => {
  try {
    const { data } = await axiosInstance.delete(`/patients/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

export { addPatient, fetchPatients, editPatientById, deletePatientById };
