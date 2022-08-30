import { PrismaClient } from "@prisma/client";

export class PrismaFactory {
    static prisma: PrismaClient;
    static getPrisma(): PrismaClient {
        if (!PrismaFactory.prisma) {
            PrismaFactory.prisma = new PrismaClient();
        }
        return PrismaFactory.prisma;
    }
}