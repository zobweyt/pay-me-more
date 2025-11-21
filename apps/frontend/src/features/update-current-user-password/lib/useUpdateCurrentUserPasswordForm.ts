import { type UseFormInput, useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useEffect } from "react";

import {
  UpdateCurrentUserPasswordFormSchema,
  type UpdateCurrentUserPasswordFormValues,
} from "../model/UpdateCurrentUserPasswordFormSchema";
import { useUpdateCurrentUserPasswordMutation } from "./useUpdateCurrentUserPasswordMutation";

export type UseUpdateCurrentUserPasswordFormProps =
  UseFormInput<UpdateCurrentUserPasswordFormValues> & {
    onSuccess?: VoidFunction;
  };

export const useUpdateCurrentUserPasswordForm = ({
  initialValues = { oldPassword: "", newPassword1: "", newPassword2: "" },
  validateInputOnChange = true,
  onSuccess,
  ...props
}: UseUpdateCurrentUserPasswordFormProps = {}) => {
  const { mutateAsync } = useUpdateCurrentUserPasswordMutation();

  const form = useForm<UpdateCurrentUserPasswordFormValues>({
    initialValues,
    validate: zod4Resolver(UpdateCurrentUserPasswordFormSchema),
    validateInputOnChange,
    ...props,
  });

  const submit = form.onSubmit(async (values) => {
    const { status } = await mutateAsync({
      old_password: values.oldPassword,
      new_password: values.newPassword1,
    });

    if (status === 204) {
      return handleNoContent();
    }
    if (status === 403) {
      return handleForbidden();
    }
  });

  const handleNoContent = () => {
    onSuccess?.();
  };

  const handleForbidden = () => {
    form.setFieldError("oldPassword", "Старый пароль введён неверно.");
  };

  useEffect(() => {
    if (form.isDirty("newPassword2")) {
      form.validateField("newPassword2");
    }
  }, [form.values.newPassword1]);

  useEffect(() => {
    if (form.isDirty("newPassword1")) {
      form.validateField("newPassword1");
    }
  }, [form.values.newPassword2]);

  return [form, submit] as const;
};
