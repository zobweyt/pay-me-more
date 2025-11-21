import {
  type UserRegistrationRequest,
  client,
  setAccessToken,
} from "@/shared/api";

export const register = async (body: UserRegistrationRequest) => {
  const {
    data: accessToken,
    response: { status },
  } = await client.POST("/auth/register", {
    body,
  });

  if (accessToken) {
    setAccessToken(accessToken);
  }

  return { status };
};
