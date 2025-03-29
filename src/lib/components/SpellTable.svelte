<script lang="ts">
	import {
		Paginate,
		Pagination,
		Table,
		Icon,
		MultiSelectMenu,
		ToggleButton,
		Button,
		Dialog
	} from 'svelte-ux';
	import type { ClassValue } from 'svelte/elements';
	import { faChevronDown, faAdd, faAd } from '@fortawesome/free-solid-svg-icons';
	import { tableCell } from '@layerstack/svelte-table';
	import { SpellSchoolType } from '$lib/types/spell-school.type';
	import { capitalizeFirstLetter, formatSpellLevel, stringToIndex } from '$lib/utils/string-utils';
	import type { Spell } from '@prisma/client';
	import SpellDetails from './SpellDetails.svelte';

	let {
		data,
		pageCount,
		class: className,
		nameCellType,
		addSpell
	}: {
		data: any;
		pageCount: number;
		nameCellType: 'link' | 'modal';
		class?: ClassValue;
		addSpell: (value: string) => void;
	} = $props();

	let selectedLevels = $state<string[]>([]);
	let levelOptions = [
		...Array(10)
			.keys()
			.map((level: number) => {
				return {
					label: formatSpellLevel(level),
					value: formatSpellLevel(level)
				};
			})
	];

	let selectedSchools = $state<string[]>([]);
	let schoolOptions = [
		...SpellSchoolType.map((school) => {
			return {
				label: capitalizeFirstLetter(school),
				value: school
			};
		})
	];

	let open = $state<boolean>(false);
	let selectedSpell = $state<Spell>();

	function openSpellModal(spellName: string): void {
		selectedSpell = data.find((spell: Spell) => spell.name === spellName);
		open = true;
	}

	function emitAddEvent(value: string): void {
		console.log(value);
		addSpell(value);
	}
</script>

<Dialog bind:open classes={{ dialog: 'mx-auto w-4/5 flex flex-col items-center' }}>
	<div slot="title">{selectedSpell?.name}</div>
	<div class="bt-4 flex flex-col gap-8 px-8 pt-4 pb-6">
		<SpellDetails spell={selectedSpell} />
	</div>
	<div slot="actions">
		<Button variant="fill" color="primary">Close</Button>
	</div>
</Dialog>

<div class="flex w-full flex-col gap-2">
	<div class="flex flex-col border-b pb-2">
		<span class="px-4 pb-2 text-xs">Filters:</span>
		<div class="flex flex-row gap-4">
			<ToggleButton let:on={open} let:toggleOff transition={false}>
				<span class="flex flex-row items-center gap-2 transition duration-200">
					{selectedLevels.length > 0 ? `${selectedLevels.length} levels selected` : 'Level'}
					<Icon
						data={faChevronDown}
						class={['transform transition-all duration-300', { '-rotate-180': open }]}
					/>
				</span>
				<MultiSelectMenu
					options={levelOptions}
					value={selectedLevels}
					placeholder="Levels"
					mode="immediate"
					maintainOrder
					on:change={(e) => {
						selectedLevels = e.detail.value as string[];
					}}
					{open}
				>
					<div slot="actions" class="flex flex-row gap-4">
						<Button
							variant="outline"
							color="default"
							on:click={() => {
								selectedLevels = [];
							}}>Clear</Button
						>
						<Button variant="fill" color="default" on:click={toggleOff}>Close</Button>
					</div>
				</MultiSelectMenu>
			</ToggleButton>
			<ToggleButton let:on={open} let:toggleOff transition={false}>
				<span class="flex flex-row items-center gap-2 transition duration-200">
					{selectedSchools.length > 0 ? `${selectedSchools.length} schools selected` : 'School'}
					<Icon
						data={faChevronDown}
						class={['transform transition-all duration-300', { '-rotate-180': open }]}
					/>
				</span>
				<MultiSelectMenu
					options={schoolOptions}
					value={selectedSchools}
					placeholder="Levels"
					mode="immediate"
					maintainOrder
					on:change={(e) => {
						selectedSchools = e.detail.value as string[];
					}}
					{open}
				>
					<div slot="actions" class="flex flex-row gap-4">
						<Button
							variant="outline"
							color="default"
							on:click={() => {
								selectedSchools = [];
							}}
						>
							Clear
						</Button>
						<Button variant="fill" color="default" on:click={toggleOff}>Close</Button>
					</div>
				</MultiSelectMenu>
			</ToggleButton>
		</div>
	</div>
	<Paginate {data} perPage={pageCount} let:pageData let:pagination>
		<Table
			class={['w-full p-4', className]}
			classes={{ td: 'py-1' }}
			data={pageData}
			columns={[
				{
					name: 'Name',
					value: 'name',
					align: 'left'
				},
				{
					name: 'Level',
					value: 'level',
					align: 'center',
					format: (level: number) => {
						return formatSpellLevel(level);
					}
				},
				{
					name: 'Casting Time',
					value: 'casting_time',
					align: 'center'
				},
				{
					name: 'School',
					value: 'school.name',
					align: 'center'
				},
				{
					name: 'Range',
					value: 'range',
					align: nameCellType === 'modal' ? 'center' : 'right'
				},
				{
					name: 'actions',
					value: 'name',
					header: '',
					align: 'right',
					hidden: nameCellType !== 'modal'
				}
			]}
		>
			<tbody slot="data" let:columns let:data let:getCellValue>
				{#each data ?? [] as rowData, rowIndex}
					<tr class="tabular-nums">
						{#each columns as column (column.name)}
							{@const value = getCellValue(column, rowData, rowIndex)}

							<td use:tableCell={{ column, rowData, rowIndex, tableData: data }}>
								{#if column.name === 'Name'}
									{#if nameCellType == 'link'}
										<a class="underline" href="spells/{stringToIndex(value.toLowerCase())}">
											{value}
										</a>
									{:else if nameCellType == 'modal'}
										<button
											class="underline"
											onclick={() => {
												openSpellModal(value);
											}}
										>
											{value}
										</button>
									{:else}
										<span>{value}</span>
									{/if}
								{:else if column.name === 'actions'}
									<Button icon={faAdd} size="sm" onclick={() => emitAddEvent(value)} />
								{:else}
									<span>{value}</span>
								{/if}
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</Table>
		<Pagination
			{pagination}
			perPageOptions={[5, 10, 25, 100]}
			show={['perPage', 'pagination', 'prevPage', 'nextPage']}
			classes={{ root: 'border-t py-1 mt-2', perPage: 'flex-1 text-right', pagination: 'px-8' }}
		/>
	</Paginate>
</div>
