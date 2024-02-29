import { memo } from "react";
import "./Login.scss";
import React from "react";
import { Button, Form, Input, Checkbox } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { login } from "service/UserService";
import { toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    let res = await login(values.username, values.password);
    if (res?.sucess === true) {
      localStorage.setItem("token", res?.accessToken);
      localStorage.setItem("user", JSON.stringify(res?.user));
      toast.success("Đăng nhập thành công");
      navigate("/");
    } else {
      toast.error("Đăng nhập thất bại");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="login">
      <div className="login_form">
        <h1 className="red">Đăng nhập</h1>
        <Form
          name="normal_login"
          className="login-form login_container"
          size="large"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <p className="login_container_header">
            Xin chào, Chào mừng bạn trở lại!
          </p>
          <Form.Item
            label="Tài khoản"
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tài khoản của bạn!",
              },
            ]}
            className="login_container_input"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu của bạn!",
              },
            ]}
            hasFeedback
            className="login_container_input"
          >
            <Input.Password />
          </Form.Item>
          <Form.Item className="login_container_text">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Lưu đăng nhập</Checkbox>
            </Form.Item>
            <Link className="login_container_forgot">Quên mật khẩu</Link>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              className="login_container_button"
            >
              Đăng nhập
            </Button>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
            className="login_container_login"
          >
            <p>Bạn chưa có tài khoản?</p>
            <Link to={"/register"}>Đăng kí ngay</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default memo(Login);
