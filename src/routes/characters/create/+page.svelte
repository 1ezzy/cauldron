<script lang="ts">
	import type { PageData } from './$types';
	import PageBlock from '$lib/components/PageBlock.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { ClassType } from '$lib/types/class.type';
	import { capitalizeFirstLetter } from '$lib/utils/string-utils';
	import { RaceType } from '$lib/types/race.type';

	export let data: PageData;
	const { form } = superForm(data.form);
</script>

<PageBlock>
	<h1 class="h1 mb-8 text-primary-500">Create a Character</h1>
	<form class="flex flex-col flex-1 gap-6" method="POST">
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
			<span>Player Name</span>
			<input
				class="input"
				type="text"
				name="playerName"
				bind:value={$form.playerName}
				placeholder="Enter a player name"
			/>
		</label>
		<label class="label">
			<span>Character Description</span>
			<textarea
				class="textarea"
				rows={4}
				name="description"
				bind:value={$form.description}
				placeholder="Enter a description for your character"
			/>
		</label>
		<label class="label">
			<span>Level</span>
			<input
				class="input"
				type="number"
				name="level"
				bind:value={$form.level}
				placeholder="Enter your character level"
			/>
		</label>
		<label class="label">
			<span>{$form.classes.length > 1 ? 'Classes' : 'Class (hold ctrl to select multiple)'}</span>
			<select
				class="select"
				name="classes"
				multiple
				bind:value={$form.classes}
				placeholder="Select a class"
			>
				{#each Object.values(ClassType) as value}
					<option {value}>{capitalizeFirstLetter(value)}</option>
				{/each}
			</select>
		</label>
		<label class="label">
			<span>Race</span>
			<select class="select" name="race" bind:value={$form.race} placeholder="Select a race">
				{#each Object.values(RaceType) as value}
					<option {value}>{capitalizeFirstLetter(value)}</option>
				{/each}
			</select>
		</label>
		<button class="mt-auto btn variant-filled-primary">Create Character</button>
	</form>
</PageBlock>
