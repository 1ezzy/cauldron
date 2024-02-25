<script lang="ts">
	import PageBlock from '$lib/components/PageBlock.svelte';
	import CharacterCard from '$lib/components/cards/CharacterCard.svelte';
	import type { Character } from '@prisma/client';

	export let data;

	let characterData: Character[] = data.charactersItem;

	const gridSizes: { [key: number]: string } = {
		1: 'grid-cols-1',
		2: 'md:grid-cols-2 grid-cols-1',
		3: 'lg:grid-cols-3 md:grid-cols-2 grid-cols-1',
		4: 'lg:grid-cols-4 md:grid-cols-2 grid-cols-1',
		5: 'lg:grid-cols-5 md:grid-cols-2 grid-cols-1',
		6: 'xl:grid-cols-6 md:grid-cols-2 grid-cols-1'
	};
</script>

<svelte:head>
	<title>Cauldron | Characters</title>
</svelte:head>
<PageBlock>
	<h1 class="h1 mb-8 text-primary-500">Characters</h1>
	<a class="btn variant-filled-primary mb-8" href="/characters/create">Create a Character</a>
	{#if characterData.length > 0}
		<div class={`my-auto grid ${gridSizes[Math.min(6, characterData.length)]} gap-8`}>
			{#each characterData as character}
				<CharacterCard {character} />
			{/each}
		</div>
	{:else}
		<span class="my-auto">No characters to display</span>
	{/if}
</PageBlock>
