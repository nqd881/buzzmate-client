import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Tag,
  TagCloseButton,
  TagLabel,
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createChatApi } from "@apis/chat/create-chat";
import { getUsersApi } from "@apis/chat/get-users";
import React, { ChangeEvent, useEffect, useState } from "react";
import { ApiChatUser } from "@apis/models/chat";
import { useSearchUsersQuery } from "@hooks/api-v2/useSearchUsers.query";
import { FormikCustomInput } from "@components/custom/FormikCustomInput";
import { ChatUser } from "src/models";

interface CreateChatForm {
  title: string;
  description: string;
}

const cl = sassClasses(styles);

export const CreateChatModal = React.memo(function _CreateChatModal(props: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { isOpen, onClose } = props;

  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [usersSelected, setUsersSelected] = useState([]);

  const createChatMutation = useMutation({
    mutationFn: createChatApi,
    onSuccess: (data) => {},
  });

  const { data, refetch } = useSearchUsersQuery(
    search
      .split(",")
      .map((searchString) => searchString.trim())
      .filter((searchString) => searchString !== "")
  );

  const formConfig: FormikConfig<CreateChatForm> = {
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: (values) => {
      const { title, description } = values;

      createChatMutation.mutateAsync({
        title,
        description,
        memberUserIds: usersSelected.map((user) => user.id),
      });
      // console.log(values);
    },
  };

  useEffect(() => {
    refetch();
  }, [search, refetch]);

  useEffect(() => {
    console.log("Data: ", data);
  }, [data]);

  const handleOnSearchChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;

    setSearch(value);
  };

  const handleAddUser = (userAdded: ChatUser) => {
    setUsersSelected((users) => [
      ...users.filter((user) => user.id !== userAdded.id),
      userAdded,
    ]);
  };

  const handleRemoveUser = (userRemoved: ChatUser) => {
    setUsersSelected((users) =>
      users.filter((user) => user.id !== userRemoved.id)
    );
  };

  const userIsSelected = (userId: string) => {
    return usersSelected.some((user) => user.id === userId);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent className={cl("CreateChatModal")}>
        <ModalHeader>Create Chat</ModalHeader>
        <ModalCloseButton />
        <ModalBody className={cl("modal_body")}>
          <Box className={cl("form")}>
            <Formik {...formConfig}>
              {(form) => (
                <form id="create-chat-form" onSubmit={form.handleSubmit}>
                  <VStack>
                    <FormikCustomInput
                      placeholder="Title"
                      name="title"
                      required
                    />
                    <FormikCustomInput
                      placeholder="Description"
                      name="description"
                    />
                  </VStack>
                </form>
              )}
            </Formik>
          </Box>
          <HStack m="1rem 0" wrap="wrap">
            {usersSelected.map((userSelected) => (
              <Tag key={userSelected.id}>
                <TagLabel>{userSelected.emailAddress}</TagLabel>
                <TagCloseButton
                  onClick={() => handleRemoveUser(userSelected)}
                />
              </Tag>
            ))}
          </HStack>
          <Input
            placeholder="Search"
            value={search}
            onChange={handleOnSearchChange}
            m={"1rem 0"}
          />
          {data?.map((searchUserResult) => {
            const isSelected = userIsSelected(searchUserResult.id);

            return (
              <HStack
                className={cl("user_item")}
                key={searchUserResult.id}
                justify="space-between"
              >
                <div>{searchUserResult.emailAddress}</div>
                <HStack>
                  {!isSelected && (
                    <Button
                      colorScheme="blue"
                      onClick={() => handleAddUser(searchUserResult)}
                    >
                      Add
                    </Button>
                  )}
                  {isSelected && (
                    <Button
                      colorScheme="gray"
                      _hover={{ bg: "red", color: "white" }}
                      onClick={() => handleRemoveUser(searchUserResult)}
                    >
                      Remove
                    </Button>
                  )}
                </HStack>
              </HStack>
            );
          })}
        </ModalBody>
        <ModalFooter>
          <Button variant="solid" type="submit" form="create-chat-form">
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export const LeftHeader = React.memo(function _LeftHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    console.log("Rerender LeftHeader");
    console.log(isOpen);
  });

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

      {isOpen && <CreateChatModal isOpen={isOpen} onClose={onClose} />}
    </div>
  );
});
