import {
  hideMessagesApi,
  HideMessagesApiOptions,
} from "@apis/chat/hide-messages";
import { useMutation } from "@tanstack/react-query";

export const useHideMessagesMutation = () => {
  return useMutation({
    mutationKey: ["hide_messages"],
    mutationFn: (vars: HideMessagesApiOptions) => hideMessagesApi(vars),
  });
};
