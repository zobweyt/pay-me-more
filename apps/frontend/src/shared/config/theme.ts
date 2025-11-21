import {
  Card,
  DEFAULT_THEME,
  Drawer,
  Input,
  type MantineColorScheme,
  Modal,
  Notification,
  Tooltip,
  createTheme,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";

export const theme = createTheme({
  fontFamily: `var(--font-sans), ${DEFAULT_THEME.fontFamily}`,
  fontFamilyMonospace: `var(--font-mono), ${DEFAULT_THEME.fontFamilyMonospace}`,
  headings: {
    fontFamily: `var(--font-sans), ${DEFAULT_THEME.headings.fontFamily}`,
    textWrap: "balance",
  },
  radius: {
    xs: "6px",
    sm: "8px",
    md: "10px",
    lg: "12px",
    xl: "18px",
  },
  defaultRadius: "md",
  shadows: {
    xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },
  respectReducedMotion: true,
  components: {
    Card: Card.extend({
      defaultProps: {
        shadow: "xs",
        radius: "lg",
        withBorder: true,
      },
    }),
    Tooltip: Tooltip.extend({
      defaultProps: {
        events: { hover: true, focus: true, touch: false },
        offset: 8,
        arrowSize: 8,
        withArrow: true,
      },
    }),
    InputLabel: Input.Label.extend({
      defaultProps: {
        mb: 4,
      },
    }),
    InputError: Input.Error.extend({
      defaultProps: {
        mt: 4,
        fz: "sm",
      },
    }),
    Notification: Notification.extend({
      defaultProps: {
        ps: "sm",
        styles: {
          icon: {
            marginRight: "var(--mantine-spacing-xs)",
          },
        },
        bottom: "var(--app-shell-footer-offset)",
        withBorder: true,
        withCloseButton: true,
      },
    }),
    Notifications: Notifications.extend({
      defaultProps: {
        limit: 3,
        position: "bottom-center",
      },
    }),
    ModalRoot: Modal.Root.extend({
      defaultProps: {
        centered: true,
      },
    }),
    ModalContent: Modal.Content.extend({
      defaultProps: {
        radius: "xl",
      },
    }),
    ModalTitle: Modal.Title.extend({
      defaultProps: {
        fw: 600,
        fz: "lg",
      },
    }),
    DrawerTitle: Drawer.Title.extend({
      defaultProps: {
        fw: 600,
        fz: "xl",
      },
    }),
  },
});

export const defaultColorScheme = "auto" satisfies MantineColorScheme;
