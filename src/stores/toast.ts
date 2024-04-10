import { ToastType } from "@/components/alert";
import { atom } from "recoil";

export interface IToast {
  type: ToastType;
  message: string;
}

const toastState = atom<IToast>({
  key: "toastState",
  default: {
    type: "info",
    message: "",
  },
});

export default toastState;
