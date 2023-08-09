<script lang="ts">
	import PageBlock from '$lib/components/PageBlock.svelte';
	import { formatSpellLevelWithSchool } from '$lib/utils/string-utils.js';

	export let data;

	const spellData = data.item;
</script>

<PageBlock>
	<h1 class="h1 mb-4 text-primary-500">{spellData.name}</h1>
	<h3 class="h3 italic">{formatSpellLevelWithSchool(spellData.level, spellData.school.name)}</h3>
</PageBlock>
