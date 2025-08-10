import axiosInstance from "@/axiosInstance";

const getDoctors = async () => {
  try {
    const { data } = await axiosInstance.get("/doctors");

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

export { getDoctors };
