<script lang="ts">
	import PageBlock from '$lib/components/PageBlock.svelte';
	import SpellTable from '$lib/components/table/SpellTable.svelte';
	import AddSpellModal from '$lib/components/modals/AddSpellModal.svelte';
	import type { ModalComponent, ModalSettings } from '@skeletonlabs/skeleton';

	export let data;

	const spellsData = data.spellsItem;
</script>

<PageBlock>
	<h1 class="h1 mb-8 text-primary-500">Spells ({spellsData.length})</h1>
	<span class="w-full">
		<SpellTable {data} />
	</span>
</PageBlock>
