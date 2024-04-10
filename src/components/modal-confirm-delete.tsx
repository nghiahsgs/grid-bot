import React from "react";
import { IModalProps } from "./modal-waiting-order";
import { Modal } from "antd";

interface IModalConfirm extends Omit<IModalProps, "title" | "data"> {
  title: string;
}

function ModalConfirmDelete({
  handleOk,
  handleCancel,
  ...props
}: IModalConfirm) {
  return (
    <Modal {...props} onOk={() => handleOk()} onCancel={() => handleCancel()} />
  );
}

export default ModalConfirmDelete;
