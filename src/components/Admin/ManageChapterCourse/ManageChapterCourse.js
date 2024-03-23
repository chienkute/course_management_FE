import { memo, useEffect, useState } from "react";
import "./ManageChapter.scss";
import { Button, Modal, Space, Table } from "antd";
import { useDebounce } from "@uidotdev/usehooks";
import { Input } from "antd";
import { Link, useParams } from "react-router-dom";
import { Select } from "antd";
import { toast } from "react-toastify";
import { getCourseById } from "service/UserService";
import {
  getAllChapter,
  removeChapterCourse,
  updateChapterCourse,
} from "service/AdminService";
const { Search } = Input;
const { Column } = Table;
const ManageChapterCourse = () => {
  const { id } = useParams();
  const [chapter, setChapter] = useState([]);
  const [dataChapter, setDataChapter] = useState([]);
  const [search, setSearch] = useState("");
  const [idChapter, setIdChaper] = useState("");
  const [idSelect, setIdSelect] = useState("");
  const debouncedSearchTerm = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onChange = (value) => {
    console.log(`selected ${value}`);
    setIdChaper(value);
  };
  const updateChapterToCourse = async () => {
    let res = await updateChapterCourse(id, idChapter);
    if (res?.mes) {
      toast.error("Chương đã tồn tại !!");
    } else {
      console.log(res);
      getData();
      toast.success("Thêm vào thành công");
    }
  };
  const filterChapter = chapter.filter((item) =>
    item?.chapter?.title
      ?.toLowerCase()
      .includes(debouncedSearchTerm.toLowerCase())
  );
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const getData = async () => {
    let res = await getCourseById(id);
    if (res) {
      console.log(res);
      setChapter(res?.data?.chapters);
    }
  };
  const deleteChapter = async () => {
    let res = await removeChapterCourse(id, idSelect);
    if (res) {
      console.log(res);
      toast.success("Xóa thành công");
      getData();
    }
  };
  const getChapter = async () => {
    let res = await getAllChapter("");
    if (res) {
      console.log(res);
      setDataChapter(res?.data);
    }
  };
  const handleOk = () => {
    setIsModalOpen(false);
    deleteChapter();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    getData();
    getChapter();
  }, []);
  const data2 = dataChapter?.map((item, index) => {
    return {
      value: `${item?._id}`,
      label: `${item?.title}`,
    };
  });
  const data = filterChapter?.map((item, index) => {
    return {
      key: `${index + 1}`,
      stt: `${index + 1}`,
      title: (
        <Link
          to={`/admin/chapter/${item?.chapter?._id}`}
          style={{ color: "inherit" }}
        >
          {item?.chapter?.title}
        </Link>
      ),
      action: (
        <div key={index}>
          <Space size="middle">
            <Link
              onClick={() => {
                setIdSelect(item?.chapter?._id);
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
          <Space wrap>
            <Select
              showSearch
              placeholder="Chọn khóa học cần thêm"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={filterOption}
              options={data2}
            />
            <Button
              type="primary"
              onClick={() => {
                updateChapterToCourse();
              }}
            >
              Thêm mới
            </Button>
          </Space>
        </div>
        <Table dataSource={data}>
          <Column title="STT" dataIndex="stt" key="stt" />
          <Column title="Tiêu đề" dataIndex="title" key="title" />
          <Column title="Action" dataIndex="action" key="action" />
        </Table>
      </div>
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
export default memo(ManageChapterCourse);
