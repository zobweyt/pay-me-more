import {
  ActionIcon,
  Card,
  Flex,
  Group,
  Pill,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useRef, useState } from "react";
import { LuPlus, LuX } from "react-icons/lu";

import { RESUME_SKILLS_MAX_COUNT } from "../config/skills";
import type { ResumeFormValues } from "../model/resume";

export type ResumeFormSkillsProps = {
  form: UseFormReturnType<ResumeFormValues>;
};

export const ResumeFormSkills = ({ form }: ResumeFormSkillsProps) => {
  const [newSkillInputValue, setNewSkillInputValue] = useState("");
  const newSkillInputRef = useRef<HTMLInputElement>(null);

  const uniqueSkills = new Set(form.values.skills);
  const hasSkills = !!form.values.skills.length;
  const skillsLimitExeeded =
    form.values.skills.length >= RESUME_SKILLS_MAX_COUNT;

  const addSkill = (skill: string) => {
    if (!skill) {
      return;
    }

    if (uniqueSkills.has(skill)) {
      notifications.show({
        icon: <LuX size={20} />,
        color: "red",
        message: "Такой навык уже добавлен!",
      });
      return;
    }

    form.insertListItem("skills", skill.trim());
    form.validateField("skills");
    setNewSkillInputValue("");
  };

  return (
    <Stack gap={0}>
      <Text fw={500} size="sm" mb={4}>
        Навыки{" "}
        {hasSkills &&
          `(${form.values.skills.length}/${RESUME_SKILLS_MAX_COUNT})`}
        <Text span c="var(--mantine-color-error)">
          {" "}
          *
        </Text>
      </Text>

      {hasSkills && (
        <Card p="sm" mb="xs" shadow="none">
          <Flex gap="xs" wrap="wrap">
            {form.values.skills.map((skill, index) => (
              <Pill
                key={skill}
                size="md"
                onRemove={() => form.removeListItem("skills", index)}
                withRemoveButton
              >
                {skill}
              </Pill>
            ))}
          </Flex>
        </Card>
      )}

      <Group gap="xs">
        <TextInput
          ref={newSkillInputRef}
          flex={1}
          error={form.errors.skills}
          value={newSkillInputValue}
          disabled={skillsLimitExeeded}
          onChange={(event) => setNewSkillInputValue(event.currentTarget.value)}
          placeholder="React"
          description="Введите навык в поле выше и нажмите на появившийся «+», чтобы добавить его в своё резюме."
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              event.preventDefault();
              addSkill(newSkillInputValue);
            }
          }}
          rightSection={
            newSkillInputValue &&
            !skillsLimitExeeded && (
              <ActionIcon
                variant={"subtle"}
                color="gray"
                radius="xl"
                onClick={() => {
                  addSkill(newSkillInputValue);
                  newSkillInputRef.current?.focus();
                }}
              >
                <LuPlus size={20} />
              </ActionIcon>
            )
          }
        />
      </Group>

      {/* TODO: тут можно добавить предложения навыков */}
    </Stack>
  );
};
