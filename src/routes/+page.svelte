<script lang="ts">
	import PageBlock from '$lib/components/PageBlock.svelte';
	import { Button } from 'svelte-ux';
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
		<Button variant="fill" color="primary" href="/spells">View Spells</Button>
		<Button variant="fill" color="primary" href="/spellbooks/create">Create New Spellbook</Button>
	</div>
</PageBlock>
