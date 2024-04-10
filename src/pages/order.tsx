import React, { useEffect, useMemo, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  SelectProps,
  Select,
} from "antd";
import { OrderItem } from "@/types/order";
import useGetOrder from "@/hooks/useGetOrders";
import { useRecoilValue } from "recoil";
import masterDataState from "@/stores/masterData";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text" | "select";
  record: OrderItem;
  index: number;
  children: React.ReactNode;
  options?: SelectProps["options"];
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  options,
  ...restProps
}) => {
  const inputNode = (inputType: string) => {
    if (inputType === "number") {
      return <InputNumber />;
    }
    if (inputType === "select" && options) {
      return <Select options={options} />;
    }
    return <Input />;
  };

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please input ${title}!`,
            },
          ]}
        >
          {inputNode(inputType)}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Order: React.FC = () => {
  const [form] = Form.useForm();
  const { data: orderData } = useGetOrder();
  const [data, setData] = useState(orderData || []);
  const [editingKey, setEditingKey] = useState("");
  const masterData = useRecoilValue(masterDataState);

  useEffect(() => {
    if (orderData) setData(orderData);
  }, [orderData]);

  const platformOptions: SelectProps["options"] = useMemo(() => {
    const array = masterData?.shop_platform
      ? masterData?.shop_platform.map((item) => ({
          label: item,
          value: item,
        }))
      : [];
    return array;
  }, [masterData]);

  const supplyCompanyOptions: SelectProps["options"] = useMemo(() => {
    const array = masterData?.supply_company
      ? masterData?.supply_company.map((item) => ({
          label: item,
          value: item,
        }))
      : [];
    return array;
  }, [masterData]);

  const paymentOptions: SelectProps["options"] = useMemo(() => {
    const array = masterData?.payment_gateway
      ? masterData?.payment_gateway.map((item) => ({
          label: item,
          value: item,
        }))
      : [];
    return array;
  }, [masterData]);

  const isEditing = (record: OrderItem) => record.id === editingKey;

  const edit = (record: Partial<OrderItem> & { id: string }) => {
    form.setFieldsValue({
      base_code: "",
      designer_id: "",
      designer_links: "",
      raw_data: "",
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as OrderItem;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "order_id",
    },
    {
      title: "Platform",
      dataIndex: "platform",
      editable: true,
    },
    {
      title: "Shop name",
      dataIndex: "shop_name",
    },
    {
      title: "Sku",
      dataIndex: "sku",
    },
    {
      title: "Base cost",
      dataIndex: "base_cost",
      editable: true,
    },
    {
      title: "Driver link",
      dataIndex: "original_driver_link",
    },
    {
      title: "Designer Name",
      dataIndex: "designer_name",
      editable: true,
    },
    {
      title: "Designer link",
      dataIndex: "designer_links",
      editable: true,
    },
    {
      title: "Data",
      dataIndex: "raw_data",
      editable: true,
    },
    {
      title: "Supply company",
      dataIndex: "supply_company",
      editable: true,
    },
    {
      title: "Payment gateway",
      dataIndex: "payment_gateway",
      editable: true,
    },
    {
      title: "",
      render: (_: any, record: OrderItem) => {
        const editable = isEditing(record);
        return editable ? (
          <span style={{ whiteSpace: "nowrap" }}>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: OrderItem) => ({
        record,
        inputType: getInputType(col.dataIndex),
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        options: getOptionData(col.dataIndex),
      }),
    };
  });

  const getInputType = (key: string) => {
    if (
      key === "platform" ||
      key === "supply_company" ||
      key === "payment_gateway"
    ) {
      return "select";
    }
    if (key === "base_cost") {
      return "number";
    }
    return "text";
  };

  const getOptionData = (key: string) => {
    if (key === "platform") return platformOptions;
    if (key === "supply_company") return supplyCompanyOptions;
    if (key === "payment_gateway") return paymentOptions;
    return undefined;
  };

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
      />
    </Form>
  );
};

export default Order;
