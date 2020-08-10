import axios from "axios";

const APP_ID = "wK42ZHn8zfxtupYUZ2J6crxx";
const APP_SECRET = "eyRerzhKvXxZDDJ4hjFc9uMs";

const instance = axios.create({
  baseURL: "https://gp-server.hunger-valley.com/",
  //   timeout: 1000,
  headers: {
    "t-app-id": APP_ID,
    "t-app-secret": APP_SECRET,
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const xToken = localStorage.getItem("x-token");
    if (xToken) {
      config.headers["Authorization"] = `Bearer ${xToken}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    console.error(error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.headers["x-token"]) {
      localStorage.setItem("x-token", response.headers["x-token"]);
    }
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
