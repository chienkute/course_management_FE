import { memo } from "react";
import "./LessonHome.scss";
import LessonVideo from "../LessonVideo/LessonVideo";
import LessonTab from "../LessonTab/LessonTab";
import { useSelector } from "react-redux";
const LessonHome = () => {
  const state = useSelector((state) => state.changeTheme.url);
  return (
    <div className="lesson__page">
      <LessonVideo url={state}></LessonVideo>
      <LessonTab></LessonTab>
    </div>
  );
};
export default memo(LessonHome);
