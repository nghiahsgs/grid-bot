import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Controller, useForm } from "react-hook-form";
import { ILogin } from "@/types/authenticate";
import { FormHelperText } from "@/components/modal-waiting-order";
import useAuthentication from "@/hooks/useAuthentication";
import { useRouter } from "next/router";
import { LocalStorageService } from "@/utils/storage";
import { ROUTES } from "@/constants/route";

function Login() {
  const { control, handleSubmit } = useForm<ILogin>();
  const { login } = useAuthentication();
  const route = useRouter();

  const onSubmit = (data: ILogin) => {
    login.mutate(data, {
      onSuccess: (data) => {
        LocalStorageService.setAccessToken(data);
        route.push(ROUTES.ORDER);
      },
    });
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
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            loading={login.isLoading}
          >
            Log in
          </Button>
        </Form.Item>

        <Form.Item style={{ textAlign: "center", width: "100%" }}>
          <Typography.Link onClick={() => route.push(ROUTES.REGISTER)}>
            Register
          </Typography.Link>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;

Login.getLayout = function getLayout() {
  return <Login />;
};
