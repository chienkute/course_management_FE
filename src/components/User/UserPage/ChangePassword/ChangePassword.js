import { memo, useEffect } from "react";
import "./ChangePassword.scss";
import UserPage from "../UserPage";
import { Button, Form, Input } from "antd";
import { changePassword } from "service/UserService";
import { toast } from "react-toastify";
const ChangePassword = () => {
  const updatePassword = async (oldPassword, newPassword) => {
    let res = await changePassword(oldPassword, newPassword);
    if (res) {
      console.log(res);
    }
  };
  const onFinish = async (values) => {
    let res = await updatePassword(values.oldPassword, values.newPassword);
    if (res) {
      console.log(res);
      toast.success("Đổi mật khẩu thành công");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {}, []);
  return (
    <div className="UserPageContainer">
      <div className="UserPageContent">
        <UserPage></UserPage>
        <div className="changepassword">
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
          >
            <Form.Item
              label="Mật khẩu cũ"
              name="oldPassword"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu cũ của bạn!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Mật khẩu mới"
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu mới của bạn!",
                },
              ]}
              hasFeedback
              className="register_container_input"
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Xác nhận mật khẩu mới"
              name="confirm"
              dependencies={["newPassword"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập lại mật khẩu xác nhận!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
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
                Đổi mật khẩu
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default memo(ChangePassword);
