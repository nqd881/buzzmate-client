import {
  Box,
  Button,
  IconButton,
  Input,
  useDisclosure,
  VStack,
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { createChatApi } from "@apis/chat/create-chat";
import { getUsersApi } from "@apis/chat/get-users";
import { ChangeEvent, useEffect, useState } from "react";
import { ApiChatUser } from "@apis/models/chat";

interface CreateChatForm {
  title: string;
  description: string;
  memberUserIds: string[];
}

const cl = sassClasses(styles);

export const LeftHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const createChatMutation = useMutation({
    mutationFn: createChatApi,
    onSuccess: (data) => {},
  });

  const searchQuery = useQuery({
    queryKey: ["search", "users"],
    queryFn: () =>
      getUsersApi({
        emails: [search],
      }),
    onSuccess: (data: ApiChatUser[]) => {},
  });

  const formConfig: FormikConfig<CreateChatForm> = {
    initialValues: {
      title: "",
      description: "",
      memberUserIds: [],
    },
    onSubmit: (values) => {
      createChatMutation.mutateAsync(values);
    },
  };

  useEffect(() => {
    if (search) searchQuery.refetch();
  }, [search]);

  const handleOnSearchChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;

    setSearch(value);

    // searchQuery.refetch();
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
                    <VStack>
                      <Input
                        className={cl("input_field")}
                        placeholder="Title"
                        name="title"
                        required
                      />
                      <Input
                        className={cl("input_field")}
                        placeholder="Description"
                        name="description"
                      />
                    </VStack>
                  </form>
                )}
              </Formik>
            </Box>
            <Input
              placeholder="Search"
              value={search}
              onChange={handleOnSearchChange}
            />
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
