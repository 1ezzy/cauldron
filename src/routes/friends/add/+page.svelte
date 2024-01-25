<script lang="ts">
	import type { PageData } from './$types';
	import PageBlock from '$lib/components/PageBlock.svelte';
	import { capitalizeFirstLetter } from '$lib/utils/string-utils';
	import { CastingClassType } from '$lib/types/casting-class.type';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;
	const { form, errors, enhance } = superForm(data.form);
</script>

<svelte:head>
	<title>Cauldron | Add a Friend</title>
</svelte:head>
<PageBlock>
	<h1 class="h1 mb-8 text-primary-500">Add a Friend</h1>
	<form class="w-fit flex flex-col flex-1 gap-6" method="POST" use:enhance>
		<label class="label">
			<div class="flex gap-4">
				<span>Username</span>
				{#if $errors.username}
					<span class="text-secondary-500">{$errors.username}</span>
				{/if}
			</div>
			<input
				class="input"
				class:input-error={$errors.username}
				type="text"
				name="username"
				aria-invalid={$errors.username ? 'true' : undefined}
				bind:value={$form.username}
				placeholder="Enter a username"
			/>
		</label>
		<button class="btn variant-filled-primary">Add Friend</button>
	</form>
</PageBlock>
