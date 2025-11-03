import { PrismaClient } from '../generated/prisma';

export const prisma = new PrismaClient();

/*import { PrismaClient } from '../generated/prisma';

try {
    export const prisma = new PrismaClient();
} catch (error) {
    console.error("Erro fatal ao inicializar o Prisma. A variável DATABASE_URL está correta?", error);
    process.exit(1); // Força a saída para vermos o erro exato
} */