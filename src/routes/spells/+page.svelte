<script lang="ts">
	import PageBlock from '$lib/components/PageBlock.svelte';

	import type { PageProps } from './$types';

	import SpellTable from '$lib/components/SpellTable.svelte';

	let { data }: PageProps = $props();
	let spells = data.spellsItem;
</script>

<svelte:head>
	<title>Cauldron | Spells</title>
</svelte:head>
<PageBlock title="Spells" gapsize={'gap-8'}>
	<SpellTable data={spells} pageCount={25} nameCellType="link" />
</PageBlock>
