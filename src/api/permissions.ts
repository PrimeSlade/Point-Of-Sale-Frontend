import axiosInstance from "@/axiosInstance";

const getPermissions = async () => {
  try {
    const { data } = await axiosInstance.get("/permissions");

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

export { getPermissions };
