import { useState } from "react";

export default function useAxios(instance, axiosParams) {
  const [errors, setErrors] = useState(null);

  const doRequest = async (customParams = {}) => {
    try {
      setErrors(null);
      const params = { ...axiosParams, ...customParams };
      const response = await instance.request(params);
      return response.data;
    } catch (err) {
      setErrors(err);
      throw new Error(err);
    }
  };

  return { doRequest, errors };
}
