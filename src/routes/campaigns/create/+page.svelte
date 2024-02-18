<script lang="ts">
	import type { PageData } from './$types';
	import PageBlock from '$lib/components/PageBlock.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { MagnifyingGlass } from '@steeze-ui/heroicons';

	export let data: PageData;
	const { form, errors, enhance } = superForm(data.form);

	const handleSearch = async () => {
		console.log('searching...');
	};
</script>

<svelte:head>
	<title>Cauldron | Create a Campaign</title>
</svelte:head>
<PageBlock>
	<h1 class="h1 mb-8 text-primary-500">Create a Campaign</h1>
	<form class="w-full px-8 flex flex-col flex-1 gap-6" method="POST" use:enhance>
		<div class="w-full h-full flex flex-row">
			<div class="p-4 flex flex-col gap-4 basis-1/3">
				<div class="flex flex-row">
					<h3 class="h3 text-secondary-500 text-center">Enter Details</h3>
				</div>
				<label class="label">
					<div class="flex gap-4">
						<span>Campaign Name</span>
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
						placeholder="Enter a campaign name"
					/>
				</label>
				<label class="label flex flex-col flex-1">
					<span>Campaign Description</span>
					<textarea
						class="textarea flex-1"
						rows={4}
						name="description"
						bind:value={$form.description}
						placeholder="Enter a description for your campaign"
					/>
				</label>
			</div>
			<div class="min-w-0 p-4 flex flex-col gap-4 basis-1/3">
				<h3 class="h3 text-secondary-500">Search For Users</h3>
				<div class="flex flex-col flex-1 gap-6">
					<label class="label">
						<div class="flex gap-4">
							<span>Search</span>
						</div>
						<form class="input flex flex-row justify-between" method="POST">
							<input
								class="min-w-0 bg-transparent border-none focus:outline-none"
								type="search"
								placeholder="Search..."
							/>
							<button
								class="w-fit mr-4 flex items-center justify-center"
								on:click={() => handleSearch()}
							>
								<Icon src={MagnifyingGlass} theme="mini" size="24px" />
							</button>
						</form>
					</label>
					<div class="card p-4 flex-1" />
				</div>
			</div>
			<div class="p-4 flex flex-col gap-4 basis-1/3">
				<h3 class="h3 text-secondary-500">Added Users</h3>
				<div class="card p-4 flex-1" />
			</div>
		</div>
		<div class="mt-auto mx-auto">
			<button class="btn variant-filled-primary">Create Campaign</button>
		</div>
	</form>
</PageBlock>
