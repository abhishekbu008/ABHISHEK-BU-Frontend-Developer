import { axiosSpaceX as axios } from "../lib";
import { useState } from "react";

export default function useAxios(axiosParams) {
  const [errors, setErrors] = useState(null);

  const doRequest = async (customParams = {}) => {
    try {
      setErrors(null);
      const params = { ...axiosParams, ...customParams };
      const response = await axios.request(params);
      return response.data;
    } catch (err) {
      setErrors(err);
    }
  };

  return { doRequest, errors };
}
