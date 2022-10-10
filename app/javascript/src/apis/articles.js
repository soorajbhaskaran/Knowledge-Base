import axios from "axios";

const fetch = () => axios.get("/articles");

const articleApi = { fetch };

export default articleApi;
