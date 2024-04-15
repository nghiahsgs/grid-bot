import React, { useEffect, useMemo } from "react";
import { Form, Input, Button, Typography, SelectProps, Select } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Controller, useForm } from "react-hook-form";
import { IRegister } from "@/types/authenticate";
import { FormHelperText } from "@/components/modal-waiting-order";
import useAuthentication from "@/hooks/useAuthentication";
import { useRouter } from "next/router";
import { ROUTES } from "@/constants/route";
import useGetMaster from "@/hooks/useGetMaster";
import { useSetRecoilState } from "recoil";
import masterDataState from "@/stores/masterData";

function Register() {
  const { control, handleSubmit } = useForm<IRegister>();
  const { register } = useAuthentication();
  const route = useRouter();

  const onSubmit = (data: IRegister) => {
    register.mutate(data, { onSuccess: () => route.push(ROUTES.LOGIN) });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "white",
      }}
    >
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={handleSubmit(onSubmit)}
        style={{ width: 300 }}
      >
        <Form.Item>
          <Controller
            rules={{ required: "Please input your username!" }}
            name="username"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Username"
                  {...field}
                />
                <FormHelperText error={fieldState.error?.message}>
                  {fieldState.error?.message}
                </FormHelperText>
              </>
            )}
          />
        </Form.Item>
        <Form.Item>
          <Controller
            rules={{ required: "Please input your password!" }}
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                  {...field}
                />
                <FormHelperText error={fieldState.error?.message}>
                  {fieldState.error?.message}
                </FormHelperText>
              </>
            )}
          />
        </Form.Item>
        <Form.Item>
          <Controller
            rules={{ required: "Please input your access key!" }}
            name="access_key"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <Input placeholder="Access Key" {...field} />
                <FormHelperText error={fieldState.error?.message}>
                  {fieldState.error?.message}
                </FormHelperText>
              </>
            )}
          />
        </Form.Item>
        <Form.Item>
          <Controller
            rules={{ required: "Please input your secret key!" }}
            name="secret_key"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <Input placeholder="Secret Key" {...field} />
                <FormHelperText error={fieldState.error?.message}>
                  {fieldState.error?.message}
                </FormHelperText>
              </>
            )}
          />
        </Form.Item>
        <Form.Item>
          <Controller
            name="group_telegram_chat_id"
            control={control}
            render={({ field }) => (
              <Input placeholder="Group telegram id" {...field} />
            )}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            loading={register.isLoading}
          >
            Register
          </Button>
        </Form.Item>

        <Form.Item style={{ textAlign: "center", width: "100%" }}>
          <Typography.Link onClick={() => route.push(ROUTES.LOGIN)}>
            Login
          </Typography.Link>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;

Register.getLayout = function getLayout() {
  return <Register />;
};
