import axios from "axios";

const fetch = ({ path, status }) => {
  const newPath =
    path === "/categories" && status ? `${path}?status=${status}` : path;

  return axios.get(`/api${newPath}`);
};
const create = (payload) => axios.post("/api/categories", payload);
const update = ({ id, payload }) => axios.put(`/api/categories/${id}`, payload);

const destroy = ({ id, newCategoryId }) => {
  const path = newCategoryId
    ? `/categories/${id}?new_category_id=${newCategoryId}`
    : `/categories/${id}`;

  return axios.delete(`/api${path}`);
};

const sort = (payload) => axios.patch("/api/categories/sort", payload);
const search = (query) => axios.get(`/api/categories/search?query=${query}`);

const categoriesApi = { fetch, create, update, destroy, sort, search };
export default categoriesApi;
