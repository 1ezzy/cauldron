<script lang="ts">
	import PageBlock from '$lib/components/PageBlock.svelte';
	import { formatSpellLevelWithSchool } from '$lib/utils/string-utils.js';

	export let data;

	const spellData = data.item;
	const classes: Array<string> = spellData.classes.map((item: any) => {
		return item.name;
	});
</script>

<PageBlock>
	<h1 class="h1 mb-8 text-primary-500">{spellData.name}</h1>
	<h3 class="h3 mb-6 italic">
		{formatSpellLevelWithSchool(spellData.level, spellData.school.name)}
	</h3>
	<div class="py-4 px-6 mb-6 flex gap-12 bg-surface-300 dark:bg-surface-500 rounded-full">
		<p>Casting Time: {spellData.casting_time}</p>
		<p>Range: {spellData.range}</p>
		<p>Components: {spellData.components.join(', ')}</p>
		<p>Duration: {spellData.duration}</p>
	</div>
	<div class="max-w-2xl text-xl leading-relaxed">
		{#each spellData.desc as item}
			<p class="mb-4">{item + '\r\n'}</p>
		{/each}
		{#if spellData.higher_level.length > 0}
			<p><strong>At higher levels: </strong>{spellData.higher_level}</p>
		{/if}
	</div>
	<div class="mt-auto flex text-xl">
		<span>
			<strong>Classes: </strong>
			{classes.join(', ')}
		</span>
	</div>
</PageBlock>
