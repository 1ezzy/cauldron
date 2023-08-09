<script lang="ts">
	import PageBlock from '$lib/components/PageBlock.svelte';

	export let data;

	const spellData = data.item;
</script>

<PageBlock>
	<h1 class="h1 mb-4 text-primary-500">Spells ({spellData.count})</h1>
</PageBlock>
