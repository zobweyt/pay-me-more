import { API_ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "../config/api";
import type { AccessTokenResponse } from "./types";

export const getAccessToken = () => {
  const item = localStorage.getItem(API_ACCESS_TOKEN_LOCAL_STORAGE_KEY);

  if (!item) {
    return null;
  }

  try {
    const accessToken = JSON.parse(item);

    if (!isAccessTokenValid(accessToken)) {
      clearAccessToken();
      return null;
    }

    return accessToken;
  } catch {
    clearAccessToken();
    return null;
  }
};

export const setAccessToken = (accessToken: AccessTokenResponse) => {
  localStorage.setItem(
    API_ACCESS_TOKEN_LOCAL_STORAGE_KEY,
    JSON.stringify(accessToken),
  );
};

export const clearAccessToken = () => {
  localStorage.removeItem(API_ACCESS_TOKEN_LOCAL_STORAGE_KEY);
};

export const isAccessTokenValid = (
  accessToken: AccessTokenResponse | null,
): accessToken is AccessTokenResponse => {
  return accessToken !== null && !isAccessTokenExpired(accessToken);
};

export const isAccessTokenExpired = (accessToken: AccessTokenResponse) => {
  return Date.parse(accessToken.expires_at) <= Date.now();
};
