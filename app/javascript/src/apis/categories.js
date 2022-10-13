import axios from "axios";

const fetch = () => axios.get("/categories");
const create = (payload) => axios.post("/categories", payload);
const update = ({ id, payload }) => axios.put(`/categories/${id}`, payload);

const destroy = ({ id, newCategoryId }) => {
  const path = newCategoryId
    ? `/categories/${id}?new_category_id=${newCategoryId}`
    : `/categories/${id}`;

  return axios.delete(path);
};

const categoryApi = { fetch, create, update, destroy };
export default categoryApi;
