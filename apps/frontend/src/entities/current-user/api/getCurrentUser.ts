import { client } from "@/shared/api";

export const getCurrentUser = async () => {
  const { data: currentUser } = await client.GET("/users/me");
  return currentUser ?? null;
};
