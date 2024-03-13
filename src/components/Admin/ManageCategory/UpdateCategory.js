import { memo } from "react";
import { Modal, Form, Button, Input } from "antd";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ManageCategory.scss";
import { toast } from "react-toastify";
import avatar from "../../../assets/avatar.jpg";
import { setUpdated } from "redux/userSlice";
import { updateCategory } from "service/AdminService";
const UpdateCategory = (props) => {
  const [images, setImage] = useState("");
  const [imageUpdate, setImageUpdate] = useState([]);
  const [urlImage, setUrlImage] = useState("");
  const { open, handleEdit, title, image, key, id } = props;
  const state = useSelector((state) => state.changeTheme.updated);
  const dispatch = useDispatch();
  console.log(imageUpdate);
  const toDataURL = (url) =>
    fetch(urlImage)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );
  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  const changeFileObejct = () => {
    toDataURL(urlImage).then((dataUrl) => {
      var fileData = dataURLtoFile(dataUrl, "icon.jpg");
      setImageUpdate(fileData);
    });
  };
  useEffect(() => {
    changeFileObejct();
  }, [urlImage]);
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
    EditCategory(values?.title);
  };
  const EditCategory = async (title) => {
    let res = await updateCategory(title, imageUpdate, id);
    if (res) {
      toast.success("Bạn đã sửa thành công");
      handleUpdate();
      console.log(res);
    }
  };
  useEffect(() => {
    setUrlImage(image);
    setIsModalOpen(open);
    setImage("");
  }, [handleEdit]);
  return (
    <div key={key}>
      <Modal
        title="Chỉnh sửa chủ đề khóa học"
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
              {images ? (
                <img
                  src={images}
                  alt="BlogImg"
                  className="avatarAfter"
                  onClick={handleImageClick}
                ></img>
              ) : image ? (
                <img
                  src={image}
                  alt="BlogImg"
                  className="avatarBefore"
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
              initialValue={`${title}`}
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
export default memo(UpdateCategory);
