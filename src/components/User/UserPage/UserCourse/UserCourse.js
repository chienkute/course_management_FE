import { memo, useEffect, useState } from "react";
import "./UserCourse.scss";
import { getCourseByUser } from "service/UserService";
import UserPage from "../UserPage";
import { Link } from "react-router-dom";
import banner from "../../../../assets/thumbnail1.jpg";
const UserCourse = () => {
  const [course, setCourse] = useState([]);
  console.log(course);
  const getCourse = async () => {
    let res = await getCourseByUser();
    setCourse(res?.data);
  };
  useEffect(() => {
    getCourse();
  }, []);
  return (
    <div className="UserPageContainer">
      <div className="UserPageContent">
        <UserPage></UserPage>
        <div className="ucourse">
          <div className="ucourse__container">
            <div className="ucourse__title">Các khóa học của bạn</div>
            <div className="ucourse__course">
              {course &&
                course?.length > 0 &&
                course?.map((item, index) => {
                  return (
                    <div className="ucourse__course_content">
                      <div className="ucourse__course_thumbnail">
                        <Link>
                          <img src={item?.image} alt="" />
                        </Link>
                      </div>
                      <div className="ucourse__course_body">
                        <div className="ucourse__course_body_title">
                          <Link>{item?.title}</Link>
                        </div>
                        <div className="ucourse__course_body_button">
                          <div className="ucourse__course_body_button_content">
                            <Link to={`/detail/${item?._id}`}>Bắt đầu học</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(UserCourse);
