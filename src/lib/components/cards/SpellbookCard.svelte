<script lang="ts">
	import { capitalizeFirstLetter } from '$lib/utils/string-utils.js';
	import type { Spellbook } from '@prisma/client';

	export let spellbook: Spellbook;
</script>

<div
	class="card h-96 w-72 md:w-60 p-4 flex flex-col items-center bg-gradient-to-br variant-gradient-primary-secondary"
>
	<header class="card-header w-72 md:w-60 mb-2 text-xl text-center">
		<p class="text-xl font-bold truncate">{spellbook.spellbook_name}</p>
		<p class="text-lg truncate">
			{spellbook.character_name}
		</p>
		<p class="text-lg truncate">
			{spellbook.classes.map((word) => capitalizeFirstLetter(word.name)).join('/')}
		</p>
	</header>
	<hr class="w-full !border-t-2 my-1" />
	<section class="mt-2 px-4 line-clamp">
		{spellbook.spellbook_description ?? 'No description'}
	</section>
	<footer class="card-footer mt-auto">
		<a href="/spellbooks/{spellbook.id}">
			<button class="btn variant-filled-tertiary">Open Spellbook</button>
		</a>
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
