import axiosInstance from "@/axiosInstance";
import type { ServiceData } from "@/types/ServiceType";

const fetchServices = async () => {
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

const editService = async (input: ServiceData) => {
  try {
    const { data } = await axiosInstance.put(`/services/${input.id}`, input);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const deleteService = async (id: number) => {
  try {
    const { data } = await axiosInstance.delete(`/services/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

export { addService, fetchServices, editService, deleteService };
