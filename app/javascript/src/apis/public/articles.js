import axios from "axios";

const show = ({ slug }) => axios.get(`/public/articles/${slug}`);

const articlesApi = { show };
export default articlesApi;
