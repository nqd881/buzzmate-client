import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { io } from "socket.io-client";

type GetSocketOptions<T> = T extends (...args: infer X) => Socket ? X : never;

export const useSocket = (...options: GetSocketOptions<typeof io>) => {
  const [socket, setSocket] = useState<Socket>(null);

  useEffect(() => {
    const newSocket = io(...options);

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Socket connected", newSocket.id);
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected", newSocket.io);
    });

    return () => {
      if (!socket) return;

      socket.disconnect();
    };
  }, []);

  return socket;
};
