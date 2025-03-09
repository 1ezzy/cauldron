<script lang="ts">
	import { stringToIndex } from '$lib/utils/string-utils';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Cauldron | Spells</title>
</svelte:head>
<div class="flex flex-col items-center gap-2">
	<span class="mb-4 font-bold">Spells</span>
	{#each data.spellsItem.splice(0, 10) as spell}
		<a href={`spells/${stringToIndex(spell.name.toLowerCase())}`}>{spell.name}</a>
	{/each}
</div>
