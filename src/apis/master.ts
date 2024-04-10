import { API_URL } from "@/constants/api-url";

import api from "./config";
import { IMasterData } from "@/types/masterData";

export const getMasterData = async () => {
  const response = await api.get<IMasterData>(API_URL.MASTER_DATA);
  return response.data;
};
