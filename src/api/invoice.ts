import axiosInstance from "@/axiosInstance";
import type { InvoiceForm } from "@/types/InvoiceType";

const addInvoice = async (input: InvoiceForm) => {
  try {
    const { data } = await axiosInstance.post("/invoices/add", input);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const getInvoices = async (
  pageIndex: number,
  pageSize: number,
  search: string,
  startDate?: Date,
  endDate?: Date
) => {
  try {
    const { data } = await axiosInstance.get(
      `/invoices?page=${pageIndex}&limit=${pageSize}&search=${search}${
        startDate && endDate ? `&startDate=${startDate}&endDate=${endDate}` : ""
      }`
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const getInvoiceById = async (id: number) => {
  try {
    const { data } = await axiosInstance.get(`/invoices/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const deleteInvoiceById = async (id: number) => {
  try {
    const { data } = await axiosInstance.delete(`/invoices/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

export { addInvoice, getInvoices, getInvoiceById, deleteInvoiceById };
