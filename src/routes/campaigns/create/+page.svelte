<script lang="ts">
	import type { PageData } from './$types';
	import PageBlock from '$lib/components/PageBlock.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { MagnifyingGlass, MinusCircle, PlusCircle } from '@steeze-ui/heroicons';
	import type { User } from '@prisma/client';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

	export let data: PageData;

	const toastStore = getToastStore();

	const { form, errors, enhance } = superForm(data.campaignForm, {
		dataType: 'json',
		onSubmit() {
			$form.users = addedUsers;
		},
		onResult({ result }) {
			const campaignId = result.data.campaignId;

			const toastCreatedCampaign: ToastSettings = {
				message: `Campaign created`,
				background: 'variant-filled-success',
				action: {
					label: 'View campaign',
					response: () => goto(`/campaigns/${campaignId}`)
				}
			};
			toastStore.trigger(toastCreatedCampaign);

			console.log(result.type);

			if (result.type === 'success') {
				window.location = '/campaigns';
			}
		}
	});
	const {
		form: searchForm,
		errors: searchErrors,
		enhance: searchEnhance
	} = superForm(data.searchForm, {
		invalidateAll: false,
		onResult({ result }) {
			searchedUsers = result.data.users;
		}
	});

	let searchedUsers: User[];
	let addedUsers: User[] = [];
	$: searchedUsers;
	$: addedUsers;

	const addUser = (user: User) => {
		if (!addedUsers.includes(user)) {
			addedUsers.push(user);
			addedUsers = addedUsers;
		}
	};

	const removeUser = (user: User) => {
		let newAddedUsers = addedUsers.filter((item) => {
			return item.id !== user.id;
		});
		addedUsers = newAddedUsers;
	};
</script>

<svelte:head>
	<title>Cauldron | Create a Campaign</title>
</svelte:head>
<PageBlock>
	<h1 class="h1 mb-8 text-primary-500">Create a Campaign</h1>
	<form
		id="createform"
		class="w-full px-8 flex flex-col flex-1 gap-6"
		method="POST"
		action="?/create"
		use:enhance
	>
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
						<form
							id="searchform"
							method="POST"
							action="?/search"
							use:searchEnhance
							class="input flex flex-row justify-between"
							class:input-error={$searchErrors.username}
						>
							<input
								class="min-w-0 rounded-[16px] bg-transparent border-transparent focus:border-transparent focus:ring-0"
								name="username"
								form="searchform"
								type="search"
								aria-invalid={$searchErrors.username ? 'true' : undefined}
								placeholder="Search..."
								bind:value={$searchForm.username}
							/>
							<button form="searchform" class="w-fit mr-4 flex items-center justify-center">
								<Icon src={MagnifyingGlass} theme="mini" size="24px" />
							</button>
						</form>
					</label>
					<div class="card p-4 flex-1 overflow-y-auto">
						{#if searchedUsers}
							{#if searchedUsers.length > 0}
								<div class="flex flex-col gap-4">
									{#each searchedUsers as user}
										<div class="flex flex-row gap-2">
											<button
												on:click={(event) => {
													event.preventDefault();
													event.stopPropagation();
													addUser(user);
												}}
											>
												<Icon
													src={PlusCircle}
													size="16px"
													theme="mini"
													class="text-success-500 mr-2"
												/>
											</button>
											<span>{user.username}</span>
										</div>
									{/each}
								</div>
							{:else}
								No users found
							{/if}
						{/if}
					</div>
				</div>
			</div>
			<div class="p-4 flex flex-col gap-4 basis-1/3">
				<h3 class="h3 text-secondary-500">Added Users</h3>
				<div class="card p-4 flex-1 overflow-y-auto">
					{#if addedUsers.length > 0}
						<div class="flex flex-col gap-4">
							{#each addedUsers as user}
								<div class="flex flex-row gap-2">
									<button
										on:click={(event) => {
											event.preventDefault();
											event.stopPropagation();
											removeUser(user);
										}}
									>
										<Icon src={MinusCircle} size="16px" theme="mini" class="text-error-500 mr-2" />
									</button>
									<span>{user.username}</span>
								</div>
							{/each}
						</div>
					{:else}
						No users added
					{/if}
				</div>
			</div>
		</div>
		<div class="mt-auto ml-auto mr-4">
			<button form="createform" class="btn variant-filled-primary">Create Campaign</button>
		</div>
	</form>
	<form />
</PageBlock>
