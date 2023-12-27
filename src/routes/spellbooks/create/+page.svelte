<script lang="ts">
	import type { PageData } from './$types';
	import PageBlock from '$lib/components/PageBlock.svelte';
	import { capitalizeFirstLetter } from '$lib/utils/string-utils';
	import { CastingClassType } from '$lib/types/casting-class.type';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;
	const { form } = superForm(data.form);

	let classes: number = 1;
</script>

<PageBlock>
	<h1 class="h1 mb-8 text-primary-500">Create a Spellbook</h1>
	<form class="flex flex-col flex-1 gap-6" method="POST">
		<label class="label">
			<span>Spellbook Name</span>
			<input
				class="input"
				type="text"
				name="name"
				bind:value={$form.name}
				placeholder="Enter a spellbook name"
			/>
		</label>
		<label class="label">
			<span>Character Name</span>
			<input
				class="input"
				type="text"
				name="characterName"
				bind:value={$form.characterName}
				placeholder="Enter a character name"
			/>
		</label>
		<label class="label">
			<span>Spellbook Description</span>
			<textarea
				class="textarea"
				rows={4}
				name="description"
				bind:value={$form.description}
				placeholder="Enter a description for your spellbook"
			/>
		</label>
		<label class="label">
			<span>{classes === 1 ? 'Character Class' : 'Character Classes'}</span>
			<div class="flex flex-col gap-4">
				<select class="select" bind:value={$form.class1} name="class1">
					{#each Object.values(CastingClassType) as value}
						<option {value}>{capitalizeFirstLetter(value)}</option>
					{/each}
				</select>
				{#if classes >= 2}
					<select class="select" bind:value={$form.class2} name="class2">
						{#each Object.values(CastingClassType) as value}
							<option {value}>{capitalizeFirstLetter(value)}</option>
						{/each}
					</select>
				{/if}
				{#if classes >= 3}
					<select class="select" bind:value={$form.class3} name="class3">
						{#each Object.values(CastingClassType) as value}
							<option {value}>{capitalizeFirstLetter(value)}</option>
						{/each}
					</select>
				{/if}
				<div class="flex">
					{#if classes < 3}
						<button
							class="btn variant-filled-secondary w-fit"
							on:click={(event) => {
								event.preventDefault();
								classes += 1;
							}}
						>
							Add Class
						</button>
					{/if}
					{#if classes > 1}
						<button
							class="ml-auto btn variant-filled-tertiary w-fit"
							on:click={(event) => {
								event.preventDefault();
								classes -= 1;
							}}
						>
							Remove Class
						</button>
					{/if}
				</div>
			</div>
		</label>
		<button class="mt-auto btn variant-filled-primary">Create Spellbook</button>
	</form>
</PageBlock>
