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
export {
  searchUser,
  adminUpdatedUser,
  deleteUser,
  getCategoriesByAdmin,
  updateCategory,
  deleteCategory,
  createCategory,
};
