<script type="ts">
	import Vacancy from '$lib/Vacancy.svelte';
	import type { ApiResponse, VacancyType } from '$lib/ApiUtils';
	import { base } from '$app/paths';
	import FilterLocation from '$lib/FilterLocation.svelte';
	import FilterExperience from '$lib/FilterExperience.svelte';
	import FilterCategory from '$lib/FilterCategory.svelte';

	let activeFilters: Array<Element> = new Array<Element>(3);
	const maxPage = 50;

	function getFilterUrl(): String {
		let outputUrl = 'https://www.themuse.com/api/public/jobs?';
		for (let f of activeFilters)
			if (f)
				outputUrl +=
					f.className.split(' ')[0] + '=' + encodeURIComponent(f.textContent.trim()) + '&';
		return outputUrl + 'page=';
	}

	async function updateVacancies(
		page = 0,
		output: Array<VacancyType> = []
	): Promise<Array<VacancyType>> {
		do {
			let apiUrl = getFilterUrl();
			let response: Response = await fetch(apiUrl + page);
			let json: ApiResponse = (await response.json()) as ApiResponse;
			if (json.results) output.push(...json.results);
			page++;
		} while (output.length < 20 && page < maxPage);
		return output;
	}

	let vacancies: Array<VacancyType> = [];
	updateVacancies().then((x) => (vacancies = x));

	function updateActiveElement(filterType: String, toActive: Element) {
		switch (filterType) {
			case 'category':
				if (activeFilters[0]) activeFilters[0].classList.remove('active');
				activeFilters[0] = toActive;
				activeFilters[0].classList.add('active');
				break;

			case 'level':
				if (activeFilters[1]) activeFilters[1].classList.remove('active');
				activeFilters[1] = toActive;
				activeFilters[1].classList.add('active');
				break;

			case 'location':
				if (activeFilters[2]) activeFilters[2].classList.remove('active');
				activeFilters[2] = toActive;
				activeFilters[2].classList.add('active');
				break;
		}
		updateVacancies().then((x) => (vacancies = x));
	}
</script>

<svelte:head>
	<title>Filter</title>
</svelte:head>

<main>
	<header>
		<img alt="Magnifier logo" src="{base}/magnifier.png" />
		<h1>Choose the appropriate options for search <br /> and get your new job!</h1>
	</header>

	<div class="filter-container">
		<FilterLocation updateFunction={updateActiveElement} />
		<FilterExperience updateFunction={updateActiveElement} />
		<FilterCategory updateFunction={updateActiveElement} />
	</div>

	<div class="vacancies">
		<div class="vacancies-header">
			{#if vacancies.length === 0}
				<p>No vacancies satisfying your parameters</p>
			{:else}
				<p>What we found according to <br /> your parameters:</p>
			{/if}
		</div>

		<div class="vacancies-list">
			{#each vacancies as vacancy}
				<Vacancy data={vacancy} />
			{/each}
		</div>
	</div>
</main>

<style>
	main {
		padding-left: 150px;
		padding-right: 150px;
	}

	header {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 30vmin;
		margin-bottom: 10vh;
		font-family: 'Lato-bold', sans-serif;
	}

	header > img {
		height: 70%;
	}

	header > h1 {
		font-size: 7vmin;
	}

	.filter-container {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr;
		grid-column-gap: 7vh;
	}

	.vacancies-header {
		font-family: 'Lato-bold';
		font-size: 48pt;
	}
</style>
