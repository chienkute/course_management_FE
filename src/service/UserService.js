const { default: instance } = require("utils/axiosCutomize");
const register = (username, firstname, lastname, email, password) => {
  return instance.post("/user/register", {
    username,
    firstname,
    lastname,
    email,
    password,
  });
};
const login = (username, password) => {
  return instance.post("/user/login", { username, password });
};
const getCategories = () => {
  return instance.get("/coursecategory/?limit=6");
};
const getAllCourse = () => {
  return instance.get("/course/?limit=100");
};
const searchCourse = (title, category) => {
  return instance.get(
    `/course/?limit=100&title=${title}&categoryName=${category}`
  );
};
const getCourseById = (id) => {
  return instance.get(`/course/${id}`);
};
const getUser = () => {
  return instance.get("/user/current");
};
const updateInformation = (
  firstname,
  lastname,
  skill,
  mobile,
  address,
  avatar
) => {
  const formData = new FormData();
  formData.append("firstname", firstname);
  formData.append("lastname", lastname);
  formData.append("skill", skill);
  formData.append("mobile", mobile);
  formData.append("address", address);
  formData.append("avatar", avatar);
  return instance.put("/user/update", formData);
};
const updateCart = (cid, quantity) => {
  return instance.put("/user/cart", { cid, quantity });
};
const removeCourse = (cid, quantity) => {
  return instance.put("/user/remove", { cid, quantity });
};
const createOrder = (data) => {
  return instance.post("/order/", data);
};
const getCartUser = (cid) => {
  return instance.get(`/user/cart/${cid}`);
};
const getCourseUser = (cid) => {
  return instance.get(`/user/course/${cid}`);
};
const getUserOrder = () => {
  return instance.get("/order/?limit=5");
};
const getCourseByUser = () => {
  return instance.get("/order/usercourse");
};
const rating = (star, cid, comment, updatedAt) => {
  return instance.put("/course/ratings", { star, cid, comment, updatedAt });
};
export {
  register,
  login,
  getCategories,
  getAllCourse,
  searchCourse,
  getCourseById,
  getUser,
  updateInformation,
  updateCart,
  removeCourse,
  createOrder,
  getCartUser,
  getCourseUser,
  getUserOrder,
  getCourseByUser,
  rating,
};
