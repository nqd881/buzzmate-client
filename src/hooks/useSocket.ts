import {useEffect, useState} from "react";
import {Socket} from "socket.io-client";
import {io} from "socket.io-client";

type GetSocketOptions<T> = T extends (...args: infer X) => Socket ? X : never;

export const useSocket = (...options: GetSocketOptions<typeof io>) => {
  const [socket, setSocket] = useState<Socket>(null);

  useEffect(() => {
    const newSocket = io(...options);

    setSocket(newSocket);

    return () => {
      if (!socket) return;

      socket.disconnect();
    };
  }, []);

  return socket;
};
