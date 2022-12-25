import axios from "axios";

const fetch = articleId =>
  axios.get("/schedules", { params: { article_id: articleId } });

const create = ({ articleId, schedule }) =>
  axios.post("/schedules", { schedule, params: { article_id: articleId } });

const destroy = ({ articleId, scheduleId }) =>
  axios.delete(`/schedules/${scheduleId}`, {
    params: { article_id: articleId },
  });

const schedulesApi = { fetch, create, destroy };

export default schedulesApi;
