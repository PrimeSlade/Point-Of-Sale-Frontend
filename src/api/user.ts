import axiosInstance from "@/axiosInstance";

const fetchUser = async () => {
  try {
    const { data } = await axiosInstance.get("/users/me");

    return data.data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

export { fetchUser };
