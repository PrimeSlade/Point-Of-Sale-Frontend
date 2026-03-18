import axiosInstance from "@/axiosInstance";
import type { DoctorFormData } from "@/types/DoctorType";

const addDoctor = async (input: DoctorFormData) => {
  try {
    const { data } = await axiosInstance.post("/doctors/add", input);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const getDoctors = async () => {
  try {
    const { data } = await axiosInstance.get("/doctors");

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const editDoctorById = async (input: DoctorFormData) => {
  try {
    const { data } = await axiosInstance.put(`/doctors/${input.id}`, input);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const deleteDoctorById = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/doctors/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

export { addDoctor, getDoctors, editDoctorById, deleteDoctorById };
