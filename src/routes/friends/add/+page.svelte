<script lang="ts">
	import type { PageData } from './$types';
	import PageBlock from '$lib/components/PageBlock.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	export let data: PageData;
	const { form, errors, enhance } = superForm(data.form);

	const toastStore = getToastStore();

	const handleSubmit = async (username: string) => {
		const toastRequestSentSuccess: ToastSettings = {
			message: `Friend request sent to ${username}`,
			background: 'variant-filled-success'
		};
		toastStore.trigger(toastRequestSentSuccess);
	};
</script>

<svelte:head>
	<title>Cauldron | Add Friends</title>
</svelte:head>
<PageBlock>
	<h1 class="h1 mb-8 text-primary-500">Add Friends</h1>
	<form
		class="w-fit flex flex-col flex-1 gap-6"
		method="POST"
		use:enhance
		on:submit={() => handleSubmit($form.username)}
	>
		<label class="label">
			<div class="flex gap-4 mb-1">
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
		<button class="btn variant-filled-primary">Send Friend Request</button>
	</form>
</PageBlock>
