import axios from "axios";

const fetch = () => axios.get("/articles");

const create = (payload) => axios.post("/articles", payload);

const update = (identifier, status, payload) =>
  axios.put(`/articles/${identifier}?status=${status}`, payload);

const destroy = (identifier, status) =>
  axios.delete(`/articles/${identifier}?status=${status}`);

const show = ({ identifier, path, status }) =>
  axios.get(`${path}${identifier}?status=${status}`);

const search = (query) => axios.get(`/articles/search?query=${query}`);

const articleApi = { fetch, create, update, destroy, show, search };

export default articleApi;
