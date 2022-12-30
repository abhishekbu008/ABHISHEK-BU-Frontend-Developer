import axios from "axios";
import constants from "../../constants/constants";

const instance = axios.create({
  baseURL: constants.AXIOS_SPACEX.BASE_URL,
});

instance.interceptors.request.use((config) => {
  config.headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  return config;
});

export default instance;
