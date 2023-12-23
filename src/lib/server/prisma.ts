import { PrismaClient as PrismaClientNode } from '@prisma/client';
import { PrismaClient as PrismaClientEdge } from '@prisma/client/edge';
import { ACCELERATE_URL, MONGODB_URL } from '$env/static/private';
import { dev } from '$app/environment';

const prisma = dev
	? new PrismaClientNode({ datasources: { db: { url: MONGODB_URL } } })
	: new PrismaClientEdge({ datasources: { db: { url: ACCELERATE_URL } } });
export { prisma };
