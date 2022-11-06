import axios from "axios";

const fetch = () => axios.get("/api/redirections");
const create = (redirection) => axios.post("/api/redirections", redirection);
const update = ({ editingKey, values }) =>
  axios.put(`/api/redirections/${editingKey}`, values);
const destroy = (id) => axios.delete(`/api/redirections/${id}`);

const redirectionsApi = { fetch, create, update, destroy };

export default redirectionsApi;
