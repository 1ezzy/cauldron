<script lang="ts">
	import { modalStore } from '@skeletonlabs/skeleton';

	export let data: any[];

	const onFormSubmit = () => {
		modalStore.close();
	};
</script>

{#if $modalStore[0]}
	<div class="card p-8 w-modal-slim shadow-xl">
		<header class="text-2xl font-bold text-primary-500">
			<h3 class="h3 mb-4">{$modalStore[0].title}</h3>
		</header>
		<div class="mb-12 p-4 flex flex-col gap-4 border-2 border-surface-500 rounded-xl">
			{#each data as spellbook}
				<label class="flex items-center space-x-2">
					<input class="radio" type="radio" checked name="radio-direct" value="1" />
					<p>{spellbook.spellbook_name}</p>
				</label>
			{/each}
		</div>

		<footer class="flex justify-end">
			<button class="mr-2 btn variant-filled-secondary" on:click={() => modalStore.close()}>
				Cancel
			</button>
			<button class="btn variant-filled-primary" on:click={() => onFormSubmit}>
				Select Spellbook
			</button>
		</footer>
	</div>
{/if}
