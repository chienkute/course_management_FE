import { memo, useEffect, useState } from "react";
import "./ManageUser.scss";
import { Modal, Space, Table } from "antd";
import { useDebounce } from "@uidotdev/usehooks";
import { Input } from "antd";
import { Link } from "react-router-dom";
import { deleteUser, searchUser } from "service/AdminService";
import UpdateUser from "./UpdateUser";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const { Search } = Input;
const { Column } = Table;
const ManageUser = () => {
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 500);
  const [user, setUser] = useState([]);
  const [id, setId] = useState("");
  console.log(id);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [block, setBLock] = useState(null);
  const [role, setRole] = useState(null);
  const [open, setOpen] = useState(false);
  const [handleEdit, setHandleEdit] = useState(false);
  const [indexKey, setIndexKey] = useState(false);
  const state = useSelector((state) => state.changeTheme.updated);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const deletedUser = async (uid) => {
    let res = await deleteUser(uid);
    if (res?.sucess === true) {
      getUser();
      toast.success("Xóa người dùng thành công !!");
      console.log(res);
    }
  };
  const getUser = async () => {
    let res = await searchUser(debouncedSearchTerm);
    if (res) {
      setUser(res?.data);
    }
  };
  const handleOk = () => {
    setIsModalOpen(false);
    deletedUser(id);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    getUser();
  }, [debouncedSearchTerm]);
  useEffect(() => {
    getUser();
  }, [state]);
  const data = user?.map((item, index) => {
    return {
      key: `${index + 1}`,
      stt: `${index + 1}`,
      firstname: `${item?.firstname}`,
      lastname: `${item?.lastname}`,
      email: `${item?.email}`,
      role: `${item?.role}`,
      status: `${item?.isBlocked ? "Blocked" : "Active"}`,
      action: (
        <div key={index}>
          <Space size="middle">
            <Link
              onClick={() => {
                setIndexKey(index);
                setOpen(true);
                setHandleEdit(!handleEdit);
                setId(item?._id);
                setFirstName(item?.firstname);
                setLastName(item?.lastname);
                setEmail(item?.email);
                setRole(item?.role);
                setBLock(item?.isBlocked);
              }}
            >
              Sửa
            </Link>
            <Link
              onClick={() => {
                setId(item?._id);
                setIsModalOpen(true);
              }}
            >
              Xóa
            </Link>
          </Space>
        </div>
      ),
    };
  });
  return (
    <div className="user">
      <div className="user__container">
        <div className="user__container_search">
          <div></div>
          <Search
            placeholder="Nhập thong tin tìm kiếm..."
            allowClear
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            style={{
              width: 300,
            }}
          />
        </div>
        <Table dataSource={data}>
          <Column title="STT" dataIndex="stt" key="stt" />
          <Column title="Họ" dataIndex="firstname" key="firstname" />
          <Column title="Tên" dataIndex="lastname" key="lastname" />
          <Column title="Email" dataIndex="email" key="email" />
          <Column title="Role" dataIndex="role" key="role" />
          <Column title="Status" dataIndex="status" key="status" />
          <Column title="Action" dataIndex="action" key="action" />
        </Table>
      </div>
      <UpdateUser
        id={id}
        open={open}
        handleEdit={handleEdit}
        key={indexKey}
        firstname={firstname}
        email={email}
        lastname={lastname}
        role={role}
        block={block}
      ></UpdateUser>
      <Modal
        title="Xóa người dùng này"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        Thao tác này không thể hoàn tác !!
      </Modal>
    </div>
  );
};
export default memo(ManageUser);
