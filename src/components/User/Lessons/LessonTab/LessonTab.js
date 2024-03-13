import { memo, useEffect, useState } from "react";
import "./LessonTab.scss";
import { Collapse } from "antd";
import { NavLink, useParams } from "react-router-dom";
import { MdOutlinePlayCircle } from "react-icons/md";
import { getCourseById } from "service/UserService";
import { useDispatch } from "react-redux";
import { setUrl } from "redux/userSlice";
const LessonTab = () => {
  const { id } = useParams();
  const [chapter, setChapter] = useState([]);
  const dispatch = useDispatch();
  const addUrl = (url) => {
    const updatedUrl = {
      url: url,
    };
    dispatch(setUrl(updatedUrl));
  };
  console.log(chapter);
  const getCourseInfo = async () => {
    let res = await getCourseById(id);
    if (res) {
      setChapter(res?.data?.chapters);
    }
  };
  const item = chapter.map((item, index) => {
    return {
      key: `${index + 1}`,
      label: `${item?.chapter?.title}`,
      children: item?.chapter?.lessons?.map((item, index) => {
        return (
          <div className="lesson__content_body">
            <div className="lesson__content_body_item">
              <NavLink
                to={`/lesson/${id}/${item?.slug}`}
                key={index}
                onClick={() => {
                  addUrl(item?.video);
                }}
                className={({ isActive }) => (isActive ? "menuActive" : "")}
              >
                <MdOutlinePlayCircle></MdOutlinePlayCircle>
                <span>{item?.title}</span>
              </NavLink>
            </div>
          </div>
        );
      }),
    };
  });
  const onChange = (key) => {
    console.log(key);
  };
  useEffect(() => {
    getCourseInfo();
  }, []);
  return (
    <div className="lesson__sidebar">
      <div className="lesson__title">Nội dung khóa học</div>
      <div className="lesson__content">
        <Collapse items={item} defaultActiveKey={["1"]} onChange={onChange} />
      </div>
    </div>
  );
};
export default memo(LessonTab);
