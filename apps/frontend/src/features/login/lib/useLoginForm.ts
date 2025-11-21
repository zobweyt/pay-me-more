import { type UseFormInput, useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";

import {
  LoginFormSchema,
  type LoginFormValues,
} from "../model/LoginFormSchema";
import { useLoginMutation } from "./useLoginMutation";

export type UseLoginFormProps = UseFormInput<LoginFormValues> & {
  onSuccess?: VoidFunction;
  onUnauthorized?: VoidFunction;
};

export const useLoginForm = ({
  mode = "uncontrolled",
  initialValues = {
    username: "",
    password: "",
  },
  validateInputOnChange = true,
  onSuccess,
  onUnauthorized,
  ...props
}: UseLoginFormProps = {}) => {
  const { mutateAsync } = useLoginMutation();

  const form = useForm<LoginFormValues>({
    mode,
    initialValues,
    validate: zod4Resolver(LoginFormSchema),
    validateInputOnChange,
    ...props,
  });

  const submit = form.onSubmit(async (values) => {
    const { status } = await mutateAsync({ ...values, scope: "" });

    if (status === 200) {
      return handleOk();
    }
    if (status === 401) {
      return handleUnauthorized();
    }
  });

  const handleOk = () => {
    onSuccess?.();
  };

  const handleUnauthorized = () => {
    const node = form.getInputNode("username");

    if (node instanceof HTMLInputElement) {
      node.focus();
      node.select();
    }

    onUnauthorized?.();
  };

  return [form, submit] as const;
};
