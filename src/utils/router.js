import Login from "components/Login/Login";
import Register from "components/Register/Register";
import HomePage from "components/User/HomePage/HomePage";
import Courses from "components/User/Courses/Courses";
import CourseDetail from "components/User/CourseDetail/CourseDetail";
import UserInfo from "components/User/UserPage/UserInfo/UserInfo";
import Cart from "components/User/Cart/Cart";
const publicRoutes = [
  { path: "/register", component: Register, layout: null },
  { path: "/login", component: Login, layout: null },
  { path: "/course", component: Courses },
  { path: "/detail/:id", component: CourseDetail },
  { path: "/blog", component: HomePage },
  { path: "/user/information/", component: UserInfo },
  { path: "/cart", component: Cart },
  { path: "/", component: HomePage },
];
export { publicRoutes };
