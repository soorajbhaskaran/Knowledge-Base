import axios from "axios";

const fetch = articleId => axios.get(`/schedules?article_id=${articleId}`);
const create = ({ articleId, schedule }) =>
  axios.post(`/schedules?article_id=${articleId}`, { schedule });

const destroy = ({ articleId, scheduleId }) =>
  axios.delete(`/schedules/${scheduleId}?article_id=${articleId}`);

const schedulesApi = { fetch, create, destroy };

export default schedulesApi;
