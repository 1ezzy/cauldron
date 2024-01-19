import { Prisma } from '@prisma/client';

export type CharacterWithClassesAndRace = Prisma.CharacterGetPayload<{
	include: { classes: true; race: true };
}>;
