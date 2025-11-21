import { type UserUpdatePasswordRequest, client } from "@/shared/api";

export const updateCurrentUserPassword = async (
  body: UserUpdatePasswordRequest,
) => {
  const {
    response: { status },
  } = await client.PATCH("/users/me/password", { body });
  return { status };
};
