import React, { useState } from "react";
import { Button, Form, InputNumber, Popconfirm, Table, Typography } from "antd";
import { OrderItem } from "@/types/order";
import { fakeDataOrderItem } from "@/mock/order";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  record: OrderItem;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = <InputNumber />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Order: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(fakeDataOrderItem);
  const [editingKey, setEditingKey] = useState<number | undefined>(undefined);

  const isEditing = (record: OrderItem) => record.id === editingKey;

  const edit = (record: Partial<OrderItem>) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey(undefined);
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
        setEditingKey(undefined);
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey(undefined);
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Coin Name",
      dataIndex: "coin_name",
    },
    {
      title: "Current Price",
      dataIndex: "current_price",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Entry price",
      editable: true,
      children: [
        {
          title: "Volume",
          dataIndex: "entry_volume",
          editable: true,
        },
        {
          title: "Price",
          dataIndex: "entry_price",
          editable: true,
        },
      ],
    },
    {
      title: "DCA Price 1",
      editable: true,
      children: [
        {
          title: "Volume",
          dataIndex: "dca_volume_1",
          editable: true,
        },
        {
          title: "Price",
          dataIndex: "dca_price_1",
          editable: true,
        },
      ],
    },
    {
      title: "DCA Price 2",
      editable: true,
      children: [
        {
          title: "Volume",
          dataIndex: "dca_volume_2",
          editable: true,
        },
        {
          title: "Price",
          dataIndex: "dca_price_2",
          editable: true,
        },
      ],
    },
    {
      title: "DCA Price 3",
      editable: true,
      children: [
        {
          title: "Volume",
          dataIndex: "dca_volume_3",
          editable: true,
        },
        {
          title: "Price",
          dataIndex: "dca_price_3",
          editable: true,
        },
      ],
    },
    {
      title: "Take Profit",
      dataIndex: "take_profit",
    },
    {
      title: "Stop Loss",
      dataIndex: "stop_loss",
    },
    {
      title: "",
      width: "80px",
      render: (_: any, record: OrderItem) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
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
            disabled={editingKey !== undefined}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mapColumns = (col: any) => {
    if (!col.editable) {
      return col;
    }
    const newCol = {
      ...col,
      onCell: (record: OrderItem) => ({
        record,
        editing: isEditing(record),
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
    if (col.children) {
      newCol.children = col.children.map(mapColumns);
    }
    return newCol;
  };

  const mergedColumns = columns.map(mapColumns);

  return (
    <>
      <Button onClick={() => {}} type="primary" style={{ marginBottom: 16 }}>
        Add a new config
      </Button>
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
    </>
  );
};

export default Order;
