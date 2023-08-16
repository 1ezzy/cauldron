<script lang="ts">
	import { writable } from 'svelte/store';
	import {
		createSvelteTable,
		getCoreRowModel,
		getSortedRowModel,
		getPaginationRowModel,
		flexRender,
		renderComponent,
		getFilteredRowModel
	} from '@tanstack/svelte-table';
	import type { ColumnDef, TableOptions } from '@tanstack/table-core/src/types';
	import type { APIReference, Spell } from '@prisma/client';
	import { capitalizeFirstLetter } from '$lib/utils/string-utils';
	import { CastingClassEnum } from '$lib/types/casting-class.enum';
	import { SpellSchoolEnum } from '$lib/types/spell-school.enum';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArrowSmallLeft, ArrowSmallRight } from '@steeze-ui/heroicons';
	import SpellTableAddCell from './SpellTableAddCell.svelte';
	import type { ModalSettings } from '@skeletonlabs/skeleton';

	export let data: Spell[];
	export let modal: ModalSettings;

	let sorting: any = [];

	const columns: ColumnDef<Spell>[] = [
		{
			id: 'select',
			header: () => 'Add',
			cell: () => renderComponent(SpellTableAddCell, { modal })
		},
		{
			accessorKey: 'level',
			header: () => 'Level',
			cell: (info) => info.getValue() as string
		},
		{
			accessorKey: 'name',
			header: () => 'Name',
			cell: (info) => info.getValue()
		},
		{
			id: 'classes',
			accessorFn: (row) => row.classes.map((item: APIReference) => item.name).join(', '),
			header: () => 'Classes',
			cell: (info) => info.getValue()
		},
		{
			accessorKey: 'casting_time',
			header: () => 'Casting Time',
			cell: (info) => info.getValue()
		},
		{
			accessorKey: 'range',
			header: () => 'Range',
			cell: (info) => info.getValue()
		},
		{
			id: 'school',
			accessorFn: (row) => row.school.name,
			header: () => 'School',
			cell: (info) => info.getValue()
		}
	];

	const setSorting = (updater: any) => {
		if (updater instanceof Function) {
			sorting = updater(sorting);
		} else {
			sorting = updater;
		}
		options.update((old) => ({
			...old,
			state: {
				...old.state,
				sorting
			}
		}));
	};

	const options = writable<TableOptions<Spell>>({
		data: data,
		columns: columns,
		state: {
			sorting
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel()
	});

	const table = createSvelteTable(options);

	const handleSelectFilter = (event: Event, colNum: number) => {
		const target = event.target as any;
		target.value === 'any'
			? $table.getHeaderGroups()[0].headers[colNum].column.setFilterValue('')
			: $table.getHeaderGroups()[0].headers[colNum].column.setFilterValue(target.value);
	};

	const handleNameFilter = (event: Event) => {
		const target = event.target as HTMLInputElement;
		$table.getHeaderGroups()[0].headers[2].column.setFilterValue(target.value);
	};
</script>

<div class="mb-4 sticky flex flex-col sm:flex-row justify-between items-center sm:items-end">
	<div class="flex flex-col sm:flex-row gap-4">
		<label>
			<span>Name</span>
			<input class="input" type="text" placeholder="Search name..." on:input={handleNameFilter} />
		</label>
		<label>
			<span>Class</span>
			<select class="select" on:input={(event) => handleSelectFilter(event, 3)}>
				<option value="any">Any</option>
				{#each Object.values(CastingClassEnum) as value}
					<option {value}>{capitalizeFirstLetter(value)}</option>
				{/each}
			</select>
		</label>
		<label>
			<span>School</span>
			<select class="select" on:input={(event) => handleSelectFilter(event, 6)}>
				<option value="any">Any</option>
				{#each Object.values(SpellSchoolEnum) as value}
					<option {value}>{capitalizeFirstLetter(value)}</option>
				{/each}
			</select>
		</label>
	</div>
	<div class="flex items-center sm:self-end">
		<button on:click={() => $table.previousPage()}>
			<Icon src={ArrowSmallLeft} theme="mini" size="40px" />
		</button>
		<span>{$table.getState().pagination.pageIndex + 1} of {$table.getPageCount()}</span>
		<button
			on:click={() => {
				if ($table.getState().pagination.pageIndex + 1 < $table.getPageCount()) {
					$table.nextPage();
				}
			}}
		>
			<Icon src={ArrowSmallRight} theme="mini" size="40px" />
		</button>
	</div>
</div>

<div class="table-container">
	<table class="table table-hover">
		<thead>
			{#each $table.getHeaderGroups() as headerGroup}
				<tr>
					{#each headerGroup.headers as header, i}
						<th class:w-16={i <= 1} class="!px-3">
							{#if !header.isPlaceholder}
								<div
									role="grid"
									tabindex={0}
									class="flex gap-2"
									class:justify-center={i <= 1}
									class:cursor-pointer={header.column.getCanSort()}
									class:select-none={header.column.getCanSort()}
									class:table-sort-asc={header.column.getIsSorted().toString() === 'asc'}
									class:table-sort-dsc={header.column.getIsSorted().toString() === 'desc'}
									on:click={header.column.getToggleSortingHandler()}
									on:keypress={header.column.getToggleSortingHandler()}
								>
									<svelte:component
										this={flexRender(header.column.columnDef.header, header.getContext())}
									/>
								</div>
							{/if}
						</th>
					{/each}
				</tr>
			{/each}
		</thead>
		<tbody>
			{#each $table.getRowModel().rows as row}
				<tr>
					{#each row.getVisibleCells() as cell}
						<td class="[&:nth-child(2)]:text-center truncate">
							<svelte:component this={flexRender(cell.column.columnDef.cell, cell.getContext())} />
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
