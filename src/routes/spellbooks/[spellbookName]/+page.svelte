<script lang="ts">
	import PageBlock from '$lib/components/PageBlock.svelte';
	import { capitalizeFirstLetter } from '$lib/utils/string-utils.js';

	export let data;

	let spellbookData = data.spellbook;
</script>

<PageBlock>
	<h1 class="h1 mb-4 text-primary-500">{spellbookData?.spellbook_name}</h1>
	<h3 class="h3 mb-8 text-tertiary-500">
		{spellbookData?.character_name} the {capitalizeFirstLetter(
			(spellbookData?.class ?? []).join('/')
		)}
	</h3>
	<div class="w-full flex flex-1">
		<div class="p-8 basis-2/3">
			<h3 class="h3 mb-8 text-secondary-500">Your Spells</h3>
			{#if spellbookData?.spells}
				<div>Test</div>
			{:else}
				<span>No spells to display</span><br />
				<span>Click <a class="text-secondary-500" href="/spells">here</a> to add some</span>
			{/if}
		</div>
		<span class="divider-vertical h-[90%]" />
		<div class="p-8 basis-1/3 flex flex-col">
			<h3 class="h3 mb-8 text-secondary-500">Spellbook Details</h3>
			<div class="mb-8">
				<h4 class="h4 mb-2 text-tertiary-500">Spellbook Description</h4>
				{spellbookData?.spellbook_description}
			</div>
			<div class="mb-8">
				<h4 class="h4 mb-2 text-tertiary-500">Created</h4>
				{spellbookData?.created_at.toDateString()}
			</div>
		</div>
	</div>
</PageBlock>
