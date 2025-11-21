import { type UserUsernameRequest, client } from "@/shared/api";

export const updateCurrentUserUsername = async (body: UserUsernameRequest) => {
  const {
    data: currentUser,
    response: { status },
  } = await client.PATCH("/users/me/username", { body });
  return { currentUser, status };
};
