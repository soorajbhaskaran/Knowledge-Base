import axios from "axios";

const fetch = ({ path }) => axios.get(path);
const create = (payload) => axios.post("/categories", payload);
const update = ({ id, payload }) => axios.put(`/categories/${id}`, payload);

const destroy = ({ id, newCategoryId }) => {
  const path = newCategoryId
    ? `/categories/${id}?new_category_id=${newCategoryId}`
    : `/categories/${id}`;

  return axios.delete(path);
};

const sort = (payload) => axios.patch("/categories/sort", payload);

const categoryApi = { fetch, create, update, destroy, sort };
export default categoryApi;
