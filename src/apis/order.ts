import { API_URL } from "@/constants/api-url";

import api from "./config";
import { CreateGrid, GridItem } from "@/types/order";

export const getGrids = async () => {
  const response = await api.get<Array<GridItem>>(API_URL.GRIDS);
  return response.data;
};

export const createGrids = async (body: CreateGrid) => {
  const response = await api.post(API_URL.CREATE_GRID, body);
  return response.data;
};
