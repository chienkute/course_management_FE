import Login from "components/Login/Login";
import Register from "components/Register/Register";
import HomePage from "components/User/HomePage/HomePage";
import Courses from "components/User/Courses/Courses";
import CourseDetail from "components/User/CourseDetail/CourseDetail";

const publicRoutes = [
  { path: "/register", component: Register, layout: null },
  { path: "/login", component: Login, layout: null },
  { path: "/course", component: Courses },
  { path: "/detail", component: CourseDetail, layout: null },
  { path: "/blog", component: HomePage },
  { path: "/", component: HomePage },
];
export { publicRoutes };
