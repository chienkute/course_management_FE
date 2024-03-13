import { memo } from "react";
import "./LessonVideo.scss";
const LessonVideo = (props) => {
  const { url } = props;
  return (
    <div className="video__container">
      <div className="video__container_title">
        Khóa học Wordpress cơ bản dành cho người mới bắt đầu
      </div>
      <div className="video__container_body">
        <iframe
          src={`${url}`}
          frameborder="0"
          title="Yotube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};
export default memo(LessonVideo);
