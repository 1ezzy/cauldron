import { PrismaClient as PrismaClientEdge } from '@prisma/client/edge';
import { ACCELERATE_URL } from '$env/static/private';

const prisma = new PrismaClientEdge({ datasources: { db: { url: ACCELERATE_URL } } });
export { prisma };
