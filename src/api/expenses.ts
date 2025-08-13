import axiosInstance from "@/axiosInstance";
import type { ExpenseForm } from "@/types/ExpenseType";

const getExpenses = async () => {
  try {
    const { data } = await axiosInstance.get("/expenses");

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const addExpense = async (input: ExpenseForm) => {
  try {
    const { data } = await axiosInstance.post("/expenses/add", input);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const editExpenseById = async (input: ExpenseForm) => {
  try {
    const { data } = await axiosInstance.put(`/expenses/${input.id}`, input);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const deleteExpenseById = async (id: number) => {
  try {
    const { data } = await axiosInstance.delete(`/expenses/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

export { addExpense, getExpenses, editExpenseById, deleteExpenseById };
