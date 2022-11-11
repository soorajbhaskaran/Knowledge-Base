import axios from "axios";

const fetch = () => axios.get(`/public/categories`);

const categoriesApi = { fetch };
export default categoriesApi;
