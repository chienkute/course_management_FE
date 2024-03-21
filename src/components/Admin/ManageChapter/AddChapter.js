import { memo } from "react";
import { Modal, Form, Button, Input, Select, InputNumber } from "antd";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ManageCourse.scss";
import { toast } from "react-toastify";
import avatar from "../../../assets/avatar.jpg";
import { setUpdated } from "redux/userSlice";
import { createCourse } from "service/AdminService";
import { getCategories } from "service/UserService";
const { TextArea } = Input;
const AddChapter = (props) => {
  const [image, setImage] = useState("");
  const [category, setCategory] = useState([]);
  const [imageUpdate, setImageUpdate] = useState([]);
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
  const handleImageClick = () => {
    inputRef.current.click();
  };
  const handleImageChange = (event) => {
    setImageUpdate(event.target.files[0]);
    setImage(URL.createObjectURL(event.target.files[0]));
  };
  const inputRef = useRef(null);
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
  const addCategory = async (title, price, category, duration) => {
    let res = await createCourse(title, price, imageUpdate, duration, category);
    if (res) {
      handleUpdate();
      toast.success("Thêm mới thành công !!");
      console.log(res);
    } else {
      toast.error("Thêm thất bại");
    }
  };
  const getAllCategory = async () => {
    let res = await getCategories();
    if (res) {
      setCategory(res?.data);
    }
  };
  useEffect(() => {
    setIsModalOpen(open);
    setImage("");
    getAllCategory();
  }, [handleEdit]);
  return (
    <div>
      <Modal
        title="Thêm khóa học"
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
