import {
  Avatar,
  Button,
  IconButton,
  Input,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { sassClasses } from "@utils";
import styles from "./ProfileHeader.module.scss";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Formik, FormikConfig, useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import {
  editChatInfoApi,
  EditChatInfoPayload,
} from "@apis/chat/edit-chat-info";
import { useChat } from "@hooks/data/use-chat";
import { useCurrentChatId } from "@hooks/router/useCurrentChatId";

const cl = sassClasses(styles);

interface UpdateChatInfoForm {
  title: string;
  description: string;
}

export const ProfileHeader = () => {
  const currentChatId = useCurrentChatId();

  const { chat } = useChat(currentChatId);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const updateBtnRef = React.useRef(null);

  const chatInfoMutation = useMutation({
    mutationFn: (payload: EditChatInfoPayload) =>
      editChatInfoApi(currentChatId, payload),
    onSuccess: () => {},
  });

  const formConfig: FormikConfig<UpdateChatInfoForm> = {
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: (values) => {
      console.log(values);

      // chatInfoMutation.mutateAsync(values);
    },
  };

  return (
    <div className={cl("ProfileHeader")}>
      <IconButton
        aria-label=""
        variant="ghost"
        className={cl("edit-btn")}
        icon={<MdOutlineEdit className={cl("edit-icon")} />}
        onClick={onOpen}
      />
      <Avatar className={cl("profile-avatar")} />
      <div className={cl("profile-name")}>{chat?.title}</div>
      <div className={cl("profile-last-seen")}>{chat?.description}</div>

      <Modal
        size="xl"
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik {...formConfig}>
              {(form) => (
                <form onSubmit={form.handleSubmit}>
                  <VStack>
                    <Input placeholder="Title" name="title" />
                    <Input placeholder="Description" name="description" />
                    <Button
                      ref={updateBtnRef}
                      display="none"
                      type="submit"
                    ></Button>
                  </VStack>
                </form>
              )}
            </Formik>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                updateBtnRef.current?.click();
                onClose();
              }}
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
