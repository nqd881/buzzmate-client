import { pinMessagesApi, PinMessagesApiOptions } from "@apis/chat/pin-messages";
import { useMutation } from "@tanstack/react-query";

export const usePinMessagesMutation = () => {
  return useMutation({
    mutationKey: ["pin_messages"],
    mutationFn: (vars: PinMessagesApiOptions) => pinMessagesApi(vars),
  });
};
