<script lang="ts">
    import Vacancy from '../lib/Vacancy.svelte';
    import type { VacancyType } from '../lib/VacancyType';
    import { base } from '$app/paths';

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

<body>
    <a href="{base}/" id="logo">JobFinder</a>
    <header>
        <img src="{base}/fire.png" alt="Fire logo"/>
        <h1>List of the hottest<br> vacancies so far.</h1>
    </header>
    <div class="vacancies-list" id="vacancies-list">
        {#each vacancies as vacancy}
            <Vacancy data={vacancy} />
        {/each}
    </div>
</body>

<style>
    @font-face {
        font-family: 'Lato-bold';
        src: url('../lib/fonts/Lato-Bold.ttf');
    }
    @font-face {
        font-family: 'Lato';
        src: url('../lib/fonts/Lato-Regular.ttf');
    }
    #logo {
        font-family: "Brawler", sans-serif;
        font-weight: bold;
        font-size: 3.1vmax;
        text-decoration: none;
        color: black;
        position: absolute;
        right: 5vw;
        top: 10vh;
    }
    header {
        margin-top: 20vh;
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
    body {
        margin-left: 10vw;
        margin-right: 10vw;
    }
</style>
