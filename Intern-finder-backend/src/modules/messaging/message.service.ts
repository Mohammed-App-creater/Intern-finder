import prisma from "../../utils/prisma";


export const messageService = {
    async createMessage({ conversationId, content, companyId, talentId }: { conversationId: string; content: string; companyId?: string; talentId?: string }) {
        return prisma.message.create({
            data: {
                content,
                conversationId,
                companyId,
                talentId,
            },
            include: {
                company: true,
                talent: true,
            },
        });
    },

    async markAsRead(messageId: string) {
        return prisma.message.update({
            where: { id: messageId },
            data: { isRead: true },
        });
    },

    async getMessages(conversationId: string) {
        return prisma.message.findMany({
            where: { conversationId },
            orderBy: { createdAt: "asc" },
            include: { company: true, talent: true },
        });
    },

    async createConversation(data: any) {
        // check if conversation exists with the same participants
        // optional: add logic to prevent duplicate convo
        return prisma.conversation.create({ data });
    },

    async getConversationsForUser(user: { type: "company" | "talent"; id: string }) {
        if (user.type === "company") {
            return prisma.conversation.findMany({
                where: {
                    OR: [
                        { company1Id: user.id },
                        { company2Id: user.id }
                    ]
                },
                include: { messages: true }
            });
        } else {
            return prisma.conversation.findMany({
                where: {
                    OR: [
                        { talent1Id: user.id },
                        { talent2Id: user.id }
                    ]
                },
                include: { messages: true }
            });
        }
    },
};
