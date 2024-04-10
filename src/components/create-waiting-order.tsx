import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import ModalWaitingOrder from "./modal-waiting-order";

function CreateWaitingOrder() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Container>
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={showModal}
        >
          Create
        </Button>
      </Container>
      <ModalWaitingOrder
        title="Create order"
        open={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        onCancel={handleCancel}
      />
    </>
  );
}

export default CreateWaitingOrder;

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
`;
