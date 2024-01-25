<script lang="ts">
	import { goto } from '$app/navigation';
	import { getModalStore, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { FriendModalTypeEnum } from '$lib/types/friend-modal-type.enum';

	export let parent;
	export let type: FriendModalTypeEnum;
	export let userData;

	const modalStore = getModalStore();
	const toastStore = getToastStore();

	const getButtonLabel = () => {
		switch (type) {
			case FriendModalTypeEnum.accept:
				return 'Accept';
			case FriendModalTypeEnum.remove:
				return 'Remove';
			case FriendModalTypeEnum.decline:
				return 'Decline';
		}
	};

	const handleSubmit = async () => {
		// const addRes = await fetch(
		// 	`/api/spells/add?user_id=${userId}&spellbook_id=${selectedSpellbookId}&spell_id=${spellId}`,
		// 	{
		// 		method: 'POST'
		// 	}
		// );
		// const data = await addRes.json();
		// const selectedSpellbookName = spellbookData.find(
		// 	(index) => index.id === selectedSpellbookId
		// ).spellbook_name;
		// modalStore.close();
		// if (!addRes.ok) {
		// 	const toastAddSpellFail: ToastSettings = {
		// 		message: `Error: ${data.message}`,
		// 		background: 'variant-filled-error'
		// 	};
		// 	toastStore.trigger(toastAddSpellFail);
		// } else {
		// 	const toastAddSpellSuccess: ToastSettings = {
		// 		message: `Spell successfully added to ${selectedSpellbookName}`,
		// 		action: {
		// 			label: 'View spellbook',
		// 			response: () => goto(`/spellbooks/${selectedSpellbookId}`)
		// 		},
		// 		background: 'variant-filled-success'
		// 	};
		// 	toastStore.trigger(toastAddSpellSuccess);
		// }
	};
</script>

{#if $modalStore[0]}
	<div class="card p-8 w-modal-slim shadow-xl">
		<header class="text-2xl font-bold text-primary-500">
			<h3 class="h3 mb-2">{$modalStore[0].title}?</h3>
			<h3 class="h4 mb-8 text-secondary-500">{userData.username}</h3>
		</header>
		<footer class="flex justify-start">
			<button class="mr-2 btn variant-filled-secondary" on:click={parent.onClose}> Cancel </button>
			<button
				class="btn"
				class:variant-filled-error={type !== FriendModalTypeEnum.accept}
				class:variant-filled-success={type === FriendModalTypeEnum.accept}
				on:click|preventDefault={handleSubmit}
			>
				{getButtonLabel()}
			</button>
		</footer>
	</div>
{/if}
