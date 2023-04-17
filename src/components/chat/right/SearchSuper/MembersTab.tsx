import {
  Avatar,
  Box,
  Button,
  ButtonProps,
  ComponentWithAs,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { VerticalScrollableView } from "@components/shared/VerticalScrollableView";
import { useMembersQuery } from "@hooks/api/useMembers.query";
import { sassClasses } from "@utils";
import React, { ChangeEvent, ForwardedRef, RefObject, useState } from "react";
import styles from "./MembersTab.module.scss";

import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import { banMemberApi } from "@apis/chat/ban-member";
import { getUsersApi } from "@apis/chat/get-users";
import { removeMemberApi } from "@apis/chat/remove-member";
import { useMembers } from "@hooks/data/user-members";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IoAddSharp } from "react-icons/io5";
import { useCurrentChatId } from "@hooks/router/useCurrentChatId";

const cl = sassClasses(styles);

type MemberProps = {
  chatId: string;
  memberId: string;
};

export type ChakraButtonProps = ComponentWithAs<"button", ButtonProps> extends (
  props: infer X
) => any
  ? X
  : never;

const Member: React.FC<MemberProps> = ({ chatId, memberId }) => {
  const { findMember, findMemberByUserId } = useMembers(chatId);

  const member = findMember(memberId);
  const inviterMember = findMemberByUserId(member.inviterUserId);

  const removeMemberMutation = useMutation({
    mutationFn: () => removeMemberApi(),
    onSuccess: () => {},
  });

  const banMemberMutation = useMutation({
    mutationFn: () =>
      banMemberApi(chatId, {
        memberIds: [memberId],
      }),
    onSuccess: () => {},
  });

  const handleChatWithMember = () => {};

  const handleRemoveMember = () => {};

  const handleBanMember = () => {
    banMemberMutation.mutateAsync();
  };

  const CustomButton = React.forwardRef(function _CustomButton(
    props: ChakraButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) {
    return (
      <Button
        ref={ref}
        {...props}
        size="lg"
        height="4rem"
        p="0.8rem"
        className={cl("Member")}
      >
        <Box>
          <Avatar className={cl("member-avatar")} src={""} />
        </Box>
        <div className={cl("member-info")}>
          <div className={cl("member-name")}>{member.name}</div>
          <div
            className={cl("member-added-by")}
          >{`Added by ${inviterMember.name}`}</div>
        </div>
      </Button>
    );
  });

  return (
    <Menu>
      <MenuButton as={CustomButton} />
      <Box position="relative">
        <MenuList>
          <MenuItem onClick={() => handleChatWithMember()}>Chat</MenuItem>
          <MenuItem onClick={() => handleRemoveMember()}>Remove</MenuItem>
          <MenuItem onClick={() => handleBanMember()}>Ban</MenuItem>
        </MenuList>
      </Box>
    </Menu>
  );
};

export const InviteUsers = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const search = useQuery({
    queryKey: ["search", "users"],
    queryFn: async () => {},
    onSuccess: () => {},
  });

  const onSearchQueryChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;

    setSearchQuery(value);

    search.refetch();
  };

  return (
    <>
      <Button
        bgColor={"transparent"}
        w="100%"
        h="3rem"
        p="1rem"
        leftIcon={<IoAddSharp size={24} />}
        onClick={onOpen}
      >
        Add Users
      </Button>

      <Modal
        size="xl"
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Invite Users</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={onSearchQueryChange}
            />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue">Invite</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const MembersTab = () => {
  const currentChatId = useCurrentChatId();

  useMembersQuery(currentChatId);

  const { members } = useMembers(currentChatId);

  return (
    <VerticalScrollableView>
      <div className={cl("MembersTab")}>
        <InviteUsers />
        {members?.map((member) => (
          <Member key={member.id} chatId={currentChatId} memberId={member.id} />
        ))}
      </div>
    </VerticalScrollableView>
  );
};
