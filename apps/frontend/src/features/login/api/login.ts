import {
  type BodyLoginAuthLoginPost,
  client,
  serializeFormData,
  setAccessToken,
} from "@/shared/api";

export const login = async (body: BodyLoginAuthLoginPost) => {
  const {
    data: accessToken,
    response: { status },
  } = await client.POST("/auth/login", {
    body,
    bodySerializer: serializeFormData,
  });

  if (accessToken) {
    setAccessToken(accessToken);
  }

  return { status };
};
