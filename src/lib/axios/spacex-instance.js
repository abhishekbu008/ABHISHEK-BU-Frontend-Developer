import axios from "axios";
import constants from "../../constants/constants";

const instance = axios.create({
  baseURL: constants.AXIOS_SPACEX.BASE_URL,
});

export default instance;
