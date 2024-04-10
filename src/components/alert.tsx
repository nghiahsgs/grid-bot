import React, { useEffect } from "react";
import { notification } from "antd";
import { useRecoilValue, useSetRecoilState } from "recoil";
import toastState from "@/stores/toast";

export type ToastType = "success" | "info" | "warning" | "error";

const Toast: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  const { type, message } = useRecoilValue(toastState);
  const setToastState = useSetRecoilState(toastState);

  const openNotificationWithIcon = () => {
    api[type]({
      message: message,
    });
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (message) {
      timer = setTimeout(
        () => setToastState({ type: "info", message: "" }),
        2000
      );
      openNotificationWithIcon();
    }
    return () => {
      clearTimeout(timer);
    };
  });

  return <>{contextHolder}</>;
};

export default Toast;
