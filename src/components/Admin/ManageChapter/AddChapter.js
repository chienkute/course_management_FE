import { memo } from "react";
import { Modal, Form, Button, Input } from "antd";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ManageCourse.scss";
import { toast } from "react-toastify";
import { setUpdated } from "redux/userSlice";
import { createChapter } from "service/AdminService";
const { TextArea } = Input;
const AddChapter = (props) => {
  const { open, handleEdit } = props;
  const state = useSelector((state) => state.changeTheme.updated);
  const dispatch = useDispatch();
  const handleUpdate = () => {
    const upadteValue = {
      updated: !state,
    };
    dispatch(setUpdated(upadteValue));
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClick = () => {
    addRef.current.click();
  };
  const addRef = useRef(null);
  const handleOk = () => {
    setIsModalOpen(false);
    handleClick();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
    addCategory(values?.title, values?.description);
  };
  const addCategory = async (title, description) => {
    let res = await createChapter(title, description);
    if (res) {
      handleUpdate();
      toast.success("Thêm mới thành công !!");
      console.log(res);
    } else {
      toast.error("Thêm thất bại");
    }
  };
  useEffect(() => {
    setIsModalOpen(open);
  }, [handleEdit]);
  return (
    <div>
      <Modal
        title="Thêm chương mới của khóa"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Xác nhận"
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
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Tiêu đề"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Trường này không được để trống!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mô tả"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Trường này không được để trống!",
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  display: "none",
                }}
                ref={addRef}
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
export default memo(AddChapter);
