import {
  Box,
  Button,
  Combobox,
  Group,
  Pill,
  PillsInput,
  useCombobox,
} from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";

import { POPULAR_SKILLS, RESUME_SKILLS_MAX_COUNT } from "../config/skills";
import type { ResumeFormValues } from "../model/resume";

export type ResumeFormSkillsProps = {
  form: UseFormReturnType<ResumeFormValues>;
  pdfLoading: boolean;
  salaryForkLoading: boolean;
  recommendedSkills: string[] | undefined;
};

export const ResumeFormSkills: React.FC<ResumeFormSkillsProps> = ({
  form,
  pdfLoading,
  salaryForkLoading,
  recommendedSkills,
}) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const [data, setData] = useState(POPULAR_SKILLS);
  const [search, setSearch] = useState("");

  const exactOptionMatch = data.some(
    (item) => item.toLocaleLowerCase() === search.toLocaleLowerCase(),
  );

  const filteredOptions = data
    .filter(
      (item) =>
        !form.values.skills.includes(item) &&
        item.toLowerCase().includes(search.trim().toLowerCase()),
    )
    .slice(0, 3);

  const handleValueSelect = (value: string) => {
    setSearch("");

    if (value === "$create") {
      setData((current) => [...current, search]);
      form.insertListItem("skills", search.trim());
    } else {
      form.insertListItem("skills", value.trim());
    }

    form.validateField("skills");

    requestAnimationFrame(() => {
      combobox.selectFirstOption();
    });
  };

  const handleValueRemove = (index: number) => {
    form.removeListItem("skills", index);
    form.validateField("skills");
  };

  useEffect(() => {
    combobox.selectFirstOption();
  }, [search]);

  return (
    <Box>
      <Combobox
        size="md"
        store={combobox}
        onOptionSubmit={handleValueSelect}
        withinPortal={false}
      >
        <Combobox.DropdownTarget>
          <PillsInput
            size="md"
            label={`Навыки${
              form.values.skills.length > 0
                ? ` (${form.values.skills.length}/${RESUME_SKILLS_MAX_COUNT})`
                : ""
            }`}
            description={`Введите навыки${recommendedSkills?.length ? " или выберите из предложенных:" : " в поле выше."}`}
            error={form.errors.skills}
            onClick={() => combobox.openDropdown()}
            withAsterisk
          >
            <Pill.Group>
              {form.values.skills.map((item, index) => (
                <Pill
                  key={item}
                  withRemoveButton
                  onRemove={() => handleValueRemove(index)}
                >
                  {item}
                </Pill>
              ))}

              <Combobox.EventsTarget>
                <PillsInput.Field
                  placeholder="React"
                  value={search}
                  readOnly={pdfLoading || salaryForkLoading}
                  onBlur={() => combobox.closeDropdown()}
                  onFocus={() => {
                    combobox.openDropdown();
                    combobox.updateSelectedOptionIndex();
                  }}
                  onChange={(event) => {
                    combobox.updateSelectedOptionIndex();
                    setSearch(event.currentTarget.value);
                  }}
                  onKeyDown={(event) => {
                    if (
                      event.key === "Backspace" &&
                      search.length === 0 &&
                      form.values.skills.length > 0
                    ) {
                      event.preventDefault();
                      handleValueRemove(form.values.skills.length - 1);
                    }
                  }}
                />
              </Combobox.EventsTarget>
            </Pill.Group>
          </PillsInput>
        </Combobox.DropdownTarget>

        <Combobox.Dropdown>
          <Combobox.Options>
            {filteredOptions.map((item) => (
              <Combobox.Option key={item} value={item}>
                <Group gap="sm">
                  <span>{item}</span>
                </Group>
              </Combobox.Option>
            ))}

            {!exactOptionMatch && search.trim().length > 0 && (
              <Combobox.Option value="$create">
                Создать «{search}»
              </Combobox.Option>
            )}

            {exactOptionMatch &&
              search.trim().length > 0 &&
              filteredOptions.length === 0 && (
                <Combobox.Empty>Навыки не найдены</Combobox.Empty>
              )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>

      {!!recommendedSkills?.length && (
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
          {recommendedSkills
            .filter((skill) => !form.values.skills.includes(skill))
            .slice(0, 7)
            .map((skill) => (
              <Button
                key={skill}
                size="compact-sm"
                radius="xl"
                variant="default"
                styles={{
                  section: { marginInlineEnd: 4 },
                  root: { flexShrink: 0 },
                }}
                disabled={pdfLoading}
                leftSection={<LuPlus size={16} />}
                onClick={() => {
                  form.insertListItem("skills", skill.trim());
                  form.validateField("skills");
                }}
              >
                {skill}
              </Button>
            ))}
        </Group>
      )}
    </Box>
  );
};
