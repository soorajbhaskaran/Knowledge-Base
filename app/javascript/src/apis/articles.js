import axios from "axios";

const fetch = () => axios.get("/articles");
const create = (payload) => axios.post("/articles", payload);
const update = (slug, payload) => axios.put(`/articles/${slug}`, payload);
const destroy = (slug) => axios.delete(`/articles/${slug}`);
const show = (slug) => axios.get(`/articles/${slug}`);

const articleApi = { fetch, create, update, destroy, show };

export default articleApi;
