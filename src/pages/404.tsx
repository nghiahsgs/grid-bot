import React from "react";
import { Button, Result } from "antd";

const Custom404 = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    style={{ background: "white", height: "100vh" }}
    extra={
      <Button type="primary" href="/">
        Back Home
      </Button>
    }
  />
);

export default Custom404;

Custom404.getLayout = function getLayout() {
  return <Custom404 />;
};
