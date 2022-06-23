import axios from "axios";

axios.defaults.baseURL = "https://cryptofakeapi.websites.net/api";

const http = axios.create({
  baseURL: axios.defaults.baseURL,
});

http.interceptors.request.use(function (config) {
  if (config && config.headers) {
    config.headers.Authorization = "Bearer " + localStorage.getItem("token");
  }
  return config;
});

http.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    console.log(error);
    console.error("Api error: ", error?.response?.data?.Error, error?.message);
    console.error("Api error: ", error?.response?.data?.error, error?.message);
    return Promise.reject({
      message:
        error?.response?.data?.Error ||
        error?.response?.data?.error ||
        error?.response?.data?.errors ||
        error?.message ||
        "Error request",
      code: error?.response?.data?.code || error?.response?.status,
    });
  }
);

export default http;
