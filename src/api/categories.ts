import axiosInstance from "@/axiosInstance";
import type { CategoryForm } from "@/types/ExpenseType";

const getCategories = async () => {
  try {
    const { data } = await axiosInstance.get("/categories");

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const addCategory = async (input: CategoryForm) => {
  try {
    const { data } = await axiosInstance.post("/categories/add", input);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const editCategoryById = async (input: CategoryForm) => {
  try {
    const { data } = await axiosInstance.put(`/categories/${input.id}`, input);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const deleteCategoryById = async (id: number) => {
  try {
    const { data } = await axiosInstance.delete(`/categories/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

export { addCategory, getCategories, editCategoryById, deleteCategoryById };
