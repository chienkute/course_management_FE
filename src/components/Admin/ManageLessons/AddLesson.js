import { memo } from "react";
import { Modal, Form, Button, Input } from "antd";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ManageLessons.scss";
import { toast } from "react-toastify";
import { setUpdated } from "redux/userSlice";
import { updateVideo } from "service/AdminService";
const AddLesson = (props) => {
  const { open, handleEdit, id } = props;
  const [imageUpdate, setImageUpdate] = useState([]);
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
  const inputRef = useRef(null);

  const handleImageClick = () => {
    inputRef.current.click();
  };
  const handleImageChange = (event) => {
    setImageUpdate(event.target.files[0]);
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
    addCategory(values?.title);
  };
  const addCategory = async (title) => {
    let res = await updateVideo(title, imageUpdate, id);
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
    setImageUpdate("");
  }, [handleEdit]);
  return (
    <div>
      <Modal
        title="Thêm video khóa học"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <div className="user__container_form">
          <div className="form__avatar">
            <label htmlFor="" style={{ transform: "translateX(80px)" }}>
              Video <span className="validate">*</span>
            </label>
            <div className="video__image">
              <Button type="primary" onClick={handleImageClick}>
                Thêm video
              </Button>
              {imageUpdate ? (
                <p>{imageUpdate?.name}</p>
              ) : (
                <p>Chấp nhận các loại file mp4</p>
              )}
            </div>
            <input
              type="file"
              accept="video/mp4"
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
export default memo(AddLesson);
