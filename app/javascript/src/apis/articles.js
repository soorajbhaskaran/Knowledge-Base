import axios from "axios";

const fetch = ({ status }) => {
  const path = status ? `/articles?status=${status}` : "/articles";

  return axios.get(`/api${path}`);
};

const create = (payload) => axios.post("/api/articles", payload);

const update = (identifier, status, payload) =>
  axios.put(`/api/articles/${identifier}?status=${status}`, payload);

const destroy = (identifier, status) =>
  axios.delete(`/api/articles/${identifier}?status=${status}`);

const show = ({ identifier, path, status }) =>
  axios.get(`/api${path}${identifier}?status=${status}`);

const search = ({ title, status, categoriesIds }) => {
  const path = status
    ? `/articles/search?query=${title}&status=${status}`
    : `/articles/search?query=${title}`;

  const newPath = categoriesIds
    ? `${path}&categories_ids=${categoriesIds.join(",")}`
    : path;

  return axios.get(`/api${newPath}`);
};

const filter = ({ status, categories_ids }) => {
  const path = status
    ? `/articles/filter?status=${status}`
    : `/articles/filter`;

  return axios.post(`/api${path}`, { categories_ids });
};

const articlesApi = { fetch, create, update, destroy, show, search, filter };

export default articlesApi;
