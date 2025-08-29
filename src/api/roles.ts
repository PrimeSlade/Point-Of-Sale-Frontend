import axiosInstance from "@/axiosInstance";
import type { RoleForm } from "@/types/RoleType";

const addRole = async (input: RoleForm) => {
  try {
    const { data } = await axiosInstance.post("/roles/add", input);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const getRoles = async () => {
  try {
    const { data } = await axiosInstance.get("/roles");

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const getRoleById = async (id: number) => {
  try {
    const { data } = await axiosInstance.get(`/roles/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const editRoleById = async (input: RoleForm) => {
  try {
    const { data } = await axiosInstance.put(`/roles/${input.id}`, input);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const deleteRoleById = async (id: number) => {
  try {
    const { data } = await axiosInstance.delete(`/roles/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

export { addRole, getRoles, getRoleById, editRoleById, deleteRoleById };
