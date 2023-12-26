<script lang="ts">
	import type { PageData } from './$types';
	import PageBlock from '$lib/components/PageBlock.svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;
	const { form } = superForm(data.form);
</script>

<PageBlock>
	<h1 class="h1 mb-8 text-primary-500">Create a Character</h1>
	<form class="flex flex-col flex-1 gap-6" method="POST">
		<label class="label">
			<span>Character Name</span>
			<input
				class="input"
				type="text"
				name="name"
				bind:value={$form.characterName}
				placeholder="Enter a spellbook name"
			/>
		</label>
		<button class="mt-auto btn variant-filled-primary">Create Character</button>
	</form>
</PageBlock>
