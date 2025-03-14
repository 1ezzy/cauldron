<script lang="ts">
	import type { Spell } from '@prisma/client';
	import PageBlock from '$lib/components/PageBlock.svelte';
	import { stringToIndex } from '$lib/utils/string-utils';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let spells = data.spellsItem;
</script>

<svelte:head>
	<title>Cauldron | Spells</title>
</svelte:head>
<PageBlock title="Spells" gapsize={'gap-8'}>
	<div class="flex flex-col items-center gap-2">
		{#each spells.splice(0, 10) as spell}
			<a href={`spells/${stringToIndex(spell.name.toLowerCase())}`}>{spell.name}</a>
		{/each}
	</div>
</PageBlock>
