<script lang="ts">
	import PageBlock from '$lib/components/PageBlock.svelte';
	import SpellTable from '$lib/components/table/SpellTable.svelte';

	export let data;

	const spellsData = data.spellsItem;
</script>

<PageBlock>
	<h1 class="h1 mb-16 text-primary-500">Spells ({spellsData.length})</h1>
	<span class="w-full">
		<SpellTable {data} />
	</span>
</PageBlock>
