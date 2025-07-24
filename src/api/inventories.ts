import axiosInstance from "@/axiosInstance";
import type { CreateItem } from "@/types/ItemType";

const addItem = async ({ item, itemUnits }: CreateItem) => {
  try {
    const { data } = await axiosInstance.post("/items/add", {
      item,
      itemUnits,
    });

    return data.data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const getItems = async () => {
  try {
    const { data } = await axiosInstance.get("/items");

    return data.data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const getItemById = async (id: number) => {
  try {
    const { data } = await axiosInstance.get(`/items/${id}`);

    return data.data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const deleteItem = async (id: number) => {
  try {
    const { data } = await axiosInstance.delete(`/items/${id}`);

    return data.data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

export { addItem, getItems, getItemById, deleteItem };
