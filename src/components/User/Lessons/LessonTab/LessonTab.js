import { memo, useEffect, useState } from "react";
import "./LessonTab.scss";
import { Collapse } from "antd";
import { NavLink, useParams } from "react-router-dom";
import { MdOutlinePlayCircle } from "react-icons/md";
import { coutVideos, getCourseById } from "service/UserService";
import { useDispatch, useSelector } from "react-redux";
import { setUrl } from "redux/userSlice";
import { TiTick } from "react-icons/ti";
import { Button } from "antd";
import { completedVideos } from "redux/completeSlice";
const LessonTab = () => {
  const { id } = useParams();
  const [chapter, setChapter] = useState([]);
  const state = useSelector((state) => state?.videoDone?.compeleted || []);
  console.log(state);
  const dispatch = useDispatch();
  const addUrl = (url) => {
    const updatedUrl = {
      url: url,
    };
    dispatch(setUrl(updatedUrl));
  };
  const getCourseInfo = async () => {
    let res = await getCourseById(id);
    if (res) {
      setChapter(res?.data?.chapters);
    }
  };
  const completedVideo = async (lessonId) => {
    let res = await coutVideos(id);
    if (res) {
      console.log(res);
      dispatch(completedVideos(lessonId));
    }
  };
  const item = chapter.map((item, index) => {
    return {
      key: `${index + 1}`,
      label: `${item?.chapter?.title}`,
      children: item?.chapter?.lessons?.map((item, index) => {
        const isCompleted = state.includes(item?._id);
        return (
          <div className="lesson__content_body" key={item?._id}>
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
              {!isCompleted && (
                <Button
                  style={{
                    transform: "translateX(-20px)",
                  }}
                  onClick={() => {
                    completedVideo(item?._id);
                  }}
                >
                  Hoàn thành
                </Button>
              )}
              {isCompleted && (
                <span className="completed">
                  <TiTick></TiTick>
                </span>
              )}
            </div>
          </div>
        );
      }),
    };
  });
  const onChange = (key) => {
    // console.log(key);
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
