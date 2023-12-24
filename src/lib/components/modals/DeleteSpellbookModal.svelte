<script lang="ts">
	import { goto } from '$app/navigation';
	import { getModalStore, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	export let parent: any;
	export let userId: string;
	export let spellbookId: string;
	export let spellbookName: string;

	const modalStore = getModalStore();
	const toastStore = getToastStore();

	const handleSubmit = async () => {
		const deleteRes = await fetch(
			`/api/spellbooks/delete?user_id=${userId}&spellbook_id=${spellbookId}`,
			{
				method: 'DELETE'
			}
		);
		await deleteRes.json();

		modalStore.close();

		const toastDeleteSpellbook: ToastSettings = {
			message: `Spellbook deleted`,
			background: 'variant-filled-error'
		};
		toastStore.trigger(toastDeleteSpellbook);

		goto('/spellbooks');
	};
</script>

{#if $modalStore[0]}
	<div class="card p-8 w-modal-slim shadow-xl">
		<header class="text-2xl font-bold text-primary-500">
			<h3 class="h3 mb-4">{$modalStore[0].title}</h3>
		</header>
		<div class="mb-12 p-4 flex flex-col gap-4 border-2 border-surface-500 rounded-xl">
			<h4 class="h4">Are you sure you want to delete the following spellbook:</h4>
			<h4 class="h4 text-secondary-500 font-bold">{spellbookName}</h4>
		</div>
		<footer class="flex justify-end">
			<button class="mr-2 btn variant-filled-secondary" on:click={parent.onClose}> Cancel </button>
			<button class="btn variant-filled-error" on:click|preventDefault={handleSubmit}
				>Delete Spellbook
			</button>
		</footer>
	</div>
{/if}
