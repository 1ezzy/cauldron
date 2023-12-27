<script lang="ts">
	import { capitalizeFirstLetter } from '$lib/utils/string-utils.js';
	import type { Character } from '@prisma/client';

	export let character: Character;
</script>

<div
	class="card h-96 w-72 md:w-60 p-4 flex flex-col items-center bg-gradient-to-br variant-gradient-primary-secondary"
>
	<header class="card-header w-72 md:w-60 mb-2 text-xl text-center">
		<p class="text-xl font-bold truncate">{character.character_name}</p>
		<p class="text-lg truncate">
			{character.classes.map((word) => capitalizeFirstLetter(word.name)).join('/')}
		</p>
		<p class="text-lg truncate">
			{character.race.name}
		</p>
	</header>
	<hr class="w-full !border-t-2 my-1" />
	<section class="mt-2 px-4 line-clamp">
		{character.description ?? 'No Description'}
	</section>
	<footer class="card-footer mt-auto">
		<button class="btn variant-filled-tertiary">
			<a href="/characters/{character.id}">Open Character</a>
		</button>
	</footer>
</div>

<style lang="postcss">
	.line-clamp {
		width: 100%;
		display: -webkit-box;
		overflow: hidden;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 6;
	}
</style>
