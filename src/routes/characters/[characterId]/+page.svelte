<script lang="ts">
	import PageBlock from '$lib/components/PageBlock.svelte';
	import DeleteCharacterModal from '$lib/components/modals/DeleteCharacterModal.svelte';
	import { capitalizeFirstLetter } from '$lib/utils/string-utils.js';
	import {
		getModalStore,
		popup,
		type ModalComponent,
		type ModalSettings,
		type PopupSettings
	} from '@skeletonlabs/skeleton';

	export let data;

	let characterData = data.characterItem;
	let characterName = characterData.name;
	let characterId = characterData.id;
	let userId = data.userId;

	$: characterData = data.characterItem;
	$: characterName = characterData.name;
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

	const popupHover: PopupSettings = {
		event: 'hover',
		target: 'popupHover',
		placement: 'right'
	};

	const modalDeleteCharacter = () => {
		modalStore.trigger(modal);
	};
</script>

<svelte:head>
	<title>Cauldron | {characterData.character_name}</title>
</svelte:head>
<PageBlock>
	<h1 class="h1 mb-4 text-primary-500 text-center">{characterData?.character_name}</h1>
	<h3 class="h3 mb-8 text-tertiary-500 text-center">
		{characterData.classes.map((word) => capitalizeFirstLetter(word.name)).join('/')} |
		{characterData.race.name}
	</h3>
</PageBlock>
