<script lang="ts">
	import PageBlock from '$lib/components/PageBlock.svelte';

	export let data;

	const spellsData = data.item;
</script>

<PageBlock>
	<h1 class="h1 mb-8 text-primary-500">Spells ({spellsData.length})</h1>
	<button class="btn variant-filled-tertiary"><a href="/spells/acid-splash">Acid Splash</a></button>
</PageBlock>
