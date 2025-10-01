import axiosInstance from "@/axiosInstance";
import type { ExpenseForm } from "@/types/ExpenseType";

const getExpenses = async (
  pageIndex: number,
  pageSize: number,
  search: string,
  startDate?: Date,
  endDate?: Date,
  filter?: string
) => {
  try {
    const { data } = await axiosInstance.get(
      `/expenses?page=${pageIndex}&limit=${pageSize}&search=${search}${
        startDate && endDate ? `&startDate=${startDate}&endDate=${endDate}` : ""
      }${filter ? `&filter=${filter}` : ""}`
    );

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

const getReportExpenses = async (startDate: Date, endDate: Date) => {
  try {
    const { data } = await axiosInstance.get(
      `/expenses/reports?&startDate=${startDate}&endDate=${endDate}`
    );

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

export { addExpense, getExpenses, getReportExpenses, editExpenseById, deleteExpenseById };
