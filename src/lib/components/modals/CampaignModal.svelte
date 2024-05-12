<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { getModalStore, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	export let parent: any;
	export let data: any;
	export let campaignId: string;
	export let campaignName: string;

	let userId: string = data.user.id;

	const modalStore = getModalStore();
	const toastStore = getToastStore();

	const handleSubmit = async () => {
		const addRes = await fetch(`/api/campaigns/join?user_id=${userId}&campaign_id=${campaignId}`, {
			method: 'POST'
		});
		const data = await addRes.json();

		modalStore.close();

		if (!addRes.ok) {
			const toastJoinCampaignFail: ToastSettings = {
				message: `Error: ${data.message}`,
				background: 'variant-filled-error'
			};
			toastStore.trigger(toastJoinCampaignFail);
		} else {
			const toastJoinCampaignSuccess: ToastSettings = {
				message: `You have joined ${campaignName}`,
				action: {
					label: 'View campaign',
					response: () => goto(`/campaigns/${campaignId}`)
				},
				background: 'variant-filled-success'
			};
			toastStore.trigger(toastJoinCampaignSuccess);
		}
		invalidateAll();
	};
</script>

{#if $modalStore[0]}
	<div class="card p-8 w-modal-slim shadow-xl">
		<header class="text-2xl font-bold text-primary-500">
			<h3 class="h3 mb-4">{$modalStore[0].title}</h3>
		</header>
		<div class="mb-12 p-4 flex flex-col gap-4 border-2 border-surface-500 rounded-xl">
			<h4 class="h4 text-center">{campaignName}</h4>
		</div>
		<footer class="flex justify-end">
			<button class="mr-2 btn variant-filled-secondary" on:click={parent.onClose}> Cancel </button>
			<button class="btn variant-filled-success" on:click={() => handleSubmit()}>
				Join Campaign
			</button>
		</footer>
	</div>
{/if}
