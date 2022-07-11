<script lang="ts">
	import Vacancy from '../lib/Vacancy.svelte';
	import type { VacancyType, ApiResponse } from '$lib/ApiUtils';
	import { base } from '$app/paths';

	async function updateVacancies(): Promise<Array<VacancyType>> {
		let response: Response = await fetch('https://www.themuse.com/api/public/jobs?page=1');
		let json: ApiResponse = (await response.json()) as ApiResponse;
		return json.results;
	}

	let vacancies: Array<VacancyType> = [];
	updateVacancies().then((x) => (vacancies = x));
</script>

<svelte:head>
	<title>Hot vacancies</title>
</svelte:head>

<main>
	<div id="logo-container">
		<a href="{base}/"><img src="{base}/logo-black.png" alt="JD logo" /></a>
	</div>
	<header>
		<img src="{base}/fire.png" alt="Fire logo" />
		<h1>List of the hottest<br /> vacancies so far.</h1>
	</header>
	<div class="vacancies-list" id="vacancies-list">
		{#each vacancies as vacancy}
			<Vacancy data={vacancy} />
		{/each}
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
	}
	header > img {
		height: 53%;
	}
	header > h1 {
		font-size: 7vmin;
	}
	main {
		display: flex;
		flex-direction: column;
		margin-left: 10vw;
		margin-right: 10vw;
	}
	#logo-container {
		padding-top: 50px;
		display: flex;
		flex-direction: row;
		justify-content: end;
	}
</style>
