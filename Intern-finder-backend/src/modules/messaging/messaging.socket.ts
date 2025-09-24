import { Server, Socket } from "socket.io";
import { messageService } from "./message.service";

export const registerMessagingHandlers = (io: Server, socket: Socket) => {
  // Join a conversation room
  socket.on("joinConversation", (conversationId: string) => {
    socket.join(conversationId);
    console.log(`Socket ${socket.id} joined conversation ${conversationId}`);
  });

  // Send a message
  socket.on("sendMessage", async (payload) => {
    try {
      const message = await messageService.createMessage(payload);

      // Broadcast to all in conversation
      io.to(payload.conversationId).emit("newMessage", message);
    } catch (err: any) {
      socket.emit("errorMessage", { error: err.message });
    }
  });

  // Mark message as read
  socket.on("markAsRead", async ({ messageId }) => {
    try {
      const updated = await messageService.markAsRead(messageId);
      io.to(updated.conversationId).emit("messageRead", updated);
    } catch (err: any) {
      socket.emit("errorMessage", { error: err.message });
    }
  });
};
