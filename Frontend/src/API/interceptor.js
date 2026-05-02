import { refreshToken } from "./auth.api";
import { api } from "./axios";

// Keep access token in memory only - no localStorage
let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

api.interceptors.request.use((config) => {
  // Don't add token to refresh token requests to avoid infinite loops
  if (accessToken && !config.url?.includes("/auth/refresh-token")) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Only retry once and not for refresh token requests
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh-token")
    ) {
      originalRequest._retry = true;

      try {
        const res = await refreshToken();
        accessToken = res.accessToken;

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (err) {
        console.error("Token refresh failed:", err);
        // Clear token on refresh failure
        accessToken = null;
      }
    }

    return Promise.reject(error);
  },
);
