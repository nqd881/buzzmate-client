import {
  Box,
  Button,
  Grid,
  GridItem,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { sassClasses } from "@utils";
import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { BsEmojiSunglasses } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import { RiAttachment2 } from "react-icons/ri";
import styles from "./MessageInput.module.scss";
import { VerticalScrollableView } from "@components/shared/VerticalScrollableView";
import { isPhotoFile, isVideoFile } from "@utils/file";
import { useMessages } from "@hooks/data/use-messages";
import { useCurrentChatId } from "@hooks/router/useCurrentChatId";

const cl = sassClasses(styles);

type MessageInputProps = {};

export const MessageFilesPreview: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSend: () => void;
  files: FileList;
}> = (props) => {
  const { files, isOpen, onClose, onSend } = props;

  const [previewData, setPreviewData] = useState([]);

  useEffect(() => {
    if (isOpen) setPreviewData([]);
  }, [isOpen]);

  const readFile = (file: File, fileIndex: number) => {
    const reader = new FileReader();

    reader.onload = () => {
      setPreviewData((data) => [
        ...data,
        {
          fileIndex,
          dataUrl: reader.result,
        },
      ]);
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (files) {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];

        if (isPhotoFile(file)) {
          readFile(file, index);
        }
        if (isVideoFile(file)) {
        }
      }
    }
  }, [files]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Preview</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box h={500}>
            <VerticalScrollableView>
              <Box w="100%" display="flex" flexDirection="column">
                {files &&
                  Array.from(files).map((file, index) => (
                    <Box key={file.name} m="1rem 0">
                      {isPhotoFile(file) && (
                        <GridItem key={file.name}>
                          <Image
                            alt=""
                            src={
                              previewData.find(
                                (preview) => preview.fileIndex === index
                              )?.dataUrl
                            }
                          ></Image>
                        </GridItem>
                      )}

                      {isVideoFile(file) && (
                        <video
                          key={file.name}
                          src={URL.createObjectURL(file)}
                          controls
                        ></video>
                      )}

                      {!isPhotoFile(file) && !isVideoFile(file) && (
                        <Box
                          w="100%"
                          p="1rem"
                          bgColor="#1379df"
                          color="#fff"
                          borderRadius="1rem"
                          key={file.name}
                        >
                          <span>{file.name}</span>
                        </Box>
                      )}
                    </Box>
                  ))}
              </Box>
            </VerticalScrollableView>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={() => {
              onSend();
              onClose();
            }}
          >
            Send
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const MessageInput: React.FC<MessageInputProps> = (props) => {
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [openFilesPreview, setOpenFilesPreview] = useState(false);

  const [message, setMessage] = useState("");
  const [files, setFiles] = useState(null);

  const textInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sendButtonRef = useRef<HTMLButtonElement>(null);

  const currentChatId = useCurrentChatId();
  const { sendMessage } = useMessages(currentChatId);

  const autoFocusInput = () => {
    textInputRef.current?.focus();
  };

  const openSelectFilesView = () => {
    fileInputRef.current?.click();
  };

  const handleOnTextChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setMessage(ev.target.value);
  };

  const handleOnFileChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const fileList = ev.target.files;

    setFiles(fileList);

    setOpenFilesPreview(Boolean(fileList));
  };

  const handleOnKeyPress = (ev: KeyboardEvent) => {
    if (ev.key === "Enter") {
      sendButtonRef.current.click();
    }
  };

  const handleSendMessage = () => {
    if (message || files) {
      sendMessage({ message, files });

      setMessage("");
      setFiles(null);
    }
  };

  return (
    <div className={cl("MessageInput")} onClick={autoFocusInput}>
      <div className={cl("input-container")}>
        {openEmojiPicker && (
          <Box className={cl("emoji_picker_box")}>
            <Picker
              data={data}
              onEmojiSelect={(emoji) => {
                setMessage((prev) => (prev += emoji.native));
              }}
            />
          </Box>
        )}

        <IconButton
          aria-label="emoji"
          variant="unstyled"
          icon={<BsEmojiSunglasses className={cl("input_icon")} />}
          onClick={() => {
            setOpenEmojiPicker((prev) => !prev);
          }}
        />

        <Input
          variant="unstyled"
          className={cl("enter-field")}
          ref={textInputRef}
          placeholder="Message"
          type="text"
          value={message}
          onChange={handleOnTextChange}
          onKeyPress={handleOnKeyPress}
        />
        <Input
          ref={fileInputRef}
          type="file"
          multiple
          display="none"
          onChange={handleOnFileChange}
        />

        <IconButton
          aria-label="emoji"
          variant="unstyled"
          onClick={() => openSelectFilesView()}
          icon={<RiAttachment2 className={cl("input_icon")} />}
        ></IconButton>
      </div>
      <IconButton
        ref={sendButtonRef}
        aria-label="send"
        variant="unstyled"
        className={cl("send_btn")}
        icon={<IoMdSend className={cl("send_icon")} />}
        onClick={() => handleSendMessage()}
      />

      <MessageFilesPreview
        isOpen={openFilesPreview}
        onClose={() => setOpenFilesPreview(false)}
        onSend={() => handleSendMessage()}
        files={files}
      />
    </div>
  );
};
