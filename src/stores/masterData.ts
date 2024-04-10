import { IMasterData } from "@/types/masterData";
import { atom } from "recoil";

const masterDataState = atom<IMasterData>({
  key: "masterDataState",
  default: {
    supply_company: [],
    payment_gateway: [],
    user_role: [],
    shop_platform: [],
  },
});

export default masterDataState;
