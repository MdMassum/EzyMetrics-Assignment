import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

declare global {
  var prisma: PrismaClient | undefined;
}

if (!global.prisma) {
  global.prisma = new PrismaClient();
}

prisma = global.prisma;

process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit();
});

export default prisma;
