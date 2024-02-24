<script lang="ts">
	import type { PageData } from './$types';
	import PageBlock from '$lib/components/PageBlock.svelte';
	import { superForm, type FormResult } from 'sveltekit-superforms/client';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

	export let data: PageData;
	const toastStore = getToastStore();

	const { form, errors, enhance } = superForm(data.form, {
		onResult({ result, cancel }) {
			toastStore.trigger(result.data?.toast);
			if (result.data?.status === 200) {
				cancel();
				goto('/friends');
			}
		}
	});
</script>

<svelte:head>
	<title>Cauldron | Add Friends</title>
</svelte:head>
<PageBlock>
	<h1 class="h1 mb-8 text-primary-500">Add Friends</h1>
	<form class="w-fit flex flex-col flex-1 gap-6" method="POST" use:enhance>
		<label class="label">
			<div class="flex gap-4 mb-1">
				<span>Username</span>
				{#if $errors.friend_username}
					<span class="text-secondary-500">{$errors.friend_username}</span>
				{/if}
			</div>
			<input
				class="input"
				class:input-error={$errors.friend_username}
				type="text"
				name="friend_username"
				aria-invalid={$errors.friend_username ? 'true' : undefined}
				bind:value={$form.friend_username}
				placeholder="Enter a username"
			/>
		</label>
		<button class="btn variant-filled-primary">Send Friend Request</button>
	</form>
</PageBlock>
