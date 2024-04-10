import { API_URL } from "@/constants/api-url";

import api from "./config";
import { OrderItem } from "@/types/order";

export const getListOrder = async () => {
  const response = await api.get<Array<OrderItem>>(API_URL.ORDER);
  return response.data;
};
