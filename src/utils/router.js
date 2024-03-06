import Login from "components/Login/Login";
import Register from "components/Register/Register";
import HomePage from "components/User/HomePage/HomePage";
import Courses from "components/User/Courses/Courses";
import CourseDetail from "components/User/CourseDetail/CourseDetail";
import UserInfo from "components/User/UserPage/UserInfo/UserInfo";
import Cart from "components/User/Cart/Cart";
import Checkout from "components/User/Checkout/Checkout";
import UserCourse from "components/User/UserPage/UserCourse/UserCourse";
import History from "components/User/UserPage/History/History";
const publicRoutes = [
  { path: "/register", component: Register, layout: null },
  { path: "/login", component: Login, layout: null },
  { path: "/course", component: Courses },
  { path: "/detail/:id", component: CourseDetail },
  { path: "/blog", component: HomePage },
  { path: "/user/information/", component: UserInfo },
  { path: "/user/course/", component: UserCourse, layout: null },
  { path: "/user/history/", component: History },
  { path: "/cart", component: Cart },
  { path: "/checkout", component: Checkout },
  { path: "/", component: HomePage },
];
export { publicRoutes };
