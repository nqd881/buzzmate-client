import { useQuery, useQueryClient } from "@tanstack/react-query";

export type UpdateStateRQFn<T> = (state: T) => T;

export const useStateRQ = <T>(key: string[], initialData?: T) => {
  const queryClient = useQueryClient();

  const getState = () => queryClient.getQueryData<T>(key);

  useQuery({
    queryKey: key,
    queryFn: getState,
    initialData,
  });

  const setState = (updater: T | UpdateStateRQFn<T>) =>
    queryClient.setQueryData<T>(key, updater);

  return [getState(), setState];
};
