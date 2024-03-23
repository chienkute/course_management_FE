const { default: instance } = require("utils/axiosCutomize");
const searchUser = (search) => {
  return instance.get(`/user/?limit=6&q=${search}`);
};
const adminUpdatedUser = (data, uid) => {
  return instance.put(`/user/${uid}`, data);
};
const deleteUser = (uid) => {
  return instance.delete(`/user/${uid}`);
};
const getCategoriesByAdmin = (search) => {
  return instance.get(`/coursecategory/?limit=6&q=${search}`);
};
const createCategory = (title, image) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("image", image);
  return instance.post("/coursecategory/", formData);
};
const updateCategory = (title, image, bcid) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("image", image);
  return instance.put(`/coursecategory/${bcid}`, formData);
};
const deleteCategory = (bcid) => {
  return instance.delete(`/coursecategory/${bcid}`);
};
const getCourseByAdmin = (search) => {
  return instance.get(`/course/?limit=6&q=${search}`);
};
const createCourse = (title, price, image, duration, category) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("image", image);
  formData.append("price", price);
  formData.append("duration", duration);
  formData.append("category", category);
  return instance.post("/course/", formData);
};
const updateCourse = (title, price, image, duration, category, cid) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("image", image);
  formData.append("price", price);
  formData.append("duration", duration);
  formData.append("category", category);
  return instance.put(`/course/${cid}`, formData);
};
const deleteCourse = (cid) => {
  return instance.delete(`/course/${cid}`);
};
const createBlog = (title, category, description, image) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("image", image);
  formData.append("description", description);
  formData.append("category", category);
  return instance.post("/blog/", formData);
};
const updateBlog = (title, category, description, image, bid) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("image", image);
  formData.append("description", description);
  formData.append("category", category);
  return instance.put(`/blog/${bid}`, formData);
};
const deleteBlog = (bid) => {
  return instance.delete(`/blog/${bid}`);
};
const getBlogs = (search) => {
  return instance.get(`/blog/?limit=6&q=${search}`);
};
const getOrders = () => {
  return instance.get("/order/orders");
};
const getOrderStatic = () => {
  return instance.get("/statictics/getorder");
};
const getTotalStatic = () => {
  return instance.get("/statictics/gettotal");
};
const getRevenue = () => {
  return instance.get("/statictics/getrevenue");
};
const getAllChapter = (search) => {
  return instance.get(`/chapter/?limit=100&q=${search}`);
};
const updateChapterCourse = (cid, chid) => {
  return instance.put(`/course/chapter/${cid}`, { chid });
};
const removeChapterCourse = (cid, chid) => {
  return instance.put(`/course/removechapter/${cid}`, { chid });
};
const createChapter = (title, description) => {
  return instance.post("/chapter/", { title, description });
};
const updateChapter = (title, description, chid) => {
  return instance.put(`/chapter/${chid}`, { title, description });
};
const deleteChapter = (chid) => {
  return instance.delete(`/chapter/${chid}`);
};
const getLessons = (chid) => {
  return instance.get(`/chapter/lesson/${chid}`);
};
const updateVideo = (title, video, chid) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("chid", chid);
  formData.append("video", video);
  return instance.put(`/chapter/`, formData);
};
const deleteLesson = (title, video, chid) => {
  return instance.delete(`/chapter/lessons/${chid}`, {
    data: { title, video },
  });
};
export {
  deleteLesson,
  getLessons,
  updateVideo,
  deleteChapter,
  updateChapter,
  createChapter,
  removeChapterCourse,
  updateChapterCourse,
  getAllChapter,
  getOrderStatic,
  getTotalStatic,
  getRevenue,
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  searchUser,
  adminUpdatedUser,
  deleteUser,
  getCategoriesByAdmin,
  updateCategory,
  deleteCategory,
  createCategory,
  getCourseByAdmin,
  createCourse,
  updateCourse,
  deleteCourse,
  getOrders,
};
