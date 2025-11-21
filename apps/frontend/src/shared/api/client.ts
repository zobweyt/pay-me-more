import createClient from "openapi-fetch";

import { API_BASE_URL } from "../config/api";
import { AUTH_MIDDLEWARE } from "./middlewares/auth";
import type { paths } from "./types";

export const client = createClient<paths>({ baseUrl: API_BASE_URL });

client.use(AUTH_MIDDLEWARE);
