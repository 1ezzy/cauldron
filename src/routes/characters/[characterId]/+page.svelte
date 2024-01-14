<script lang="ts">
	import PageBlock from '$lib/components/PageBlock.svelte';
	import DeleteCharacterModal from '$lib/components/modals/DeleteCharacterModal.svelte';
	import { AbilityScoreType } from '$lib/types/ability-score.type';
	import type { CharacterWithClassesAndRace } from '$lib/types/character-with-classes-race.type.js';
	import { capitalizeFirstLetter } from '$lib/utils/string-utils.js';
	import {
		type ModalComponent,
		type ModalSettings,
		getModalStore,
		TabGroup,
		Tab
	} from '@skeletonlabs/skeleton';

	export let data;

	let characterData: CharacterWithClassesAndRace = data.characterItem;
	let characterName: String = characterData.character_name;
	let characterId: String = characterData.id;
	let userId: String = data.userId;

	$: characterData = data.characterItem;
	$: characterName = characterData.character_name;
	$: characterId = characterData.id;
	$: userId = data.userId;

	const modalStore = getModalStore();

	const modalComponent: ModalComponent = {
		ref: DeleteCharacterModal,
		props: { userId, characterId, characterName }
	};

	const modal: ModalSettings = {
		type: 'component',
		component: modalComponent,
		title: 'Delete Character'
	};

	const modalDeleteCharacter = () => {
		modalStore.trigger(modal);
	};

	let tabSet: number = 0;
</script>

<svelte:head>
	<title>Cauldron | {characterData.character_name}</title>
</svelte:head>
<PageBlock>
	<h1 class="h1 mb-4 text-primary-500 text-center">{characterName}</h1>

	<h3 class="h3 mb-8 text-tertiary-500 text-center">
		{characterData.classes.map((word) => capitalizeFirstLetter(word.name)).join('/')} |
		{characterData.race.name}
	</h3>
	<button
		class="btn variant-filled-error mb-4"
		on:click={() => {
			modalDeleteCharacter();
		}}
	>
		Delete Character
	</button>
	<div class="w-full flex-1">
		<TabGroup class="h-full flex flex-col text-tertiary-500" regionPanel="flex flex-1">
			<Tab bind:group={tabSet} name="tabMain" value={0}>Main Details</Tab>
			<Tab bind:group={tabSet} name="tabInventory" value={1}>Inventory</Tab>
			<Tab bind:group={tabSet} name="tabSpells" value={2}>Spells</Tab>
			<svelte:fragment slot="panel">
				{#if tabSet === 0}
					<div class="w-fit flex flex-col text-center">
						<h2 class="h2 text-primary-500">Ability<br />Scores</h2>
						<div class="p-4 w-fit flex flex-1 flex-col justify-between items-center">
							{#each characterData.scores_original as score}
								<div class="flex flex-col items-center">
									<h2 class="h2 text-secondary-500">{score.type}</h2>
									<h3 class="h3">{score.value}</h3>
								</div>
							{/each}
						</div>
					</div>
				{:else if tabSet === 1}
					(tab panel 2 contents)
				{:else if tabSet === 2}
					(tab panel 3 contents)
				{/if}
			</svelte:fragment>
		</TabGroup>
	</div>
</PageBlock>
