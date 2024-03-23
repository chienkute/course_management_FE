import { memo, useEffect, useState } from "react";
import "./ManageLessons.scss";
import { Button, Modal, Space, Table } from "antd";
import { useDebounce } from "@uidotdev/usehooks";
import { Input } from "antd";
import { Link, useParams } from "react-router-dom";
import { getLessons, deleteLesson } from "service/AdminService";
import { useSelector } from "react-redux";
import AddLesson from "./AddLesson";
import { toast } from "react-toastify";
const { Search } = Input;
const { Column } = Table;
const ManageLessons = () => {
  const { id } = useParams();
  const state = useSelector((state) => state.changeTheme.updated);
  const [lesson, setLessons] = useState([]);
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState(null);
  const [video, setVideo] = useState(null);
  const debouncedSearchTerm = useDebounce(search, 500);
  const [open, setOpen] = useState(false);
  const [handleOpen, setHandleOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getData = async () => {
    let res = await getLessons(id);
    if (res) {
      res?.data?.map((item, index) => {
        return setLessons(item?.lessons);
      });
    }
  };
  const handleOk = () => {
    setIsModalOpen(false);
    deleteVideos();
  };
  const deleteVideos = async () => {
    let res = await deleteLesson(title, video, id);
    if (res) {
      console.log(res);
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
  const data = lesson?.map((item, index) => {
    return {
      key: `${index + 1}`,
      stt: `${index + 1}`,
      title: `${item?.title}`,
      action: (
        <div key={index}>
          <Space size="middle">
            <Link
              onClick={() => {
                setTitle(item?.title);
                setVideo(item?.video);
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
  }, []);
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
      <AddLesson open={open} handleEdit={handleOpen} id={id}></AddLesson>
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
export default memo(ManageLessons);
