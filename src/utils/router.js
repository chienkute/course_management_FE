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
import LessonHome from "components/User/Lessons/LessonHome/LessonHome";
import ManageUser from "components/Admin/ManageUser/ManageUser";
import ManageCategory from "components/Admin/ManageCategory/ManageCategory";
import ManageCourse from "components/Admin/ManageCourse/ManageCourse";
import ManageBlog from "components/Admin/ManageBlog/ManageBlog";
import Blog from "components/User/Blog/Blog";
import BlogDetail from "components/User/Blog/BlogDetail";
import Dashboard from "components/Admin/Dashboard/Dashboard";
import ManageChapterCourse from "components/Admin/ManageChapterCourse/ManageChapterCourse";
import ManageChapter from "components/Admin/ManageChapter/ManageChapter";
const publicRoutes = [
  { path: "/register", component: Register, layout: null },
  { path: "/login", component: Login, layout: null },
  { path: "/lesson/:id", component: LessonHome },
  { path: "/lesson/:id/:slug", component: LessonHome },
  { path: "/course", component: Courses },
  { path: "/detail/:id", component: CourseDetail },
  { path: "/blog", component: Blog },
  { path: "/blog/:id", component: BlogDetail },
  { path: "/user/information/", component: UserInfo },
  { path: "/user/course/", component: UserCourse },
  { path: "/user/history/", component: History },
  { path: "/cart", component: Cart },
  { path: "/checkout", component: Checkout },
  { path: "/", component: HomePage },
];
const adminRoutes = [
  { path: "/admin/dashboard", component: Dashboard },
  { path: "/admin/user", component: ManageUser },
  { path: "/admin/category", component: ManageCategory },
  { path: "/admin/course", component: ManageCourse },
  { path: "/admin/chapter", component: ManageChapter },
  { path: "/admin/chapter/:id", component: ManageCourse },
  { path: "/admin/course/:id", component: ManageChapterCourse },
  { path: "/admin/blog", component: ManageBlog },
];
export { publicRoutes, adminRoutes };
