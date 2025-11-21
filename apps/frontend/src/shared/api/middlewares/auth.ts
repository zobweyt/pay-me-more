import type { Middleware } from "openapi-fetch";

import { getAccessToken, isAccessTokenValid } from "../store";

export const AUTH_MIDDLEWARE: Middleware = {
  onRequest: ({ request }) => {
    const accessToken = getAccessToken();

    if (isAccessTokenValid(accessToken)) {
      request.headers.set(
        "Authorization",
        `${accessToken.token_type} ${accessToken.access_token}`,
      );
    }

    return request;
  },
};
