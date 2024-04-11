import { LIST_COIN } from "@/constants/list-coin";
import useCreateGrid from "@/hooks/useCreateGrid";
import loadingState from "@/stores/loading";
import { CreateGrid } from "@/types/order";
import {
  AutoComplete,
  Button,
  Checkbox,
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

export interface IModalProps extends ModalProps {
  handleOk: () => void;
  handleCancel: () => void;
}

const initFormData = {};

const ModalWaitingOrder: React.FC<IModalProps> = ({
  handleOk,
  handleCancel,
  ...props
}) => {
  const setLoadingState = useSetRecoilState(loadingState);
  const [options, setOptions] = useState<Array<{ value: string }>>(LIST_COIN);
  const createGrid = useCreateGrid();
  const { control, handleSubmit, reset } = useForm<CreateGrid>({
    defaultValues: initFormData,
  });

  const getPanelValue = (searchText: string) =>
    !searchText ? LIST_COIN : filterOption(searchText);

  const filterOption = (searchText: string) => {
    const result = LIST_COIN.filter((item: any) =>
      item.value.toLowerCase().includes(searchText.toLowerCase())
    );
    return result;
  };

  const onSubmit = (data: CreateGrid) => {
    console.log({ onSubmit: data });
    const formatData = data;
    setLoadingState(true);
    createGrid.mutate(formatData, {
      onSuccess: () => {
        handleOk();
        reset();
      },
    });
  };

  return (
    <Modal {...props} footer={null}>
      <Form name="order" onFinish={handleSubmit(onSubmit)}>
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
        <Form.Item label="Candle stick">
          <Controller
            rules={{ required: "Please select candle stick!" }}
            name="candle_stick"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <Input {...field} />
                <FormHelperText error={fieldState.error?.message}>
                  {fieldState.error?.message}
                </FormHelperText>
              </>
            )}
          />
        </Form.Item>
        <Form.Item label="Entry dropout min percent">
          <Controller
            rules={{ required: "Please input entry dropout min percent!" }}
            name="entry_dropout_min_percent"
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
        <Form.Item label="DCA min percent">
          <Controller
            rules={{ required: "Please input dca min percent!" }}
            name="dca_min_percent"
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

        <Form.Item label="DCA volume">
          <Controller
            rules={{ required: "Please input dca volume!" }}
            name="dca_volume"
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

        <Form.Item label="Numbers of orders">
          <Controller
            rules={{ required: "Please input numbers of orders!" }}
            name="numbers_of_orders"
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

        <Form.Item label="Auto create next order">
          <Controller
            name="auto_create_next_order"
            control={control}
            render={({ field }) => <Checkbox {...field} />}
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
              Create
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
