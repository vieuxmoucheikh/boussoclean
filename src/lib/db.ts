import { PrismaClient } from '@prisma/client';

// Éviter de créer plusieurs instances de Prisma Client en développement
// https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
