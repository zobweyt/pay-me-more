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
import { useState } from "react";
import { LuPlus, LuX } from "react-icons/lu";

import { RESUME_SKILLS_MAX_COUNT } from "../config/skills";
import type { ResumeFormValues } from "../model/resume";

export type ResumeFormSkillsProps = {
  form: UseFormReturnType<ResumeFormValues>;
};

export const ResumeFormSkills = ({ form }: ResumeFormSkillsProps) => {
  const [addingSkill, setAddingSkill] = useState("");

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

    form.insertListItem("skills", skill);
    form.validateField("skills");
    setAddingSkill("");
  };

  return (
    <Stack gap={0}>
      <Text fw={500} size="sm" mb={4}>
        Навыки{" "}
        {hasSkills &&
          `(${form.values.skills.length}/${RESUME_SKILLS_MAX_COUNT})`}
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
          flex={1}
          value={addingSkill}
          onChange={(event) => setAddingSkill(event.currentTarget.value)}
          placeholder="Добавить навык"
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              event.preventDefault();
              addSkill(addingSkill);
            }
          }}
          disabled={skillsLimitExeeded}
        />

        <ActionIcon
          size="input-sm"
          variant="light"
          disabled={!addingSkill || skillsLimitExeeded}
          onClick={() => {
            addSkill(addingSkill);
          }}
        >
          <LuPlus size={24} />
        </ActionIcon>
      </Group>

      {/* TODO: тут можно добавить предложения навыков */}

      {!!form.errors.skills && (
        <Text c="red" size="sm" mt={4}>
          {form.errors.skills}
        </Text>
      )}
    </Stack>
  );
};
