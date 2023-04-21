import {
  Box,
  Button,
  GridItem,
  Icon,
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
  VStack,
} from "@chakra-ui/react";
import { VerticalScrollableView } from "@components/shared/VerticalScrollableView";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { sassClasses } from "@utils";
import { isPhotoFile, isVideoFile } from "@utils/file";
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
import { useChatCenterContext } from "@contexts/ChatCenterContext";
import { useMessage } from "@hooks/data-x/useMessage";
import { useCurrentChatId } from "@hooks/router/useCurrentChatId";
import { useSendMessage } from "@hooks/useSendMessage";
import { IoClose } from "react-icons/io5";
import { TiArrowBackOutline } from "react-icons/ti";
import { useChats } from "@hooks/data-x/useChats";
import { ApiMessage } from "@apis/models/chat";
import { useForwardMessageMutation } from "@hooks/api-v2/useForwardMessageMutation";

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

export type MessageForwardModalProps = {
  isOpen: boolean;
  onClose: () => void;
  message: ApiMessage;
};

export const MessageForwardModal: React.FC<MessageForwardModalProps> = (
  props
) => {
  const forwardMessageMutation = useForwardMessageMutation();

  const { isOpen, onClose, message } = props;

  const { chats } = useChats();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Forwad Message</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box h={500}>
            <VerticalScrollableView>
              <VStack>
                {chats.map((chat) => (
                  <Button
                    w="100%"
                    textAlign="left"
                    key={chat.id}
                    onClick={() => {
                      forwardMessageMutation.mutateAsync({
                        toChatId: chat.id,
                        messageId: message.id,
                        chatId: message?.chatId,
                      });

                      onClose();
                    }}
                  >
                    {chat.title}
                  </Button>
                ))}
              </VStack>
            </VerticalScrollableView>
          </Box>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const MessageInput: React.FC<MessageInputProps> = (props) => {
  const currentChatId = useCurrentChatId();

  const {
    replying,
    setReplying,
    replyMessageId,
    setReplyMessageId,
    forwarding,
    setForwarding,
    forwardMessageId,
    setForwardMessageId,
  } = useChatCenterContext();

  const { message: forwardMessage } = useMessage(
    currentChatId,
    forwardMessageId
  );

  const { message: replyMessage } = useMessage(currentChatId, replyMessageId);

  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [openFilesPreview, setOpenFilesPreview] = useState(false);
  const [openForwardModal, setOpenForwardModal] = useState(false);

  const [message, setMessage] = useState("");
  const [files, setFiles] = useState(null);

  const textInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sendButtonRef = useRef<HTMLButtonElement>(null);

  const sendMessage = useSendMessage(currentChatId);

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
      sendMessage({ message, replyToMessageId: replyMessageId, files });

      setMessage("");
      setFiles(null);

      handleCloseReply();
    }
  };

  const handleCloseReply = () => {
    setReplying(false);
    setReplyMessageId(null);
  };

  useEffect(() => {
    autoFocusInput();
  }, [currentChatId]);

  useEffect(() => {
    setOpenForwardModal(forwarding);
  }, [forwarding]);

  return (
    <div className={cl("MessageInput")} onClick={autoFocusInput}>
      <div className={cl("container")}>
        <Box className={cl("input")}>
          {replying && (
            <Box className={cl("reply_box")}>
              <Icon as={TiArrowBackOutline} boxSize={7} m="0.25rem 0.6rem" />
              <Box className={cl("reply_message_divider")} />
              <Box className={cl("reply_message_view")}>
                <Box className={cl("reply_message")}>
                  <Box className={cl("reply_message_sender")}>
                    {replyMessage.sentByMember.name}
                  </Box>
                  <Box className={cl("reply_message_content")}>
                    {replyMessage.content?.text}
                  </Box>
                </Box>
              </Box>
              <IconButton
                className={cl("close_reply_btn")}
                aria-label="close-reply"
                icon={
                  <IoClose
                    className={cl("close_reply_icon")}
                    onClick={() => handleCloseReply()}
                  />
                }
              />
            </Box>
          )}
          <Box
            className={cl(["input_box", replying ? "input_box_replying" : ""])}
          >
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
          </Box>
        </Box>
        <IconButton
          ref={sendButtonRef}
          aria-label="send"
          variant="unstyled"
          className={cl("send_btn")}
          icon={<IoMdSend className={cl("send_icon")} />}
          onClick={() => handleSendMessage()}
        />
      </div>

      <MessageFilesPreview
        isOpen={openFilesPreview}
        onClose={() => setOpenFilesPreview(false)}
        onSend={() => handleSendMessage()}
        files={files}
      />

      <MessageForwardModal
        isOpen={openForwardModal}
        onClose={() => {
          setForwarding(false);
          setForwardMessageId(null);
        }}
        message={forwardMessage}
      />
    </div>
  );
};
