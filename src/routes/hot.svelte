<script lang="ts">
    import Vacancy from './lib/Vacancy.svelte';
    import type { VacancyType } from './lib/VacancyType';

    interface ApiResponse {
        page: number,
        page_count: number,
        items_per_page: number,
        took: number,
        timed_out: boolean,
        total: number,
        results: Array<VacancyType>,
    }

    async function updateVacancies(): Promise<Array<VacancyType>>{
        let response: Response = await fetch('https://www.themuse.com/api/public/jobs?page=1');
        let json: ApiResponse = await response.json() as ApiResponse;
        return json.results;
    }

    let vacancies: Array<VacancyType> = [];
    updateVacancies().then(x => vacancies = x)
</script>

<svelte:head>
    <title>The hottest vacancies</title>
</svelte:head>

<a href="/">JobFinder</a>
<img src="fire.png" alt="Fire logo"/>
<h1>List of the hottest<br> vacancies so far.</h1>

<div class="vacancies-list" id="vacancies-list">
    {#each vacancies as vacancy}
        <Vacancy data={vacancy} />
    {/each}
</div>

<style>
    a {
        font-family: "Brawler", sans-serif;
        font-weight: bold;
        font-size: 3.1vw;
        text-decoration: none;
        color: black;
        position: absolute;
        right: 5vw;
        top: 10vh
    }
    img {
        width: 5vw;
        margin-top: 32.5vh;
        margin-left: 3vw
    }
    h1 {
        margin-top: -10vh;
        margin-left: 8.5vw;
        margin-bottom: 7vh;
        font-family: 'Lato', sans-serif;
        font-size: 2.1vw;
    }
    .vacancies-list {
        margin-left: 2.5vw;
        margin-right: 2.5vw;
    }
</style>
