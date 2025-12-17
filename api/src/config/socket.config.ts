import { Server } from "socket.io";

let io: Server;

export const Socket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
    transports: ["websocket"],
  });
  if (io) console.log("Web Socket Initialized....");
};

export const ioServer = () => {
  if (!io) throw new Error("Error Start Web Socket ");
  return io;
};
