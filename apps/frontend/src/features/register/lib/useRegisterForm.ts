import { type UseFormInput, useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useEffect } from "react";

import {
  RegisterFormSchema,
  type RegisterFormValues,
} from "../model/RegisterFormSchema";
import { useRegisterMutation } from "./useRegisterMutation";

export type UseRegisterFormProps = UseFormInput<RegisterFormValues> & {
  onCreated?: VoidFunction;
};

export const useRegisterForm = ({
  initialValues = {
    username: "",
    password1: "",
    password2: "",
  },
  validateInputOnChange = true,
  onCreated,
  ...props
}: UseRegisterFormProps = {}) => {
  const { mutateAsync } = useRegisterMutation();

  const form = useForm<RegisterFormValues>({
    initialValues,
    validate: zod4Resolver(RegisterFormSchema),
    validateInputOnChange,
    ...props,
  });

  const submit = form.onSubmit(async (values) => {
    const { status } = await mutateAsync({
      username: values.username,
      password: values.password1,
    });

    if (status === 201) {
      return handleCreated();
    }
    if (status === 409) {
      return handleConflict();
    }
  });

  const handleCreated = () => {
    onCreated?.();
  };

  const handleConflict = async () => {
    form.setFieldError("username", "Это имя пользователя уже занято.");

    const node = form.getInputNode("username");

    if (node instanceof HTMLInputElement) {
      node.focus();
      node.select();
    }
  };

  useEffect(() => {
    if (form.isDirty("password2")) {
      form.validateField("password2");
    }
  }, [form.values.password1]);

  useEffect(() => {
    if (form.isDirty("password1")) {
      form.validateField("password1");
    }
  }, [form.values.password2]);

  return [form, submit] as const;
};
