import axios from "axios";

const fetch = () => axios.get("/articles");
const create = (payload) => axios.post("/articles", payload);

const articleApi = { fetch, create };

export default articleApi;
