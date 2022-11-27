import axios from "axios";

const fetch = (articleId) => axios.get(`/versions?article_id=${articleId}`);
const restore = ({ versionId, articleId }) =>
  axios.patch(`/versions/${versionId}/restore?article_id=${articleId}`);

const show = ({ versionId, articleId }) =>
  axios.get(`/versions/${versionId}?article_id=${articleId}`);

const versionsApi = { fetch, show, restore };

export default versionsApi;
