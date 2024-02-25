import { memo } from "react";
import "./Register.scss";
import React from "react";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
const Register = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="register">
      <div className="register_form">
        <h1 className="red">Đăng ký trở thành học viên</h1>
        <div className="register_line"></div>
        <Form
          name="basic"
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
          className="register_container"
        >
          <Form.Item
            label="Họ"
            name="firstname"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập họ của bạn!",
              },
            ]}
            className="register_container_input"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tên"
            name="lastname"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên của bạn!",
              },
            ]}
            className="register_container_input"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tài khoản"
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tài khoản của bạn!",
              },
            ]}
            className="register_container_input"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "bạn nhập sai định dạng E-mail!",
              },
              {
                required: true,
                message: "Vui lòng nhập E-mail! của bạn",
              },
            ]}
            className="register_container_input"
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
            className="register_container_input"
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng nhập lại mật khẩu xác nhận!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu không trùng khớp!")
                  );
                },
              }),
            ]}
            className="register_container_input"
          >
            <Input.Password />
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
              className="register_container_button"
            >
              Đăng kí
            </Button>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
            className="register_container_login"
          >
            <p>Bạn đã có tài khoản?</p>
            <Link to={"/login"}>Đăng nhập</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default memo(Register);
