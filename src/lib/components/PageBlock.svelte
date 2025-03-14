<script lang="ts">
	import type { Snippet } from 'svelte';
	import PageHeader from './PageHeader.svelte';

	let {
		children,
		gapsize,
		center,
		title,
		subtitle,
		editableHeader
	}: {
		children: Snippet;
		gapsize: string;
		center?: boolean;
		title: string;
		subtitle?: string;
		editableHeader?: boolean;
	} = $props();
</script>

<div class={[[`flex flex-1 flex-col items-center ${gapsize}`], { 'justify-center': center }]}>
	<PageHeader {title} {subtitle} editable={editableHeader} />
	{@render children()}
</div>
