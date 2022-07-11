<script lang="ts">
	import type { VacancyType, ApiResponse } from '$lib/ApiUtils';
	import CategoriesCheckboxes from '$lib/CategoriesCheckboxes.svelte';
	import CompanyCombobox from '$lib/CompanyCombobox.svelte';
	import LevelSlider from '$lib/LevelSlider.svelte';
	import LocationFilter from '$lib/LocationFilter.svelte';
	import PageControls from '$lib/PageControls.svelte';
	import Vacancy from '$lib/Vacancy.svelte';
	import { base } from '$app/paths';

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
		page = 1;
		updateVacancies();
	}

	autoUpdateVacancies();
</script>


<svelte:head>
	<title>JobFinder - Advanced Search</title>
</svelte:head>

<div id="logo-container">
	<a href="{base}/"><img src="{base}/logo-black.png" alt="JD logo" /></a>
</div>

<header>
	<img alt="Magnifier logo" src="{base}/magnifier.png" />
	<h1>Choose the appropriate options for search and get your new job!</h1>
</header>

<main>
	<div class="filters">
		<LevelSlider bind:values on:updated={autoUpdateVacancies} />
		<CompanyCombobox bind:values on:updated={autoUpdateVacancies} />
		<CategoriesCheckboxes bind:values on:updated={autoUpdateVacancies} />
		<LocationFilter bind:values on:updated={autoUpdateVacancies} />
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
			<div class="overlay" style={`display: ${updating ? 'block' : 'none'}`} />
		</div>
		<PageControls bind:page {totalPages} on:pageChanged={updateVacancies} />
	</div>
</main>

<style>
	header {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 30vmin;
		margin-bottom: 10vh;
		font-family: 'Lato-bold', sans-serif;
		margin-left: 10vw;
		margin-right: 10vw;
	}

	header > img {
		height: 70%;
	}

	header > h1 {
		font-size: 7vmin;
	}

	main {
		display: flex;
		font-family: 'Lato', sans-serif;
		margin-left: 10vw;
		margin-right: 10vw;
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
	#logo-container {
		padding-top: 50px;
		display: flex;
		flex-direction: row;
		justify-content: end;
		margin-right: 10vw;
	}
</style>
