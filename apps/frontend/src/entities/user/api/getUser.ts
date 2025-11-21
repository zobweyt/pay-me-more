import { client } from "@/shared/api";

export const getUser = async (username: string) => {
  const { data: user } = await client.GET("/users/{username}", {
    params: { path: { username } },
  });
  return user ?? null;
};
