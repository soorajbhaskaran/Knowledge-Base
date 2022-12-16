import axios from "axios";

const fetch = ({ status = "", query = "", categoriesIds = [], page = 1 }) =>
  axios.get(
    `/articles/page/${page}?status=${status}&query=${query}&categories_ids=${JSON.stringify(
      categoriesIds
    )}`
  );

const create = payload => axios.post("/articles", payload);
const update = ({ id, payload }) => axios.put(`/articles/${id}`, payload);
const show = id => axios.get(`/articles/${id}`);
const destroy = id => axios.delete(`/articles/${id}`);
const sort = payload => axios.patch("/articles/sort", payload);
const changeCategory = payload =>
  axios.patch("/articles/change_category", payload);

const visits = id => axios.get(`/articles/${id}/visits`);
const filter = ({ status, categories_ids }) => {
  const path = status
    ? `/articles/filter?status=${status}`
    : `/articles/filter`;

  return axios.post(path, { categories_ids });
};

const articlesApi = {
  fetch,
  create,
  update,
  destroy,
  show,
  filter,
  sort,
  changeCategory,
  visits,
};

export default articlesApi;
