import axiosInstance from "@/axiosInstance";
import type { UserForm } from "@/types/UserType";

const getMe = async () => {
  try {
    const { data } = await axiosInstance.get("/users/me");

    return data.data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const addUser = async (input: UserForm) => {
  try {
    const { data } = await axiosInstance.post("/users/add", input);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const getUsers = async () => {
  try {
    const { data } = await axiosInstance.get("/users");
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const editUserById = async (input: UserForm) => {
  try {
    const { data } = await axiosInstance.put(`/users/${input.id}`, input);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const deleteUserById = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/users/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

export { getMe, addUser, getUsers, editUserById, deleteUserById };
