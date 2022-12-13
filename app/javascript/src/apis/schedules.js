import axios from "axios";

const fetch = articleId => axios.get(`/schedules?article_id=${articleId}`);
const create = ({ articleId, schedule }) =>
  axios.post(`/schedules?article_id=${articleId}`, { schedule });

const schedulesApi = { fetch, create };

export default schedulesApi;
