import axiosInstance from "@/axiosInstance";

const fetchLocations = async () => {
  try {
    const { data } = await axiosInstance.get("/locations");

    return data.data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const deleteLocations = async (id: number) => {
  try {
    const { data } = await axiosInstance.delete(`/locations/${id}`);

    return data.data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

export { fetchLocations, deleteLocations };
