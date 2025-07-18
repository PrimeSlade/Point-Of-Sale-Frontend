import axiosInstance from "@/axiosInstance";
import type { AddLocation } from "@/types/LocationType";

const addLocation = async (input: AddLocation) => {
  try {
    const { data } = await axiosInstance.post("/locations/add", input);

    return data.data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const fetchLocations = async () => {
  try {
    const { data } = await axiosInstance.get("/locations");

    return data.data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const deleteLocation = async (id: number) => {
  try {
    const { data } = await axiosInstance.delete(`/locations/${id}`);

    return data.data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

export { addLocation, fetchLocations, deleteLocation };
