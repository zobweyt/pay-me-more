import {
  Button,
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

import { POPULAR_SKILLS, RESUME_SKILLS_MAX_COUNT } from "../config/skills";
import type { ResumeFormValues } from "../model/resume";

export type ResumeFormSkillsProps = {
  form: UseFormReturnType<ResumeFormValues>;
};

export const ResumeFormSkills = ({ form }: ResumeFormSkillsProps) => {
  const [newSkillInputValue, setNewSkillInputValue] = useState("");
  const newSkillInputRef = useRef<HTMLInputElement | null>(null);

  const uniqueSkills = new Set(
    form.values.skills.map((skill) => skill.toLocaleLowerCase()),
  );
  const hasSkills = !!form.values.skills.length;
  const skillsLimitExeeded =
    form.values.skills.length >= RESUME_SKILLS_MAX_COUNT;

  const addSkill = (skill: string) => {
    if (!skill) {
      return;
    }

    if (uniqueSkills.has(skill.toLocaleLowerCase())) {
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

  const filteredSkills = POPULAR_SKILLS.filter(
    (popularSkill) =>
      popularSkill
        .toLocaleLowerCase()
        .includes(newSkillInputValue.toLocaleLowerCase()) &&
      !uniqueSkills.has(popularSkill.toLocaleLowerCase()),
  );

  return (
    <Stack gap={0}>
      <Text fw={500} size="md" mb={4}>
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
                size="lg"
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
          size="md"
          error={form.errors.skills}
          value={newSkillInputValue}
          disabled={skillsLimitExeeded}
          onChange={(event) => setNewSkillInputValue(event.currentTarget.value)}
          placeholder="React"
          description="Введите навык в поле выше и нажмите «Добавить», чтобы он появился в вашем резюме. Вы также можете выбрать из популярных навыков:"
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              event.preventDefault();
              addSkill(newSkillInputValue);
            }
          }}
          rightSection={
            <Button
              px="sm"
              bg={
                !newSkillInputValue || skillsLimitExeeded
                  ? "transparent"
                  : undefined
              }
              variant="subtle"
              onClick={() => {
                addSkill(newSkillInputValue);
                newSkillInputRef.current?.focus();
              }}
              disabled={!newSkillInputValue || skillsLimitExeeded}
            >
              Добавить
            </Button>
          }
          rightSectionWidth={99}
        />
      </Group>

      <Group
        py="xs"
        gap="xs"
        styles={{
          root: {
            overflowX: "auto",
            overflowY: "hidden",
            whiteSpace: "nowrap",
            flexWrap: "nowrap",
            scrollbarWidth: "thin",
          },
        }}
      >
        {filteredSkills.slice(0, 7).map((skill) => (
          <Button
            key={skill}
            size="compact-sm"
            variant="default"
            onClick={() => {
              addSkill(skill);
            }}
            radius="xl"
            styles={{
              section: { marginInlineEnd: 4 },
              root: { flexShrink: 0 },
            }}
            leftSection={<LuPlus size={16} />}
          >
            {skill}
          </Button>
        ))}
      </Group>
    </Stack>
  );
};
