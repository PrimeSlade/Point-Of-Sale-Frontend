import axiosInstance from "@/axiosInstance";
import type { ServiceData } from "@/types/ServiceType";

const getServices = async () => {
  try {
    const { data } = await axiosInstance.get("/services");

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const addService = async (input: ServiceData) => {
  try {
    const { data } = await axiosInstance.post("/services/add", input);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const editServiceById = async (input: ServiceData) => {
  try {
    const { data } = await axiosInstance.put(`/services/${input.id}`, input);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const deleteServiceById = async (id: number) => {
  try {
    const { data } = await axiosInstance.delete(`/services/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

export { addService, getServices, editServiceById, deleteServiceById };
