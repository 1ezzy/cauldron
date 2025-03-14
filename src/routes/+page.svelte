<script lang="ts">
	import PageBlock from '$lib/components/PageBlock.svelte';
</script>

<svelte:head>
	<title>Cauldron</title>
</svelte:head>
<PageBlock
	title="Cauldron"
	subtitle="5e Spellbook Generator and Spell Wiki"
	gapsize={'gap-24'}
	center
>
	<div class="flex flex-col items-center gap-8">
		<a href="/spellbooks/create">Create New Spellbook</a>
		<a href="/spells">View Spells</a>
	</div>
</PageBlock>
