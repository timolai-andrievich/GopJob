<script lang="ts">
	import type { VacancyType, ApiResponse } from '$lib/ApiUtils';
	import CategoriesCheckboxes from '$lib/CategoriesCheckboxes.svelte';
	import CompanyCombobox from '$lib/CompanyCombobox.svelte';
	import LevelSlider from '$lib/LevelSlider.svelte';
	import LocationFilter from '$lib/LocationFilter.svelte';
	import PageControls from '$lib/PageControls.svelte';
	import Vacancy from '$lib/Vacancy.svelte';

	let values = {
		levelSlider: 0,
		levelSliderText: '',
		companies: [],
		categories: {},
		locations: []
	};
	let page = 1;
	let totalPages = 0;
	let updating = false;
	let vacancies: Array<VacancyType> = [];
	const dev = process.env.NODE_ENV === 'development';

	function buildRequest(): string {
		let res = `https://www.themuse.com/api/public/jobs?page=${page - 1}`;
		res += `&level=${values.levelSliderText}`;
		for (let [k, v] of Object.entries(values.categories)) {
			if (v) {
				res += `&category=${k}`;
			}
		}
		for (let company of values.companies) {
			res += `&company=${company}`;
		}
		for (let location of values.locations) {
			res += `&location=${location}`;
		}
		return res;
	}

	async function updateVacancies() {
		updating = true;
		let url: string = buildRequest();
		let response: Response = await fetch(url);
		let apiResponse: ApiResponse = await response.json();
		totalPages = Math.min(apiResponse.page_count, 100);
		vacancies = apiResponse.results;
		updating = false;
	}

	async function autoUpdateVacancies() {
		if (dev) {
			console.log('auto updated');
			console.log(values);
		} else {
			page = 1;
			updateVacancies();
		}
	}

	autoUpdateVacancies();
</script>

<main>
	<div class="filters">
		<LevelSlider bind:values on:updated={autoUpdateVacancies} />
		<CompanyCombobox bind:values on:updated={autoUpdateVacancies} />
		<CategoriesCheckboxes bind:values on:updated={autoUpdateVacancies} />
		<LocationFilter bind:values on:updated={autoUpdateVacancies} />
		{#if dev}<button on:click={updateVacancies}>(DEBUG) Apply the filters</button>{/if}
	</div>
	<div class="vacancies">
		<PageControls bind:page {totalPages} on:pageChanged={updateVacancies} />
		<div class="vacancies-list">
			{#if vacancies.length > 0}
				{#each vacancies as vacancy}
					<Vacancy data={vacancy} />
				{/each}
			{:else}
				<div class="no-vacancies">
					<div class="no-vacancies-text">
						Sorry, no vacancies were found. Try changing the filter parameters.
					</div>
				</div>
			{/if}
		</div>
		<div class="overlay" style={`display: ${updating ? 'block' : 'none'}`} />
		<PageControls bind:page {totalPages} on:pageChanged={updateVacancies} />
	</div>
</main>

<style>
	main {
		display: flex;
	}
	.no-vacancies {
		background-color: #d5d7df;
		border-radius: 2vmin;
		width: 100%;
	}
	.no-vacancies-text {
		margin: 2vmin;
	}
	.filters {
		margin-right: 5vw;
		flex: 1;
	}
	.vacancies-list {
		margin-top: 1vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}
	.vacancies {
		position: relative;
		margin-top: 1vh;
		flex: 3;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.overlay {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.75);
	}
</style>
