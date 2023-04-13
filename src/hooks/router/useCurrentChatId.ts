import { useRouter } from "next/router";

export const useCurrentChatId = () => {
  const router = useRouter();

  const { id } = router?.query || {};

  return id as string;
};
