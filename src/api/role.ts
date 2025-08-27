import axiosInstance from "@/axiosInstance";

const getRoles = async () => {
  try {
    const { data } = await axiosInstance.get("/roles");

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

export { getRoles };
