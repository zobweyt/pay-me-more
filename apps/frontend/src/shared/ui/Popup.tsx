import {
  Drawer,
  type DrawerProps,
  Modal,
  type ModalProps,
} from "@mantine/core";

import { useIsMobile } from "../lib/breakpoints";

export type PopupProps = ModalProps & DrawerProps;

export const Popup: React.FC<PopupProps> = (props) => {
  const isMobile = useIsMobile();

  return isMobile ? (
    <Drawer
      size="90%"
      position="bottom"
      transitionProps={{
        duration: 500,
        transition: {
          in: { transform: "translateY(0)" },
          out: { transform: "translateY(100%)" },
          common: { transformOrigin: "bottom" },
          transitionProperty: "transform",
        },
        timingFunction: "var(--ease-glide)",
      }}
      styles={{
        content: {
          display: "flex",
          flexDirection: "column",
          borderTopLeftRadius: "var(--mantine-radius-xl)",
          borderTopRightRadius: "var(--mantine-radius-xl)",
        },
        body: {
          flex: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
      {...props}
    />
  ) : (
    <Modal {...props} />
  );
};
