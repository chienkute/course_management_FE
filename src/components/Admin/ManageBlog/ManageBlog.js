import { memo, useEffect, useState } from "react";
import "./ManageBlog.scss";
import { Button, Modal, Space, Table } from "antd";
import { useDebounce } from "@uidotdev/usehooks";
import { Input } from "antd";
import { Link } from "react-router-dom";
import { deleteBlog, getBlogs } from "service/AdminService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AddCourse from "./AddBlog";
import UpdateCourse from "./UpdateBlog";
const { Search } = Input;
const { Column } = Table;
const ManageBlog = () => {
  const state = useSelector((state) => state.changeTheme.updated);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 500);
  const [id, setId] = useState("");
  const [indexKey, setIndexKey] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [handleEdit, setHandleEdit] = useState(false);
  const [handleOpen, setHandleOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getData = async () => {
    let res = await getBlogs(debouncedSearchTerm);
    if (res) {
      setCategories(res?.data);
    }
  };
  const handleOk = () => {
    setIsModalOpen(false);
    deleteCategories(id);
  };
  const deleteCategories = async (id) => {
    let res = await deleteBlog(id);
    if (res) {
      toast.success("Xóa thành công");
      getData();
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    getData();
  }, [state]);
  const data = categories?.map((item, index) => {
    return {
      key: `${index + 1}`,
      stt: `${index + 1}`,
      title: `${item?.title}`,
      icon: (
        <div>
          <img
            src={`${item?.image}`}
            alt=""
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
            }}
          />
        </div>
      ),
      category: `${item?.category}`,
      action: (
        <div key={index}>
          <Space size="middle">
            <Link
              onClick={() => {
                setIndexKey(index);
                setHandleEdit(!handleEdit);
                setEdit(true);
                setTitle(item?.title);
                setImage(item?.image);
                setCategory(item?.category);
                setContent(item?.description);
                setId(item?._id);
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
  useEffect(() => {
    getData();
  }, [debouncedSearchTerm]);
  return (
    <div className="user">
      <div className="user__container">
        <div className="user__container_search">
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
          <Button
            type="primary"
            onClick={() => {
              setOpen(true);
              setHandleOpen(!handleOpen);
            }}
          >
            Thêm mới
          </Button>
        </div>
        <Table dataSource={data}>
          <Column title="STT" dataIndex="stt" key="stt" />
          <Column title="Tiêu đề" dataIndex="title" key="title" />
          <Column title="Ảnh" dataIndex="icon" key="icon" />
          <Column title="Chủ đề" dataIndex="category" key="category" />
          <Column title="Action" dataIndex="action" key="action" />
        </Table>
      </div>
      <AddCourse open={open} handleEdit={handleOpen}></AddCourse>
      <UpdateCourse
        open={edit}
        handleEdit={handleEdit}
        title={title}
        image={image}
        key={indexKey}
        category={category}
        content={content}
        id={id}
      ></UpdateCourse>
      <Modal
        title="Xóa chủ đề này"
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
export default memo(ManageBlog);
