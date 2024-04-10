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
  const { data } = useGetMaster();
  const setMasterData = useSetRecoilState(masterDataState);
  const { control, handleSubmit } = useForm<IRegister>();
  const { register } = useAuthentication();
  const route = useRouter();
  const roleOptions: SelectProps["options"] = useMemo(() => {
    const array = data?.user_role
      ? data?.user_role.map((item) => ({
          label: item,
          value: item,
        }))
      : [];
    return array;
  }, [data]);

  useEffect(() => {
    if (data) {
      setMasterData(data);
    }
  }, [data, setMasterData]);

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
            rules={{ required: "Please select role!" }}
            name="user_role"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <Select options={roleOptions} {...field} />
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
