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
	<div class="w-full">
		<TabGroup>
			<Tab bind:group={tabSet} name="tab1" value={0}>Main Details</Tab>
			<Tab bind:group={tabSet} name="tabInventory" value={1}>Inventory</Tab>
			<Tab bind:group={tabSet} name="tabSpells" value={2}>Spells</Tab>
			<svelte:fragment slot="panel">
				{#if tabSet === 0}
					<div class="p-4 w-full flex flex-col">
						<div class="flex justify-between">
							{#each AbilityScoreType as score}
								<div class="flex flex-col">
									<span>{score}</span>
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
