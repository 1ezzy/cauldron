<script lang="ts">
	import AddSpellModal from '$lib/components/modals/AddSpellModal.svelte';
	import PageBlock from '$lib/components/PageBlock.svelte';
	import { formatSpellLevelWithSchool } from '$lib/utils/string-utils.js';
	import { getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';

	export let data;

	const modalStore = getModalStore();

	const spellData = data.spellItem;
	const spellId: string = spellData.id;
	const classes: Array<string> = spellData.classes.map((item: any) => {
		return item.name;
	});

	const modalComponent: ModalComponent = {
		ref: AddSpellModal,
		props: { data, spellId }
	};

	const modal: ModalSettings = {
		type: 'component',
		component: modalComponent,
		title: 'Add to Spellbook'
	};

	const modalAddSpell = () => {
		modalStore.trigger(modal);
	};
</script>

<svelte:head>
	<title>Cauldron | {spellData.name}</title>
</svelte:head>
<PageBlock styles="w-fit">
	<h1 class="h1 mb-4 text-primary-500">{spellData.name}</h1>
	<div class="w-full md:mb-0 mb-8 flex md:flex-row flex-col md:items-start items-center">
		<span class="flex-1" />
		<h3 class="h3 md:mb-8 mb-4 flex-1 text-tertiary-500 text-center">
			{formatSpellLevelWithSchool(spellData.level, spellData.school.name)}
		</h3>
		<div class="flex flex-1 justify-end">
			<button class="w-fit btn variant-filled-primary" on:click={modalAddSpell}
				>Add to Spellbook</button
			>
		</div>
	</div>
	<div
		class="w-full py-4 px-6 mb-6 flex md:flex-row flex-col md:gap-12 gap-2 bg-surface-300 dark:bg-surface-500 rounded-xl"
	>
		<p>Casting Time: {spellData.casting_time}</p>
		<p>Range: {spellData.range}</p>
		<p>Components: {spellData.components.join(', ')}</p>
		<p>Duration: {spellData.duration}</p>
	</div>
	<div class="max-w-2xl text-xl leading-relaxed">
		{#each spellData.desc as item}
			<p class="mb-4">{item.replaceAll('*', '') + '\r\n'}</p>
		{/each}
		{#if spellData.higher_level.length > 0}
			<p><strong>At higher levels: </strong>{spellData.higher_level}</p>
		{/if}
	</div>
	<div class="mt-auto flex text-xl text-secondary-500">
		<p>
			<strong>Classes: </strong>
			{classes.join(', ')}
		</p>
	</div>
</PageBlock>
