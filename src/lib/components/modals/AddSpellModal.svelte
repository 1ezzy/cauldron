<script lang="ts">
	import { goto } from '$app/navigation';
	import { getModalStore, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	export let parent: any;
	export let data: any;
	export let spellId: string;

	let userId: string = data.session.user.userId;
	let spellbookData: any[] = data.spellbookItem;

	let spellbooks: string[] = spellbookData.map((spellbook) => {
		return spellbook.id;
	});
	let selectedSpellbookId: string = spellbooks[0];

	const modalStore = getModalStore();
	const toastStore = getToastStore();

	const handleSubmit = async () => {
		const addRes = await fetch(
			`/api/spells/add?user_id=${userId}&spellbook_id=${selectedSpellbookId}&spell_id=${spellId}`,
			{
				method: 'POST'
			}
		);
		const data = await addRes.json();
		const selectedSpellbookName = spellbookData.find(
			(index) => index.id === selectedSpellbookId
		).spellbook_name;

		modalStore.close();

		if (!addRes.ok) {
			const toastAddSpellFail: ToastSettings = {
				message: `Error: ${data.message}`,
				background: 'variant-filled-error'
			};
			toastStore.trigger(toastAddSpellFail);
		} else {
			const toastAddSpellSuccess: ToastSettings = {
				message: `Spell successfully added to ${selectedSpellbookName}`,
				action: {
					label: 'View spellbook',
					response: () => goto(`/spellbooks/${selectedSpellbookId}`)
				},
				background: 'variant-filled-success'
			};
			toastStore.trigger(toastAddSpellSuccess);
		}
	};
</script>

{#if $modalStore[0]}
	<div class="card p-8 w-modal-slim shadow-xl">
		<header class="text-2xl font-bold text-primary-500">
			<h3 class="h3 mb-4">{$modalStore[0].title}</h3>
		</header>
		{#if spellbookData.length > 0}
			<div class="mb-12 p-4 flex flex-col gap-4 border-2 border-surface-500 rounded-xl">
				{#each spellbookData as spellbook}
					<label class="flex items-center space-x-2">
						<input
							class="radio"
							type="radio"
							checked={selectedSpellbookId === spellbook.id}
							name="radio-{spellbook.id}"
							on:change={() => (selectedSpellbookId = spellbook.id)}
						/>
						<p>{spellbook.spellbook_name}</p>
					</label>
				{/each}
			</div>
			<footer class="flex justify-end">
				<button class="mr-2 btn variant-filled-secondary" on:click={parent.onClose}>
					Cancel
				</button>
				<button class="btn variant-filled-primary" on:click|preventDefault={handleSubmit}
					>Select Spellbook
				</button>
			</footer>
		{:else}
			<div class="p-4 flex flex-col gap-4">
				<h4 class="h4 text-center">No spellbooks</h4>
				<a class="btn variant-filled-primary" href="/spellbooks/create" on:click={modalStore.close}
					>Create a Spellbook</a
				>
			</div>
		{/if}
	</div>
{/if}
