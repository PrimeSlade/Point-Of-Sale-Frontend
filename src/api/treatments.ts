import axiosInstance from "@/axiosInstance";
import type { TreatmentForm } from "@/types/TreatmentType";

const addTreatment = async (input: TreatmentForm) => {
  try {
    const { data } = await axiosInstance.post("/treatments/add", input);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const getTreatments = async (
  pageIndex: number,
  pageSize: number,
  search: string,
  startDate?: string,
  endDate?: string
) => {
  try {
    const { data } = await axiosInstance.get(
      `/treatments?page=${pageIndex}&limit=${pageSize}&search=${search}${
        startDate && endDate ? `&startDate=${startDate}&endDate=${endDate}` : ""
      }`
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const getTreatmentByCursor = async (
  cursor: string | null,
  limit: number,
  patientName: string,
  doctorName: string,
  location: string
) => {
  try {
    //await new Promise(resolve => setTimeout(resolve, 2000));

    const { data } = await axiosInstance.get(
      `/treatments/infinite?cursor=${cursor}&limit=${limit}&patientName=${patientName}&doctorName=${doctorName}&location=${
        location === "__all" ? "" : location
      }`
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const getTreatmentById = async (id: number) => {
  try {
    const { data } = await axiosInstance.get(`/treatments/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const editTreatmentById = async (input: TreatmentForm) => {
  try {
    const { data } = await axiosInstance.put(`/treatments/${input.id}`, input);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const deleteTreatmentById = async (id: number) => {
  try {
    const { data } = await axiosInstance.delete(`/treatments/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};
export {
  addTreatment,
  getTreatments,
  getTreatmentById,
  editTreatmentById,
  deleteTreatmentById,
  getTreatmentByCursor,
};
