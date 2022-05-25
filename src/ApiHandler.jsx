import axios from "axios";

function ApiHandler() {
  const axiosClient = axios.create({
    baseURL: `https://7x432bual6.execute-api.us-west-2.amazonaws.com/`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  axiosClient.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      let res = error.response;
      if (res.status == 401) {
        window.location.href = "https://example.com/login";
      }
      console.error(
        "Looks like there was a problem. Status Code: " + res.status
      );
      return Promise.reject(error);
    }
  );

    function search(input) {
        return axiosClient.get("prod/products/" + input);
  }
}

export default ApiHandler;
