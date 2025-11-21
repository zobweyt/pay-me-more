import { client, type operations } from "@/shared/api";

export const getUsers = async (
  query: operations["get_users_users_get"]["parameters"]["query"],
) => {
  const { data } = await client.GET("/users", {
    params: { query },
  });
  return data ?? null;
};
