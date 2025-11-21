export const serializeFormData = <
  T extends Record<string, string | Blob | null | undefined>,
>(
  body: T,
): FormData => {
  const data = new FormData();

  for (const name in body) {
    const value = body[name];

    if (value !== null && value !== undefined) {
      data.append(name, value);
    }
  }

  return data;
};
