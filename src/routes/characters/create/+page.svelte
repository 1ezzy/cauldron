<script lang="ts">
	import type { PageData } from './$types';
	import PageBlock from '$lib/components/PageBlock.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { ClassType } from '$lib/types/class.type';
	import { capitalizeFirstLetter } from '$lib/utils/string-utils';
	import { RaceType } from '$lib/types/race.type';
	import { Stepper, Step } from '@skeletonlabs/skeleton';
	import { AbilityScoreType } from '$lib/types/ability-score.type';

	type StatType = {
		score: string;
		rolls: number[];
		value: number;
	};

	export let data: PageData;
	const { form, enhance } = superForm(data.form, {
		dataType: 'json'
	});

	$: manualStats = false;

	let statValues: StatType[];
	$: statValues = [];
	$: generateStats = async () => {
		manualStats = false;

		statValues = [];
		AbilityScoreType.forEach((score) => {
			let numbers = [];
			for (let i = 0; i < 4; i++) {
				numbers.push(Math.floor(Math.random() * 6) + 1);
			}

			const scoresSorted = numbers.sort((a, b) => b - a).slice(0, 3);
			const finalScore = scoresSorted.reduce((total, current) => total + current, 0);
			statValues.push({ score: score, rolls: scoresSorted, value: finalScore });
		});

		$form.scoresOriginal = AbilityScoreType.map((score, i) => {
			return { type: score, value: statValues[i].value };
		});
	};
</script>

<svelte:head>
	<title>Cauldron | Create a Character</title>
</svelte:head>
<PageBlock>
	<h1 class="h1 mb-8 text-primary-500">Create a Character</h1>
	<form method="POST" class="w-full h-full flex" use:enhance>
		<Stepper buttonCompleteType="submit">
			<Step
				regionContent="md:!mb-0 !mb-8 flex md:flex-row flex-col md:gap-16 gap-0"
				regionHeader="mb-4"
				regionNavigation="!mt-auto"
			>
				<svelte:fragment slot="header">Character Info</svelte:fragment>
				<div class="flex flex-col gap-4">
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
					<label class="label h-full">
						<span>Character Description</span>
						<textarea
							class="textarea h-[calc(100%-2rem)]"
							name="description"
							bind:value={$form.description}
							placeholder="Enter a description for your character"
						/>
					</label>
				</div>
				<div class="!mt-0 flex flex-col gap-4">
					<label class="label">
						<span>Level</span>
						<input
							class="input"
							type="text"
							name="level"
							bind:value={$form.level}
							placeholder="Enter your character level"
						/>
					</label>
					<label class="label">
						<span>Experience</span>
						<input
							class="input"
							type="text"
							name="experience"
							bind:value={$form.experience}
							placeholder="Enter your experience level"
						/>
					</label>
					<label class="label">
						<span
							>{$form.classes.length > 1 ? 'Classes' : 'Class (hold ctrl to select multiple)'}</span
						>
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
				</div>
			</Step>
			<Step
				regionContent="w-full md:!mb-0 !mb-8 flex flex-col md:gap-16 gap-0"
				regionHeader="mb-4"
				regionNavigation="!mt-auto"
			>
				<svelte:fragment slot="header">Character Stats</svelte:fragment>
				<div class="w-full flex flex-col items-start gap-4">
					<div class="flex md:flex-row flex-col md:items-center items-start gap-4">
						<div class="flex flex-row items-center gap-4 mb-2">
							<button
								class="btn variant-filled-primary w-fit"
								on:click|preventDefault={() => generateStats()}>Roll Stats</button
							>
							<span>or</span>
						</div>
						<button
							class="mb-2 btn variant-filled-primary w-fit"
							on:click|preventDefault={() => (manualStats = !manualStats)}
						>
							Manually Enter Stats
						</button>
					</div>
					<div class="w-full grid md:grid-cols-6 grid-cols-3 gap-4 justify-items-center">
						{#each AbilityScoreType as score, i}
							<div class="flex flex-col items-center w-fit">
								<span>{score}</span>
								{#if !manualStats}
									<h2 class="h2 text-primary-500">{statValues[i]?.value ?? '?'}</h2>
									<div class="flex gap-1">
										{#if statValues[i]?.rolls}
											{#each statValues[i].rolls as roll}
												<span class="text-secondary-500">{roll}</span>
											{/each}
										{/if}
									</div>
								{:else}
									<input
										class="input w-16 text-center text-primary-500"
										type="text"
										name={`statValue-${i}`}
									/>
								{/if}
							</div>
						{/each}
					</div>
				</div>
				<div class="w-full flex flex-col items-start gap-4" />
			</Step>
		</Stepper>
	</form>
</PageBlock>
