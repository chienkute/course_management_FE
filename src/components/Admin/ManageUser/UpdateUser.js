import { Modal, Form, Button, Select, Input } from "antd";
import { memo, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setUpdated } from "redux/userSlice";
import { adminUpdatedUser } from "service/AdminService";
const UpdateUser = (props) => {
  const state = useSelector((state) => state.changeTheme.updated);
  const dispatch = useDispatch();
  const handleUpdate = () => {
    const upadteValue = {
      updated: !state,
    };
    dispatch(setUpdated(upadteValue));
  };
  const { id, open, handleEdit, key, firstname, email, lastname, role, block } =
    props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(open);
  const handleClick = () => {
    inputRef.current.click();
  };
  const inputRef = useRef(null);
  const handleOk = () => {
    setIsModalOpen(false);
    handleClick();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
    updatedUserByAdmin(
      values?.first,
      values?.last,
      values?.mail,
      values?.role,
      values?.block
    );
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const updatedUserByAdmin = async (
    firstname,
    lastname,
    email,
    role,
    isBlocked
  ) => {
    let res = await adminUpdatedUser(
      { firstname, lastname, email, role, isBlocked },
      id
    );
    if (res?.sucess === true) {
      toast.success("Cập nhật thành công !!");
      handleUpdate();
      console.log(res);
    } else {
      toast.error("Cập nhật thất bại !!");
    }
  };
  useEffect(() => {
    setIsModalOpen(open);
  }, [handleEdit]);
  return (
    <div key={key}>
      <Modal
        title="Chỉnh sửa thông tin người dùng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Xác nhận sửa"
        cancelText="Hủy"
      >
        <div className="user__container_form">
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Họ"
              name="first"
              rules={[
                {
                  required: true,
                  message: "Trường này không được để trống!",
                },
              ]}
              initialValue={firstname}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Tên"
              name="last"
              rules={[
                {
                  required: true,
                  message: "Trường này không được để trống!",
                },
              ]}
              initialValue={lastname}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="mail"
              rules={[
                {
                  required: true,
                  message: "Trường này không được để trống!",
                },
              ]}
              initialValue={email}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Vai trò" name="role" initialValue={`${role}`}>
              <Select defaultValue={`${role}`}>
                <Select.Option value="user">user</Select.Option>
                <Select.Option value="admin">admin</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Trạng thái"
              name="block"
              initialValue={`${block}`}
            >
              <Select defaultValue={`${block}`}>
                <Select.Option value="true">Blocked</Select.Option>
                <Select.Option value="false">Active</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  display: "none",
                }}
                ref={inputRef}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};
export default memo(UpdateUser);
