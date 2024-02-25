import { memo, React } from "react";
import "./Courses.scss";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import icon from "../../../assets/iconcategory1.png";
import Course from "components/theme/Course/Course";
const Courses = () => {
  return (
    <div className="courses">
      <div className="courses__container">
        <div className="courses__page">
          <h1>
            Chào Bạn
            <br />
            <span>Hôm nay, bạn muốn học gì?</span>
          </h1>
          <form action="/courses" method="get" className="courses__search">
            <input
              type="text"
              name="s"
              placeholder="Tìm khóa học"
              autoComplete="off"
            />
            <Link>
              <CiSearch></CiSearch>
            </Link>
          </form>
          <div className="courses__category">
            <Link>
              <div className="courses__icon">
                <img src={icon} alt="" />
              </div>
              <div className="courses__text2">Khóa học nền tảng</div>
            </Link>
            <Link>
              <div className="courses__icon">
                <img src={icon} alt="" />
              </div>
              <div className="courses__text2">Khóa học nền tảng</div>
            </Link>
            <Link>
              <div className="courses__icon">
                <img src={icon} alt="" />
              </div>
              <div className="courses__text2">Khóa học nền tảng</div>
            </Link>
            <Link>
              <div className="courses__icon">
                <img src={icon} alt="" />
              </div>
              <div className="courses__text2">Khóa học nền tảng</div>
            </Link>
          </div>
        </div>
        <div className="courses__list">
          <Course></Course>
          <Course></Course>
          <Course></Course>
        </div>
      </div>
    </div>
  );
};
export default memo(Courses);
