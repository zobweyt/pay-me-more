import {
  Center,
  type MantineColorScheme,
  SegmentedControl,
  type SegmentedControlItem,
  VisuallyHidden,
  useMantineColorScheme,
} from "@mantine/core";
import type { IconType } from "react-icons/lib";
import {
  TbDeviceDesktopFilled,
  TbMoonFilled,
  TbSunFilled,
} from "react-icons/tb";

type ThemeOption = {
  icon: IconType;
  value: MantineColorScheme;
  label: React.ReactNode;
};

const COLOR_SCHEME_OPTIONS: ThemeOption[] = [
  {
    icon: TbDeviceDesktopFilled,
    value: "auto",
    label: "Автоматически",
  },
  {
    icon: TbMoonFilled,
    value: "dark",
    label: "Тёмная",
  },
  {
    icon: TbSunFilled,
    value: "light",
    label: "Светлая",
  },
];

const colorSchemeSegmentedControlItems = COLOR_SCHEME_OPTIONS.map((option) => ({
  value: option.value,
  label: (
    <Center>
      <option.icon size={16} />
      <VisuallyHidden>{option.label}</VisuallyHidden>
    </Center>
  ),
})) satisfies SegmentedControlItem[];

export const ColorSchemeSegmentedControl = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const handleChange = (value: string) => {
    setColorScheme(value as MantineColorScheme);
  };

  return (
    <SegmentedControl
      size="xs"
      radius="xl"
      withItemsBorders={false}
      data={colorSchemeSegmentedControlItems}
      value={colorScheme}
      onChange={handleChange}
    />
  );
};
