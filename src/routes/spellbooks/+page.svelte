<script lang="ts">
	import PageBlock from '$lib/components/PageBlock.svelte';
	import SpellbookCard from '$lib/components/cards/SpellbookCard.svelte';
	import type { Spellbook } from '@prisma/client';

	export let data;

	let spellbookData: Spellbook[] = data.spellbooksItem;

	const gridSizes: { [key: number]: string } = {
		1: 'grid-cols-1',
		2: 'md:grid-cols-2 grid-cols-1',
		3: 'lg:grid-cols-3 md:grid-cols-2 grid-cols-1',
		4: 'xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1',
		5: 'xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1',
		6: 'xl:grid-cols-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1'
	};
</script>

<svelte:head>
	<title>Cauldron | Spellbooks</title>
</svelte:head>
<PageBlock>
	<div class="w-full mb-8 flex md:flex-row flex-col md:gap-0 gap-2 items-center">
		<div class="basis-1/3" />
		<h1 class="h1 text-primary-500 text-center basis-1/3">Spellbooks</h1>
		<a href="/spellbooks/create" class="flex justify-end basis-1/3">
			<button class="btn variant-filled-primary">Create a Spellbook</button>
		</a>
	</div>
	{#if spellbookData.length > 0}
		<div class={`my-auto grid ${gridSizes[Math.min(6, spellbookData.length)]} gap-8`}>
			{#each spellbookData as spellbook}
				<SpellbookCard {spellbook} />
			{/each}
		</div>
	{:else}
		<span class="my-auto">No spellbooks to display</span>
	{/if}
</PageBlock>
