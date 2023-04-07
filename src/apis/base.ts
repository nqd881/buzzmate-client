import axios from "axios";

export const ApiClient = axios.create({
  xsrfCookieName: "x-csrf-token",
  xsrfHeaderName: "X-CSRF-TOKEN",
});

ApiClient.interceptors.request.use(function (request) {
  request.headers.Authorization = `Bearer ${localStorage.getItem(
    "access_token"
  )}`;

  return request;
});

ApiClient.interceptors.response.use(function (response) {
  const {data} = response;

  return data;
});
