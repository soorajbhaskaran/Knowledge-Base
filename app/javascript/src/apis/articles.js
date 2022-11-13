import axios from "axios";

const fetch = ({ status = "", query = "", categoriesIds = [] }) =>
  axios.get(
    `/articles?status=${status}&query=${query}&categories_ids=${JSON.stringify(
      categoriesIds
    )}`
  );

const create = (payload) => axios.post("/articles", payload);
const update = (id, payload) => axios.put(`/articles/${id}`, payload);
const destroy = (id) => axios.delete(`/articles/${id}`);
const show = (id) => axios.get(`/articles/${id}`);
const filter = ({ status, categories_ids }) => {
  const path = status
    ? `/articles/filter?status=${status}`
    : `/articles/filter`;

  return axios.post(path, { categories_ids });
};

const articlesApi = { fetch, create, update, destroy, show, filter };

export default articlesApi;
