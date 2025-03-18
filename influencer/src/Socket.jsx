import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:4000";
let socket;

export const getSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, { withCredentials: true });
    console.log("🔗 Socket connected:", socket.id);
  }
  return socket;
};
