<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Cauldron | Spells</title>
</svelte:head>
<div class="flex flex-col items-center gap-2">
	<div>{data.spellsItem.length}</div>
	<a href="/spellbooks">Spellbooks</a>
</div>
