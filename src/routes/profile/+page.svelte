<script lang="ts">
	import PageBlock from '$lib/components/PageBlock.svelte';

	export let data;
</script>

<PageBlock>
	<h1 class="h1 mb-8 text-primary-500">Profile</h1>
	<div class="w-full flex flex-1">
		<div class="p-8 basis-2/3">
			<h3 class="h3 mb-8 text-secondary-500">Your profile at a glance</h3>
			<div class="mb-8">
				<h4 class="h4 mb-2 text-tertiary-500">Username</h4>
				{data.session?.user.username}
			</div>
			<div class="mb-8">
				<h4 class="h4 mb-2 text-tertiary-500">Account created</h4>
				{data.session?.user.created_at.toDateString()}
			</div>
			<div class="mb-8">
				<h4 class="h4 mb-2 text-tertiary-500">Account last updated</h4>
				{data.session?.user.updated_at.toDateString()}
			</div>
		</div>
		<span class="divider-vertical my-auto h-[95%]" />
		<div class="p-8 basis-1/3 flex flex-col">
			<h3 class="h3 mb-8 text-secondary-500">Edit account details</h3>
		</div>
	</div>
</PageBlock>
