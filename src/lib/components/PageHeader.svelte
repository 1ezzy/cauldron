<script lang="ts">
	let { title, subtitle, editable }: { title: string; subtitle?: string; editable?: boolean } =
		$props();

	let editMode = $state<boolean>();

	function handleEditClicked(): void {
		editMode = true;
	}

	function handleConfirmClicked(): void {
		editMode = false;
	}
</script>

{#snippet headerTitle(title: string)}
	{#if !editMode}
		<span class="font-bold">{title}</span>
	{:else}
		<input type="text" class="inline h-6" value={title} />
	{/if}
{/snippet}

{#snippet headerWithSubtitle(title: string, subtitle?: string)}
	<div class="flex gap-4">
		{@render headerTitle(title)}
		<span>|</span>
		<span>{subtitle}</span>
	</div>
{/snippet}

<div class="relative flex gap-4">
	{#if subtitle}
		{@render headerWithSubtitle(title, subtitle)}
	{:else}
		{@render headerTitle(title)}
	{/if}
	{#if title && editable}
		<button class="absolute -right-6" onclick={editMode ? handleConfirmClicked : handleEditClicked}>
			{editMode ? '☑' : '■'}
		</button>
	{/if}
</div>
