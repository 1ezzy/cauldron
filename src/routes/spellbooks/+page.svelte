<script lang="ts">
	import { onMount } from 'svelte';
	import type { Spellbook } from '@prisma/client';

	let spellbooks: Spellbook[] = [];

	onMount(() => {
		const savedSpellbooks = localStorage.getItem('spellbooks');
		if (savedSpellbooks) {
			spellbooks = JSON.parse(savedSpellbooks);
		}
	});

	function saveSpellbooks() {
		localStorage.setItem('spellbooks', JSON.stringify(spellbooks));
	}
</script>

<svelte:head>
	<title>Cauldron | Spells</title>
</svelte:head>
<div class="flex flex-col items-center gap-2">
	<button>Create Spellbook</button>
</div>
