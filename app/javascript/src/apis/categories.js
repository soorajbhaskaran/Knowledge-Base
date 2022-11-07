import axios from "axios";

const fetch = ({ path, status }) => {
  const newPath =
    path === "/categories" && status ? `${path}?status=${status}` : path;

  return axios.get(newPath);
};
const create = (payload) => axios.post("/categories", payload);
const update = ({ id, payload }) => axios.put(`/categories/${id}`, payload);

const destroy = ({ id, newCategoryId }) => {
  const path = newCategoryId
    ? `/categories/${id}?new_category_id=${newCategoryId}`
    : `/categories/${id}`;

  return axios.delete(path);
};

const sort = (payload) => axios.patch("/categories/sort", payload);
const search = (query) => axios.get(`/categories/search?query=${query}`);

const categoriesApi = { fetch, create, update, destroy, sort, search };
export default categoriesApi;
