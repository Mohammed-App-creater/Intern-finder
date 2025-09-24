// infrastructure/websocket.ts
import { Server } from "socket.io";
import http from "http";
import { registerMessagingHandlers } from "../modules/messaging/messaging.socket";

let io: Server;

export const initWebSocket = (server: http.Server) => {
    io = new Server(server, {
        cors: { origin: "*" }, // configure properly in prod
    });

    io.on("connection", (socket) => {
        console.log("✅ WebSocket connected:", socket.id);

        registerMessagingHandlers(io, socket);
        socket.on("disconnect", () => {
            console.log("❌ WebSocket disconnected:", socket.id);
        });
    });

    return io;
};

export const getIO = (): Server => {
    if (!io) {
        throw new Error("WebSocket not initialized. Call initWebSocket first.");
    }
    return io;
};

