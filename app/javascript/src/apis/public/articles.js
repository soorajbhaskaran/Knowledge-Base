import axios from "axios";

const fetch = ({ query = "" }) => axios.get(`/public/articles?query=${query}`);
const show = slug => axios.get(`/public/articles/${slug}`);

const articlesApi = { fetch, show };
export default articlesApi;
