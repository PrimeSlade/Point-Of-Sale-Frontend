import axiosInstance from "@/axiosInstance";
import type { LoginForm } from "@/types/AuthType";

const login = async (input: LoginForm) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", input);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const clearCookie = async () => {
  try {
    const { data } = await axiosInstance.post("/auth/logout");

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

export { login, clearCookie };
