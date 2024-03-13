import { memo } from "react";
import { Modal, Form, Button, Input } from "antd";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ManageCategory.scss";
import { toast } from "react-toastify";
import avatar from "../../../assets/avatar.jpg";
import { setUpdated } from "redux/userSlice";
import { createCategory } from "service/AdminService";
const AddCategory = (props) => {
  const [image, setImage] = useState("");
  const [imageUpdate, setImageUpdate] = useState([]);
  const { open, handleEdit } = props;
  const state = useSelector((state) => state.changeTheme.updated);
  const dispatch = useDispatch();
  console.log(imageUpdate);
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
    addCategory(values?.title);
  };
  const addCategory = async (title) => {
    let res = await createCategory(title, imageUpdate);
    if (res) {
      handleUpdate();
      toast.success("Thêm mới thành công !!");
      console.log(res);
    }
  };
  useEffect(() => {
    setIsModalOpen(open);
    setImage("");
  }, [handleEdit]);
  return (
    <div>
      <Modal
        title="Thêm chủ đề khóa học"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <div className="user__container_form">
          <div className="form__avatar">
            <label htmlFor="">
              Ảnh chủ đề <span className="validate">*</span>
            </label>
            <div className="form__image">
              {image ? (
                <img
                  src={image}
                  alt="BlogImg"
                  className="avatarAfter"
                  onClick={handleImageClick}
                ></img>
              ) : (
                <img
                  src={avatar}
                  alt="BlogImg"
                  className="avatarBefore"
                  onClick={handleImageClick}
                ></img>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={inputRef}
              onChange={handleImageChange}
            />
          </div>
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
              initialValue={""}
            >
              <Input />
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
export default memo(AddCategory);
