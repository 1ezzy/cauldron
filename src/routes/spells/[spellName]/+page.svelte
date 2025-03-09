<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Cauldron | Spellbooks</title>
</svelte:head>
<div class="flex flex-col items-center gap-2">
	<span class="mb-4 font-bold">{data.spellItem.name}</span>
	{#each data.spellItem.desc as desc}
		<span class="w-[50%]">{desc}</span>
	{/each}
</div>
