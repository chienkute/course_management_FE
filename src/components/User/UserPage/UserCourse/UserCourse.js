import { memo, useEffect, useState } from "react";
import "./UserCourse.scss";
import { getCourseByUser } from "service/UserService";
import UserPage from "../UserPage";
const UserCourse = () => {
  const [course, setCourse] = useState([]);
  const getCourse = async () => {
    let res = await getCourseByUser();
    setCourse(res);
  };
  useEffect(() => {
    getCourse();
  }, []);
  return (
    <div className="UserPageContainer">
      <div className="UserPageContent">
        <UserPage></UserPage>
        <div className="ucourse">
          <div className="ucourse__container"></div>
        </div>
      </div>
    </div>
  );
};
export default memo(UserCourse);
