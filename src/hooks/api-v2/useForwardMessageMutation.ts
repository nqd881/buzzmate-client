import {
  forwardMessageApi,
  ForwardMessageApiOptions,
} from "@apis/chat/forward-message";
import { useMutation } from "@tanstack/react-query";

export const useForwardMessageMutation = () => {
  return useMutation({
    mutationKey: ["forward_messages"],
    mutationFn: (vars: ForwardMessageApiOptions) => forwardMessageApi(vars),
  });
};
