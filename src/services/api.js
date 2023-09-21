import axios from "axios";
import TokenService from "services/token.service";
import { notifications } from "@mantine/notifications";
import { BASE_URL } from "constants/api";


const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    if (!res.data.success) {
      notifications.show({
        message: res?.data?.errors[0]?.message,
        autoClose: 2000,
        color: 'red',
        id: "delete",
      });
    }

    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "/dashboard/v1/auth/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        TokenService.removeUser();
        window.location.reload();

        // originalConfig._retry = true;

        // try {
        //   const rs = await instance.post("/dashboard/v1/auth/refresh", {
        //     refreshToken: TokenService.getLocalRefreshToken(),
        //   });

        //   const { accessToken } = rs.data;
        //   TokenService.updateLocalAccessToken(accessToken);

        //   return instance(originalConfig);
        // } catch (_error) {
        //   return Promise.reject(_error);
        // }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;