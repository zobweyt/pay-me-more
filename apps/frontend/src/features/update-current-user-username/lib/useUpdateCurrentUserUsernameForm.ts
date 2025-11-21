import { type UseFormInput, useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";

import {
  UpdateCurrentUserUsernameFormSchema,
  type UpdateCurrentUserUsernameFormValues,
} from "../model/UpdateCurrentUserUsernameFormSchema";
import { useUpdateCurrentUserUsernameMutation } from "./useUpdateCurrentUserUsernameMutation";

export type UseUpdateCurrentUserUsernameFormProps =
  UseFormInput<UpdateCurrentUserUsernameFormValues> & {
    onSuccess?: VoidFunction;
  };

export const useUpdateCurrentUserUsernameForm = ({
  mode,
  initialValues = { username: "" },
  validateInputOnChange = true,
  onSuccess,
  ...props
}: UseUpdateCurrentUserUsernameFormProps = {}) => {
  const { mutateAsync } = useUpdateCurrentUserUsernameMutation();

  const form = useForm<UpdateCurrentUserUsernameFormValues>({
    mode,
    initialValues,
    validate: zod4Resolver(UpdateCurrentUserUsernameFormSchema),
    validateInputOnChange,
    ...props,
  });

  const submit = form.onSubmit(async (values) => {
    const { status } = await mutateAsync(values);

    if (status === 200) {
      return handleOk();
    }
    if (status === 409) {
      return handleConflict();
    }
  });

  const handleOk = () => {
    onSuccess?.();
  };

  const handleConflict = () => {
    form.setFieldError("username", "Это имя пользователя уже занято.");

    const node = form.getInputNode("username");

    if (node instanceof HTMLInputElement) {
      node.focus();
      node.select();
    }
  };

  return [form, submit] as const;
};
