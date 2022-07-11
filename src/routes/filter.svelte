<script type="ts">
    import Vacancy from '../lib/Vacancy.svelte';
    import type {ApiResponse, VacancyType} from '../lib/ApiUtils';
    import {categories, locations} from '../lib/FilterConsts';
    import {base} from '$app/paths';

    let activeFilters: Array<Element> = new Array<Element>(3);
    const maxPage = 50;

    function getFilterUrl(): String {
        let outputUrl = "https://www.themuse.com/api/public/jobs?";
        for (let f of activeFilters)
            if (f) outputUrl += f.className.split(" ")[0] + "=" + encodeURIComponent(f.textContent.trim()) + "&";
        return outputUrl + "page=";
    }

    async function updateVacancies(page = 0, output: Array<VacancyType> = []): Promise<Array<VacancyType>> {
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
                if (activeFilters[0])
                    activeFilters[0].classList.remove('active');
                activeFilters[0] = toActive;
                activeFilters[0].classList.add('active');
                break;

            case 'level':
                if (activeFilters[1])
                    activeFilters[1].classList.remove('active');
                activeFilters[1] = toActive;
                activeFilters[1].classList.add('active');
                break;

            case 'location':
                if (activeFilters[2])
                    activeFilters[2].classList.remove('active');
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
        <img alt="Magnifier logo" src="{base}/magnifier.png"/>
        <h1>Choose the appropriate options for search <br/> and get your new job!</h1>
    </header>

    <div class="filter-container">
        <div class="filter filter-location">
            <div class="filter-header">
                <p class="name">City/Town:</p>
            </div>

            <div class="filter-content">
                <ul class="select select-list">
                    {#each locations as location}
                        <li
                                on:click={(event) => updateActiveElement('location', event.target)}
                                class="location"
                        >
                            {location}
                        </li>
                    {/each}
                </ul>
            </div>
        </div>

        <div class="filter filter-level">
            <div class="filter-header">
                <p class="name">Experience:</p>
            </div>

            <div class="filter-content">
                <ul class="select select-radio">
                    <li
                            class="level"
                            on:click={(event) => updateActiveElement('level', event.target)}
                    >
                        no
                    </li>
                    <li
                            class="level"
                            on:click={(event) => updateActiveElement('level', event.target)}
                    >
                        &lt; 1 year
                    </li>
                    <li
                            class="level"
                            on:click={(event) => updateActiveElement('level', event.target)}
                    >
                        1 - 3 years
                    </li>
                    <li
                            class="level"
                            on:click={(event) => updateActiveElement('level', event.target)}
                    >
                        3 - 5 years
                    </li>
                    <li
                            class="level"
                            on:click={(event) => updateActiveElement('level', event.target)}
                    >
                        &gt; 5 years
                    </li>
                </ul>
            </div>
        </div>

        <div class="filter filter-category">
            <div class="filter-header">
                <p class="name">Choose category:</p>
            </div>

            <div class="filter-content">
                <ul class="select select-list">
                    {#each categories as category}
                        <li
                                on:click={(event) => updateActiveElement('category', event.target)}
                                class="category"
                        >
                            {category}
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>

    <div class="vacancies">
        <div class="vacancies-header">
            <p>What we found according to <br/> your parameters:</p>
        </div>

        <div class="vacancies-list">
            {#each vacancies as vacancy}
                <Vacancy data={vacancy}/>
            {/each}
        </div>
    </div>
</main>

<style global>
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
        grid-column-gap: 7vh;
    }

    .filter {
        background-color: #d5d7df;
        border-radius: 39px;
        margin-bottom: 7vh;
        font-family: 'Lato';
        transition: 5s;
    }

    .filter-header > .name {
        padding-top: 5vh;
        padding-left: 4vw;
        font-family: 'Lato-bold';
        font-size: 24pt;
        flex: 1;
    }

    .vacancies-header {
        font-family: 'Lato-bold';
        font-size: 48pt;
    }

    .filter-location {
        grid-row-start: 1;
        grid-row-end: 3;
    }

    .filter-category {
        grid-row-start: 1;
        grid-row-end: 3;

        grid-column-start: 3;
        grid-column-end: 3;
    }

    .filter-content {
        font-family: 'Lato';
        font-size: 24pt;
        flex: 1;
    }

    .radio-button {
        padding-left: 4vw;
        margin-left: 0 !important;
        text-align: left !important;
        border: none !important;
    }

    .radio-button:before {
        content: '';
        display: inline-block;
        background-color: #fff;
        width: 40px;
        height: 40px;
        margin-right: 15px;
        border-radius: 20px;
        top: 7px;
        position: relative;
        transition: all 0.2s ease;
    }

    .radio-button:hover:before {
        background-color: #838383;
        transition: all 0.2s ease;
    }

    .select-radio > .active:before {
        background-color: #1364df !important;
    }

    .select {
        padding: 0;
        list-style-type: none;
    }

    .filter-location > .filter-content > .select,
    .filter-category > .filter-content > .select {
        width: 100%;
        height: 100vh;
        overflow-y: auto;
    }

    .select > li:hover {
        cursor: pointer;
    }

    .select > li {
        text-align: center;
        padding-top: 20px;
        border-bottom: 1px #000 solid;
        margin-left: 40px;
        margin-right: 40px;
        padding-bottom: 20px;
    }

    .select > li:last-child {
        border: none;
    }

    .inline-button {
        transition: all 0.2s ease;
    }

    .inline-button:hover {
        background-color: #838383;
        color: #fff;
        transition: all 0.2s ease;
    }

    .select-list > .active {
        background-color: #1364df;
        color: #fff;
    }
</style>
