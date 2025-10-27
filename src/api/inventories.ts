import axiosInstance from "@/axiosInstance";
import type { CreateItem, EditItem } from "@/types/ItemType";

const addItem = async ({ item, itemUnits }: CreateItem) => {
  try {
    const { data } = await axiosInstance.post("/items/add", {
      item,
      itemUnits,
    });

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const getItems = async (
  pageIndex: number,
  pageSize: number,
  search: string,
  filter: string
) => {
  try {
    const { data } = await axiosInstance.get(
      `/items?page=${pageIndex}&limit=${pageSize}&search=${search}${
        filter !== "__all" ? `&filter=${filter}` : ""
      }`
    );

    return data;
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

const editItemById = async ({ id, item, itemUnits }: EditItem) => {
  try {
    const { data } = await axiosInstance.put(`/items/${id}`, {
      item,
      itemUnits,
    });

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const deleteItemById = async (id: number) => {
  try {
    const { data } = await axiosInstance.delete(`/items/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const importItems = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const { data } = await axiosInstance.post("/items/import", formData);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const exportItems = async () => {
  try {
    const { data } = await axiosInstance.get("/items/export", {
      responseType: "blob", //or else it will try to convert json and file will corrupt
    });

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

const getItemHistoriesById = async (id: number) => {
  try {
    const { data } = await axiosInstance.get(`/items/${id}/histories`);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.error.message);
  }
};

export {
  addItem,
  getItems,
  getItemById,
  deleteItemById,
  editItemById,
  importItems,
  exportItems,
  getItemHistoriesById,
};
