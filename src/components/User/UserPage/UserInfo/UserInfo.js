import { memo, useEffect, useState, React } from "react";
import "../../UserPage/UserPage.scss";
// import { toast } from "react-toastify";
import { Button, Form, Input } from "antd";
import { MdPhotoCamera } from "react-icons/md";
import { useRef } from "react";
import avatar from "../../../../assets/avatar.jpg";
import UserPage from "../UserPage";
import { getUser, updateInformation } from "service/UserService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const UserInfo = () => {
  const [user, setUser] = useState([]);
  const [edit, setEdit] = useState(false);
  const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const [imageUpdate, setImageUpdate] = useState([]);
  const [formData, setFormData] = useState(new FormData());
  const [urlImage, setUrlImage] = useState("");
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
  const handleImageClick = () => {
    inputRef.current.click();
  };
  useEffect(() => {
    if (imageUpdate !== null) {
      const updatedFormData = new FormData();
      updatedFormData.append("avatar", imageUpdate);
      setFormData(updatedFormData);
    }
  }, [imageUpdate]);
  const handleImageChange = (event) => {
    setImageUpdate(event.target.files[0]);
    setImage(URL.createObjectURL(event.target.files[0]));
  };
  const getUserInfo = async () => {
    let res = await getUser();
    if (res) {
      setUser(res?.data);
      setUrlImage(res?.data?.avatar);
    }
  };
  const onFinish = async (values) => {
    let res = await updateInformation(
      values?.firstname,
      values?.lastname,
      values?.skill,
      values?.mobile,
      values?.address,
      imageUpdate
    );
    if (res?.sucess === true) {
      toast.success("Cập nhật thành công");
      setEdit(false);
      getUserInfo();
      console.log(res);
    } else {
      toast.error("Cập nhật thất bại");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  const handleEdit = () => {
    setEdit(true);
  };
  return (
    <div className="UserPageContainer">
      <div className="UserPageContent">
        <UserPage></UserPage>
        <div className="UserInfo">
          <div className="UserInfoHeader">
            <h3>
              <b>Hồ sơ</b>
            </h3>
            {edit ? (
              <div></div>
            ) : (
              <div className="UserInfoEdit">
                <b onClick={handleEdit}>Chỉnh sửa</b>
              </div>
            )}
          </div>
          <div className="UserBasicInfo">
            <div className="UserAvatar">
              {image ? (
                <img
                  src={image}
                  alt="BlogImg"
                  className="avatarAfter"
                  style={{
                    transform: "translateX(15px)",
                  }}
                ></img>
              ) : user?.avatar ? (
                <img
                  src={user?.avatar}
                  alt="BlogImg"
                  className="avatarBefore"
                ></img>
              ) : (
                <img src={avatar} alt="BlogImg" className="avatarBefore"></img>
              )}
              <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>
            {edit ? (
              <div
                className="upload__image"
                role="button"
                onClick={handleImageClick}
              >
                <MdPhotoCamera></MdPhotoCamera>
              </div>
            ) : (
              <div className="upload__image" role="button">
                <MdPhotoCamera></MdPhotoCamera>
              </div>
            )}

            <div className="UserAccount">
              <p>
                <b>
                  {user?.firstname} {user?.lastname}
                </b>
              </p>
              {user?.username ? (
                <p className="UserAccountName">{user?.username}</p>
              ) : (
                <p className="UserAccountName">---</p>
              )}
            </div>
          </div>
          {edit ? (
            <Form
              name="basic"
              // labelCol={{
              //   span: 8,
              // }}
              // wrapperCol={{
              //   span: 16,
              // }}
              // style={{
              //   maxWidth: 600,
              // }}
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
                name="firstname"
                initialValue={`${user?.firstname}`}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Tên"
                name="lastname"
                initialValue={`${user?.lastname}`}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Kỹ năng/Nghề nghiệp"
                name="skill"
                initialValue={`${user?.skill || ""}`}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                name="mobile"
                initialValue={`${user?.mobile || ""}`}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Địa chỉ"
                name="address"
                initialValue={`${user?.address || ""}`}
              >
                <Input />
              </Form.Item>
              <div className="user__button">
                <Link
                  onClick={() => {
                    setEdit(false);
                  }}
                >
                  Hủy
                </Link>
                <Form.Item
                  wrapperCol={{
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Sửa
                  </Button>
                </Form.Item>
              </div>
            </Form>
          ) : (
            <div className="UserPersonalInfo">
              <div className="ListPersonalInfos clear">
                <div className="PersonalInfo">
                  <p className="PersonalInfoHeader">
                    <b>Họ</b>
                  </p>
                  <p className="PersonalInfoData">{user?.firstname}</p>
                </div>
                <li className="PersonalInfo">
                  <p className="PersonalInfoHeader">
                    <b>Tên</b>
                  </p>
                  <p className="PersonalInfoData">{user?.lastname}</p>
                </li>
                <li className="PersonalInfo">
                  <p className="PersonalInfoHeader">
                    <b>Email</b>
                  </p>
                  <p className="PersonalInfoData">{user?.email}</p>
                </li>
                <li className="PersonalInfo">
                  <p className="PersonalInfoHeader">
                    <b>Kỹ năng/Ngề nghiệp</b>
                  </p>
                  <p className="PersonalInfoData">{user?.skill}</p>
                </li>
                <li className="PersonalInfo">
                  <p className="PersonalInfoHeader">
                    <b>Địa chỉ</b>
                  </p>
                  <p className="PersonalInfoData">{user?.address}</p>
                </li>
                <li className="PersonalInfo">
                  <p className="PersonalInfoHeader">
                    <b>Số điện thoại</b>
                  </p>
                  <p className="PersonalInfoData">{user?.mobile || "--"}</p>
                </li>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default memo(UserInfo);
