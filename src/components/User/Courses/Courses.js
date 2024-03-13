import { memo, React, useEffect, useState } from "react";
import "./Courses.scss";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import Course from "components/theme/Course/Course";
import { getCategories, searchCourse } from "service/UserService";
import { useDebounce } from "@uidotdev/usehooks";
import { useSelector } from "react-redux";
const Courses = () => {
  const state = useSelector((state) => state.changeTheme.search);
  const [query, setQuery] = useState(state || "");
  const debouncedSearchTerm = useDebounce(query, 500);
  const [categories, setCategories] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [course, setCourse] = useState([]);
  console.log(course);
  const getCategoryCourse = async () => {
    let res = await getCategories();
    if (res) {
      setCategories(res?.data);
    }
  };
  const getCourse = async () => {
    let res = await searchCourse(debouncedSearchTerm, categoryName);
    if (res) {
      setCourse(res?.data);
    }
  };
  useEffect(() => {
    getCategoryCourse();
    getCourse();
  }, []);
  useEffect(() => {
    getCourse();
  }, [debouncedSearchTerm, categoryName]);
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
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <Link>
              <CiSearch></CiSearch>
            </Link>
          </form>
          <div className="courses__category">
            {categories &&
              categories.length > 0 &&
              categories.map((item, index) => {
                return (
                  <Link
                    onClick={() => {
                      setCategoryName(item?.title);
                    }}
                  >
                    <div className="courses__icon">
                      <img src={item?.image} alt="" />
                    </div>
                    <div className="courses__text2">{item?.title}</div>
                  </Link>
                );
              })}
          </div>
        </div>
        <div className="courses__list">
          {course &&
            course.length > 0 &&
            course.map((item, index) => {
              return (
                <Course
                  id={item?._id}
                  title={item?.title}
                  image={item?.image}
                  duration={item?.duration}
                  price={item?.price}
                ></Course>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default memo(Courses);
