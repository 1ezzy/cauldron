<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		gapsize,
		center,
		title,
		subtitle
	}: { children: Snippet; gapsize: number; center?: boolean; title: string; subtitle?: string } =
		$props();
</script>

{#snippet headerTitle(title: string)}
	<span class="font-bold">{title}</span>
{/snippet}

{#snippet headerWithSubtitle(title: string, subtitle?: string)}
	<div class="flex gap-4">
		{@render headerTitle(title)}
		<span>|</span>
		<span>{subtitle}</span>
	</div>
{/snippet}

<div
	class={[['flex flex-1 flex-col items-center'], `gap-${gapsize}`, { 'justify-center': center }]}
>
	{#if !!subtitle}
		{@render headerWithSubtitle(title, subtitle)}
	{:else}
		{@render headerTitle(title)}
	{/if}
	{@render children()}
</div>
