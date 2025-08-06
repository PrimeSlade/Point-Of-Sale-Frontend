import axiosInstance from "@/axiosInstance";
import type { TreatmentData } from "@/types/TreatmentType";

const addTreatment = async (input: TreatmentData) => {
  try {
    const { data } = await axiosInstance.post("/treatments/add", input);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const getTreatments = async () => {
  try {
    const { data } = await axiosInstance.get("/treatments");

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};
