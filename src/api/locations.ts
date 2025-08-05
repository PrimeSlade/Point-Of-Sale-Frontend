import axiosInstance from "@/axiosInstance";
import type { AddLocation, EditLocation } from "@/types/LocationType";

const addLocation = async (input: AddLocation) => {
  try {
    const { data } = await axiosInstance.post("/locations/add", input);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const getLocations = async () => {
  try {
    const { data } = await axiosInstance.get("/locations");

    return data.data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const editLocation = async ({ id, input }: EditLocation) => {
  try {
    const { data } = await axiosInstance.put(`/locations/${id}`, input);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const deleteLocation = async (id: number) => {
  try {
    const { data } = await axiosInstance.delete(`/locations/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

export { addLocation, getLocations, editLocation, deleteLocation };
