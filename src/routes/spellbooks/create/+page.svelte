<script lang="ts">
	import PageBlock from '$lib/components/PageBlock.svelte';
	import { ClassEnum } from '@prisma/client';
</script>

<PageBlock>
	<h1 class="h1 mb-8 text-primary-500">Create a Spellbook</h1>
	<form class="flex flex-col gap-6">
		<label class="label">
			<span>Spellbook Name</span>
			<input class="input" type="text" placeholder="Enter a spellbook name" />
		</label>
		<label class="label">
			<span>Character Name</span>
			<input class="input" type="text" placeholder="Enter a character name" />
		</label>
		<label class="label">
			<span>Spellbook Description</span>
			<textarea class="textarea" rows="4" placeholder="Enter a description for your spellbook" />
		</label>
		<label class="label">
			<span>Character Class</span>
			<select class="select">
				<option value={ClassEnum.barbarian}>Barbarian</option>
				<option value={ClassEnum.bard}>Bard</option>
				<option value={ClassEnum.cleric}>Cleric</option>
				<option value={ClassEnum.druid}>Druid</option>
				<option value={ClassEnum.fighter}>Fighter</option>
				<option value={ClassEnum.monk}>Monk</option>
				<option value={ClassEnum.paladin}>Paladin</option>
				<option value={ClassEnum.ranger}>Ranger</option>
				<option value={ClassEnum.rogue}>Rogue</option>
				<option value={ClassEnum.sorcerer}>Sorcerer</option>
				<option value={ClassEnum.warlock}>Warlock</option>
				<option value={ClassEnum.wizard}>Wizard</option>
			</select>
		</label>
	</form>
</PageBlock>
