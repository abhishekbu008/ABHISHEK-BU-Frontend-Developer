import axios from "axios";

if (!process.env.SPACEX_API_URL) {
  process.env.SPACEX_API_URL = "https://api.spacexdata.com/v3/capsules";
}

const instance = axios.create({
  baseURL: process.env.SPACEX_API_URL,
});

export default instance;
