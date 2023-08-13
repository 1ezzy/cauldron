<script lang="ts">
	import PageBlock from '$lib/components/PageBlock.svelte';
	import { capitalizeFirstLetter } from '$lib/utils/string-utils.js';

	export let data;

	let spellbookData = data.spellbooks;
</script>

<PageBlock>
	<h1 class="h1 mb-8 text-primary-500">Spellbooks</h1>
	{#if spellbookData.length > 0}
		<div class="my-auto">
			{#each spellbookData as spellbook}
				<div
					class="card h-96 w-72 p-4 flex flex-col items-center bg-gradient-to-br variant-gradient-primary-secondary"
				>
					<header class="card-header mb-2 text-xl">
						<span class="text-xl font-bold">{spellbook.spellbook_name}</span><br />
						<span class="text-lg"
							>{spellbook.character_name} the {capitalizeFirstLetter(
								spellbook.class.join(', ')
							)}</span
						>
					</header>
					<hr class="w-full !border-t-2 my-1" />
					<section class="mt-2 px-4">
						{spellbook.spellbook_description ?? 'No Description'}
					</section>
					<footer class="card-footer mt-auto">
						<button class="btn variant-filled-tertiary">
							<a href="/spellbooks/{spellbook.index}">Open Spellbook</a>
						</button>
					</footer>
				</div>
			{/each}
		</div>
	{:else}
		<button class="btn variant-filled-primary"
			><a href="/spellbooks/create">Create a Spellbook</a></button
		>
	{/if}
</PageBlock>
