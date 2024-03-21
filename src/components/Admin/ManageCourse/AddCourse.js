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
const AddCourse = (props) => {
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
    addCategory(
      values?.title,
      values?.price,
      values?.category,
      values?.duration
    );
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
          <div className="form__avatar">
            <label htmlFor="">
              Ảnh khóa học <span className="validate">*</span>
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
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Giá"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Trường này không được để trống!",
                },
              ]}
            >
              <InputNumber
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
            <Form.Item label="Chủ đề" name="category">
              <Select>
                {category &&
                  category?.length > 0 &&
                  category?.map((item, index) => {
                    return (
                      <Select.Option value={`${item?._id}`}>
                        {item?.title}
                      </Select.Option>
                    );
                  })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Thời lượng"
              name="duration"
              rules={[
                {
                  required: true,
                  message: "Trường này không được để trống!",
                },
              ]}
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
export default memo(AddCourse);
