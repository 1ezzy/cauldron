import { Prisma } from '@prisma/client';

export type SpellbookWithClasses = Prisma.SpellbookGetPayload<{
	include: { classes: true };
}>;
