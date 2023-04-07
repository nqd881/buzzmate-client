import {
  Box,
  Button,
  IconButton,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { sassClasses } from "@utils";
import { IoMdCreate } from "react-icons/io";
import styles from "./LeftHeader.module.scss";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Formik, FormikConfig } from "formik";
import { useMutation } from "@tanstack/react-query";
import { createChatApi } from "@apis/chat/create-chat";

interface CreateChatForm {
  title: string;
  description: string;
  memberUserIds: string[];
  search: string;
}

const cl = sassClasses(styles);

export const LeftHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const createChatMutation = useMutation({
    mutationFn: createChatApi,
    onSuccess: (data) => {
      console.log("New chat", data);
    },
  });

  const formConfig: FormikConfig<CreateChatForm> = {
    initialValues: {
      title: "",
      description: "",
      memberUserIds: [],
      search: "",
    },
    onSubmit: (values) => {
      createChatMutation.mutateAsync(values);
    },
  };

  return (
    <div className={cl("LeftHeader")}>
      <div className={cl("title")}>Messages</div>
      <IconButton
        className={cl("create_chat_btn")}
        aria-label="create-chat"
        variant="unstyled"
        icon={<IoMdCreate className={cl("create_chat_icon")} />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody className={cl("modal_body")}>
            <Box className={cl("form")}>
              <Formik {...formConfig}>
                {(form) => (
                  <form>
                    <Input
                      className={cl("input_field")}
                      placeholder="Title"
                      name="title"
                      variant="flushed"
                      required
                    />
                    <Input
                      className={cl("input_field")}
                      placeholder="Description"
                      name="description"
                      variant="flushed"
                    />

                    <Input
                      placeholder="Search"
                      name="search"
                      variant="flushed"
                    />
                  </form>
                )}
              </Formik>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button variant="solid" type="submit">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
