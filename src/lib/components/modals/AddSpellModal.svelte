<script lang="ts">
	import { modalStore } from '@skeletonlabs/skeleton';

	export let parent: any;
	export let data: any;
	export let spellId: string;

	let userId: string = data.session.user.userId;
	let spellbookData: any[] = data.spellbookItem;

	let spellbooks: string[] = spellbookData.map((spellbook) => {
		return spellbook.id;
	});
	let selectedSpellbookId: string = spellbooks[0];

	const handleSubmit = async () => {
		const response = await fetch(
			`/api/spells/add?user_id=${userId}&spellbook_id=${selectedSpellbookId}&spell_id=${spellId}`,
			{
				method: 'POST'
			}
		);
		modalStore.close();
	};
</script>

{#if $modalStore[0]}
	<div class="card p-8 w-modal-slim shadow-xl">
		<header class="text-2xl font-bold text-primary-500">
			<h3 class="h3 mb-4">{$modalStore[0].title}</h3>
		</header>
		<div class="mb-12 p-4 flex flex-col gap-4 border-2 border-surface-500 rounded-xl">
			{#each spellbookData as spellbook, i}
				<label class="flex items-center space-x-2">
					<input
						class="radio"
						type="radio"
						checked={i <= 0}
						name="radio-{i}"
						on:change={() => (selectedSpellbookId = spellbook.id)}
					/>
					<p>{spellbook.spellbook_name}</p>
				</label>
			{/each}
		</div>
		<footer class="flex justify-end">
			<button class="mr-2 btn variant-filled-secondary" on:click={parent.onClose}> Cancel </button>
			<button class="btn variant-filled-primary" on:click|preventDefault={handleSubmit}
				>Select Spellbook
			</button>
		</footer>
	</div>
{/if}
