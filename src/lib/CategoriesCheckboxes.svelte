<script lang="ts">
	export let values;
	import { createEventDispatcher } from 'svelte/internal';
	import { base } from '$app/paths';

	let expanded = false;
	const dispatch = createEventDispatcher();
	const dev = process.env.NODE_ENV === 'development';

	function createUpdatedEvent() {
		dispatch('updated', {});
	}

	const categoriesList = [
		'Accounting',
		'Accounting and Finance',
		'Account Management',
		'Account Management/Customer Success',
		'Administration and Office',
		'Advertising and Marketing',
		'Animal Care',
		'Arts',
		'Business Operations',
		'Cleaning and Facilities',
		'Computer and IT',
		'Construction',
		'Corporate',
		'Customer Service',
		'Data and Analytics',
		'Data Science',
		'Design',
		'Design and UX',
		'Editor',
		'Education',
		'Energy Generation and Mining',
		'Entertainment and Travel Services',
		'Farming and Outdoors',
		'Food and Hospitality Services',
		'Healthcare',
		'HR',
		'Human Resources and Recruitment',
		'Installation, Maintenance, and Repairs',
		'IT',
		'Law',
		'Legal Services',
		'Management',
		'Manufacturing and Warehouse',
		'Marketing',
		'Mechanic',
		'Media, PR, and Communications',
		'Mental Health',
		'Nurses',
		'Office Administration',
		'Personal Care and Services',
		'Physical Assistant',
		'Product',
		'Product Management',
		'Project Management',
		'Protective Services',
		'Public Relations',
		'Real Estate',
		'Recruiting',
		'Retail',
		'Sales',
		'Science and Engineering',
		'Social Services',
		'Software Engineer',
		'Software Engineering',
		'Sports, Fitness, and Recreation',
		'Transportation and Logistics',
		'Unknown',
		'UX',
		'Videography',
		'Writer',
		'Writing and Editing'
	];

	function createValues() {
		for (let category of categoriesList) {
			values.categories[category] = false;
		}
	}

	function setAllCheckboxes(newValue: boolean) {
		for (let [k, v] of Object.entries(values.categories)) {
			values.categories[k] = newValue;
		}
		createUpdatedEvent();
	}

	function invertChecked(category: string) {
		values.categories[category] = !values.categories[category];
		createUpdatedEvent();
	}

	createValues();
</script>

<div class="categories-filter">
	<div on:click={(e) => (expanded = !expanded)} class="header">
		<div>Categories</div>
		<img
			class="expand-button"
			src="{base}/expand.png"
			alt={expanded ? 'Fold' : 'Expand'}
			style="transform:scaleY({expanded ? -1 : 1})"
		/>
	</div>
	{#if expanded}
		<div id="category-checkboxes">
			<div class="button" on:click|preventDefault={(e) => setAllCheckboxes(false)}>Reset</div>
			{#each categoriesList as category}
				<div class="category-entry">
					<div on:click|preventDefault={() => invertChecked(category)}>
						{category}
					</div>
					<input
						type="checkbox"
						bind:checked={values.categories[category]}
						on:change={createUpdatedEvent}
					/>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	#category-checkboxes {
		width: fit-content;
		display: grid;
		grid-template-columns: auto;
		margin-left: 1vw;
	}
	.category-entry {
		user-select: none;
		display: inline-flex;
		flex-direction: row;
		width: 100%;
		justify-content: space-between;
	}
	.expand-button {
		margin: 1vh;
		height: 2vh;
		transition: 250ms;
	}
	.expand-button:hover {
		margin: 0.5vh;
		height: 3vh;
	}
	.header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		user-select: none;
	}
	.categories-filter {
		margin-top: 1vh;
		margin-bottom: 1vh;
		padding: 2vmin;
		background-color: #d5d7df;
		border-radius: 2vmin;
	}
	.button {
		user-select: none;
		font-weight: bold;
		display: flex;
		place-content: center;
		margin-top: 1vh;
		margin-bottom: 1vh;
		color: #666;
		transition: 250ms;
	}
	.button:hover {
		color: black;
	}
</style>
