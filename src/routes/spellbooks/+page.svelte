<script lang="ts">
	import PageBlock from '$lib/components/PageBlock.svelte';
	import SpellbookCard from '$lib/components/SpellbookCard.svelte';
	import type { Spellbook } from '@prisma/client';

	export let data;

	let spellbookData: Spellbook[] = data.spellbooksItem;
</script>

<PageBlock>
	<h1 class="h1 mb-8 text-primary-500">Spellbooks</h1>
	{#if spellbookData.length > 0}
		<div class="my-auto w-full flex justify-center">
			<div
				class="flex overflow-x-scroll snap-x scroll-px-4 snap-mandatory scroll-smooth gap-8 px-4 py-10"
			>
				{#each spellbookData as spellbook}
					<SpellbookCard {spellbook} />
				{/each}
			</div>
		</div>
	{:else}
		<button class="btn variant-filled-primary"
			><a href="/spellbooks/create">Create a Spellbook</a></button
		>
	{/if}
</PageBlock>
