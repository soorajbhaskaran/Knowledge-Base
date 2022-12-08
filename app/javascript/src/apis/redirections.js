import axios from "axios";

const fetch = () => axios.get("/redirections");
const create = redirection => axios.post("/redirections", redirection);
const update = ({ editingKey, values }) =>
  axios.put(`/redirections/${editingKey}`, values);
const destroy = id => axios.delete(`/redirections/${id}`);

const redirectionsApi = { fetch, create, update, destroy };

export default redirectionsApi;
