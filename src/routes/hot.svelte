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

<p>Hot vacancies:</p>
<div id="vacancies-list">
    {#each vacancies as vacancy}
        <Vacancy data={vacancy} />
    {/each}
</div>
