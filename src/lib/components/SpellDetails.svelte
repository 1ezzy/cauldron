<script lang="ts">
	let { spell } = $props();
</script>

<div class="flex flex-col justify-center gap-2 md:flex-row md:gap-12">
	<div class="flex flex-col items-center">
		<span>Casting Time</span>
		<span>{spell.casting_time}</span>
	</div>

	<div class="flex flex-col items-center">
		<span>Range</span>
		<span>{spell.range}</span>
	</div>
	<div class="flex flex-col items-center">
		<span>Components</span>
		<span>{spell.components}</span>
	</div>
	<div class="flex flex-col items-center">
		Duration
		<span>{spell.duration}</span>
	</div>
</div>
<div class="flex flex-col gap-4">
	{#each spell.desc as desc}
		<span>{desc}</span>
	{/each}
	{#if spell.higher_level[0]}
		<div class="flex flex-col">
			<span class="font-bold italic">At Higher Levels</span>
			<span>{spell.higher_level[0]}</span>
		</div>
	{/if}
</div>
