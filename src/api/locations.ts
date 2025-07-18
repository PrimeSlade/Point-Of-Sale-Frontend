import axiosInstance from "@/axiosInstance";

const fetchLocations = async () => {
  try {
    const { data } = await axiosInstance.get("/locations");

    return data.data;
  } catch (error: any) {
    console.log(error.response?.data);
    throw new Error(error.response?.data.error.message);
  }
};

const deleteLocations = async (id: number) => {
  const { data } = await axiosInstance.delete(`/locations:${id}`);

  if (!data.success) throw new Error(data.error.message);

  return data.data;
};

export { fetchLocations, deleteLocations };
