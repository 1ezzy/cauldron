import { PrismaClient as PrismaClientNode } from '@prisma/client';
import { PrismaClient as PrismaClientEdge } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { ACCELERATE_URL, MONGODB_URL } from '$env/static/private';

const prisma = new PrismaClientEdge({ datasources: { db: { url: ACCELERATE_URL } } }).$extends(
	withAccelerate()
);
export { prisma };
