import { Box, Button, Stack, Text } from "@mantine/core";
import { Dropzone, type DropzoneProps, PDF_MIME_TYPE } from "@mantine/dropzone";
import { useRef } from "react";
import { LuFileText, LuUpload, LuX } from "react-icons/lu";

export const ResumeFormPdfDropzone: React.FC<DropzoneProps> = ({
  ...props
}) => {
  const openRef = useRef<() => void>(null);

  return (
    <Dropzone
      openRef={openRef}
      maxSize={50 * 1024 ** 2}
      maxFiles={1}
      accept={PDF_MIME_TYPE}
      {...props}
    >
      <Stack
        justify="center"
        mih={128}
        gap="lg"
        style={{ pointerEvents: "none" }}
      >
        <Box mx="auto">
          <Dropzone.Accept>
            <LuUpload
              size={52}
              color="var(--mantine-color-blue-6)"
              strokeWidth={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <LuX
              size={52}
              color="var(--mantine-color-red-6)"
              strokeWidth={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <LuFileText
              size={52}
              color="var(--mantine-color-dimmed)"
              strokeWidth={1.5}
            />
          </Dropzone.Idle>
        </Box>

        <div>
          <Text size="xl" lh={1.25} fw={500} mb="xs" ta="center">
            Импортируйте резюме из PDF-файла
          </Text>
          <Text
            size="sm"
            ta="center"
            c="dimmed"
            mt={8}
            style={{ textWrap: "balance" }}
          >
            Перетащите файл сюда или нажмите на кнопку, и наш ИИ автоматически
            заполнит форму
          </Text>
        </div>

        <Button
          w="fit-content"
          mx="auto"
          radius="xl"
          onClick={() => openRef.current?.()}
          style={{ pointerEvents: "all" }}
        >
          Выбрать файл
        </Button>
      </Stack>
    </Dropzone>
  );
};
