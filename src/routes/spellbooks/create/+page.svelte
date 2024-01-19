<script lang="ts">
	import type { PageData } from './$types';
	import PageBlock from '$lib/components/PageBlock.svelte';
	import { capitalizeFirstLetter } from '$lib/utils/string-utils';
	import { CastingClassType } from '$lib/types/casting-class.type';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;
	const { form, errors } = superForm(data.form);
</script>

<svelte:head>
	<title>Cauldron | Create a Spellbook</title>
</svelte:head>
<PageBlock>
	<h1 class="h1 mb-8 text-primary-500">Create a Spellbook</h1>
	<form class="w-fit flex flex-col flex-1 gap-6" method="POST">
		<label class="label">
			<div class="flex gap-4">
				<span>Spellbook Name</span>
				{#if $errors.name}
					<span class="text-secondary-500">{$errors.name}</span>
				{/if}
			</div>
			<input
				class="input"
				class:input-error={$errors.name}
				type="text"
				name="name"
				aria-invalid={$errors.name ? 'true' : undefined}
				bind:value={$form.name}
				placeholder="Enter a spellbook name"
			/>
		</label>
		<label class="label">
			<span>Character Name</span>
			{#if $errors.characterName}
				<span class="text-secondary-500">{$errors.characterName}</span>
			{/if}
			<input
				class="input"
				class:input-error={$errors.characterName}
				type="text"
				name="characterName"
				aria-invalid={$errors.characterName ? 'true' : undefined}
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
			<span>{$form.classes.length > 1 ? 'Classes' : 'Class (hold ctrl to select multiple)'}</span>
			{#if $errors.classes?._errors}
				<span class="text-secondary-500">{$errors.classes._errors}</span>
			{/if}
			<div class="flex flex-col gap-4">
				<select
					class="select"
					class:input-error={$errors.classes?._errors ?? ''}
					name="classes"
					aria-invalid={$errors.classes?._errors ? 'true' : undefined}
					multiple
					bind:value={$form.classes}
					placeholder="Select a class"
				>
					{#each Object.values(CastingClassType) as value}
						<option {value}>{capitalizeFirstLetter(value)}</option>
					{/each}
				</select>
			</div>
		</label>
		<button class="mt-auto btn variant-filled-primary">Create Spellbook</button>
	</form>
</PageBlock>
