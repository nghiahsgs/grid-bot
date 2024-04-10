import { LIST_COIN } from "@/constants/list-coin";
import useActionWaitingOrder from "@/hooks/useActionWaitingOrder";
import loadingState from "@/stores/loading";
import { EOrderType, IOrder } from "@/types/order";
import {
  AutoComplete,
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  ModalProps,
  Radio,
} from "antd";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

export interface IModalProps extends Omit<ModalProps, "title"> {
  handleOk: () => void;
  handleCancel: () => void;
  title: "Update order" | "Create order";
  data?: IOrder;
}

const initFormData = {
  order_type: EOrderType.BUY,
};

const ModalWaitingOrder: React.FC<IModalProps> = ({
  handleOk,
  handleCancel,
  data,
  ...props
}) => {
  const setLoadingState = useSetRecoilState(loadingState);
  const [options, setOptions] = useState<Array<{ value: string }>>(LIST_COIN);
  const { addOrder, updateOrder } = useActionWaitingOrder();
  const { control, handleSubmit, reset } = useForm<IOrder>({
    defaultValues: data || initFormData,
  });

  const getPanelValue = (searchText: string) =>
    !searchText ? LIST_COIN : filterOption(searchText);

  const filterOption = (searchText: string) => {
    const result = LIST_COIN.filter((item) =>
      item.value
        .replace("/USDT", "")
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
    return result;
  };

  const onSubmit = (data: IOrder) => {
    const formatData = formatDataSubmit(data);
    setLoadingState(true);
    if (props.title === "Create order") {
      addOrder.mutate(formatData, {
        onSuccess: () => {
          handleOk();
          reset();
        },
      });
    } else {
      updateOrder.mutate(formatData, {
        onSuccess: () => {
          handleOk();
          reset();
        },
      });
    }
  };

  const formatDataSubmit = (data: IOrder) => {
    const newData = { ...data };
    if (props.title === "Create order") {
      const conditions = (newData.conditions as string).split(", ");
      const coin_name = newData.coin_name.replace("/USDT", "");
      return { ...newData, conditions, coin_name };
    } else {
      return newData;
    }
  };

  return (
    <Modal {...props} footer={null}>
      <Form name="order" onFinish={handleSubmit(onSubmit)}>
        {props.title === "Create order" && (
          <Form.Item label="Coin name">
            <Controller
              rules={{ required: "Please select coin name!" }}
              name="coin_name"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <AutoComplete
                    {...field}
                    options={options}
                    onSearch={(text) => setOptions(getPanelValue(text))}
                  />
                  <FormHelperText error={fieldState.error?.message}>
                    {fieldState.error?.message}
                  </FormHelperText>
                </>
              )}
            />
          </Form.Item>
        )}
        {props.title === "Create order" && (
          <Form.Item label="Order type">
            <Controller
              name="order_type"
              control={control}
              render={({ field }) => (
                <Radio.Group {...field}>
                  <Radio value={EOrderType.BUY}>BUY</Radio>
                  <Radio value={EOrderType.SELL}>SELL</Radio>
                </Radio.Group>
              )}
            />
          </Form.Item>
        )}
        {props.title === "Create order" && (
          <Form.Item label="Conditions">
            <Controller
              rules={{ required: "Please input conditions!" }}
              name="conditions"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Input.TextArea
                    {...field}
                    value={field.value && field.value.toString()}
                  />
                  <FormHelperText error={fieldState.error?.message}>
                    {fieldState.error?.message}
                  </FormHelperText>
                </>
              )}
            />
          </Form.Item>
        )}
        <Form.Item label="Volume">
          <Controller
            rules={{ required: "Please input volume!" }}
            name="volume"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <InputNumber
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  {...field}
                />
                <FormHelperText error={fieldState.error?.message}>
                  {fieldState.error?.message}
                </FormHelperText>
              </>
            )}
          />
        </Form.Item>
        <Form.Item label="Note">
          <Controller
            name="note"
            control={control}
            render={({ field }) => <Input.TextArea {...field} />}
          />
        </Form.Item>
        <BottomButton>
          <Form.Item>
            <Button style={{ width: "100%" }} onClick={handleCancel}>
              Cancel
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              {props.title}
            </Button>
          </Form.Item>
        </BottomButton>
      </Form>
    </Modal>
  );
};

export default ModalWaitingOrder;

const BottomButton = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export const FormHelperText = styled.div<{ error?: string }>`
  display: ${({ error }) => (error ? "block" : "none")};
  color: #ff0000;
  font-size: 12px;
`;
