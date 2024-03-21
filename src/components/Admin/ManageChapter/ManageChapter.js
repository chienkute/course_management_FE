import { memo, useEffect, useState } from "react";
import "./ManageCourse.scss";
import { Button, Modal, Space, Table } from "antd";
import { useDebounce } from "@uidotdev/usehooks";
import { Input } from "antd";
import { Link } from "react-router-dom";
import { getAllChapter } from "service/AdminService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AddCourse from "./AddChapter";
import UpdateCourse from "./UpdateChapter";
const { Search } = Input;
const { Column } = Table;
const ManageChapter = () => {
  const state = useSelector((state) => state.changeTheme.updated);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 500);
  const [id, setId] = useState("");
  const [indexKey, setIndexKey] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [duration, setDuration] = useState("");
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [handleEdit, setHandleEdit] = useState(false);
  const [handleOpen, setHandleOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getData = async () => {
    let res = await getAllChapter(debouncedSearchTerm);
    if (res) {
      setCategories(res?.data);
    }
  };
  const handleOk = () => {
    setIsModalOpen(false);
    deleteCategories(id);
  };
  const deleteCategories = async (id) => {
    // let res = await deleteCourse(id);
    // if (res) {
    //   toast.success("Xóa thành công");
    //   getData();
    // }
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
                setPrice(item?.price);
                setCategoryId(item?.category?._id);
                setDuration(item?.duration);
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
        price={price}
        categoryId={categoryId}
        duration={duration}
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
export default memo(ManageChapter);
