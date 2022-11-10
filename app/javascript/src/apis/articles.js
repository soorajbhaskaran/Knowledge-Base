import axios from "axios";

const fetch = ({ status }) => {
  const path = status ? `/articles?status=${status}` : "/articles";

  return axios.get(path);
};

const create = (payload) => axios.post("/articles", payload);

const update = (id, payload) => axios.put(`/articles/${id}`, payload);

const destroy = (id) => axios.delete(`/articles/${id}`);

const show = ({ id, path }) => axios.get(`${path}${id}`);

const search = ({ title, status, categoriesIds }) => {
  const path = status
    ? `/articles/search?query=${title}&status=${status}`
    : `/articles/search?query=${title}`;

  const newPath = categoriesIds
    ? `${path}&categories_ids=${categoriesIds.join(",")}`
    : path;

  return axios.get(newPath);
};

const filter = ({ status, categories_ids }) => {
  const path = status
    ? `/articles/filter?status=${status}`
    : `/articles/filter`;

  return axios.post(path, { categories_ids });
};

const articlesApi = { fetch, create, update, destroy, show, search, filter };

export default articlesApi;
