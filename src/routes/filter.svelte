<script type="ts">
    import Vacancy from '../lib/Vacancy.svelte';
    import type {ApiResponse, VacancyType} from '../lib/ApiUtils';
    import {categories, locations} from '../lib/FilterConsts';
    import {base} from '$app/paths';

    const vacancyRange = 200; // how many vacancies we search through
    let vacancies: Array<VacancyType> = [];

    function sortVacancies(input: Array<VacancyType>, filters: Array<String>): Array<VacancyType> {
        if (filters == null) return input;
        let sorted: Array<VacancyType> = [];
        for (let i = 0; i < 20; i++) {
            let v = input[i];
            try {
                if ((filters[0] == undefined || v.locations[0] == undefined || filters[0].trim() == v.locations[0].name.trim()) &&
                    (filters[2] == undefined || v.levels[0] == undefined || filters[2].trim() == v.levels[0].name.trim()) &&
                    (filters[3] == undefined || v.categories[0] == undefined || filters[3].trim() == v.categories[0].name.trim()))
                    sorted.push(input[i]);
            } catch (err) {
                console.log("соси письку, они в анкете что то проебали");
            }
        }
        return sorted;
    }

    async function updateVacancies(filters: Array<String>, offset = 1, output: Array<VacancyType> = []): Promise<Array<VacancyType>> {
        try {
            let response: Response = await fetch('https://www.themuse.com/api/public/jobs?page=' + offset);
            let json: ApiResponse = (await response.json()) as ApiResponse;
            output.push(...sortVacancies(json.results, filters));
            if (offset >= vacancyRange / 20) return output;
            else return updateVacancies(filters, offset + 1, output);
        } catch (err) {
            throw err;
        }
    }

    updateVacancies(null).then((x) => (vacancies = x));

    let activeFilterLocation: Element;
    let activeFilterSalary: Element;
    let activeFilterExperience: Element;
    let activeFilterCategory: Element;
    let filters: Array<String> = new Array<String>(4);

    function updateActiveElement(filterType: String, toActive: Element) {
        switch (filterType) {
            case 'location':
                if (activeFilterLocation)
                    activeFilterLocation.classList.remove('active');
                activeFilterLocation = toActive;
                filters[0] = toActive.textContent;
                activeFilterLocation.classList.add('active');
                break;

            case 'salary':
                if (activeFilterSalary)
                    activeFilterSalary.classList.remove('active');
                activeFilterSalary = toActive;
                filters[1] = toActive.textContent;
                activeFilterSalary.classList.add('active');
                break;

            case 'experience':
                if (activeFilterExperience)
                    activeFilterExperience.classList.remove('active');
                activeFilterExperience = toActive;
                filters[2] = toActive.textContent;
                activeFilterExperience.classList.add('active');
                break;

            case 'category':
                if (activeFilterCategory)
                    activeFilterCategory.classList.remove('active');
                activeFilterCategory = toActive;
                filters[3] = toActive.textContent;
                activeFilterCategory.classList.add('active');
                break;
        }
        updateVacancies(filters).then((x) => (vacancies = x));
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
                                class="inline-button"
                        >
                            {location}
                        </li>
                    {/each}
                </ul>
            </div>
        </div>

        <div class="filter filter-salary">
            <div class="filter-header">
                <p class="name">Salary:</p>
            </div>

            <div class="filter-content">
                <ul class="select select-radio">
                    <li
                            class="radio-button salary-radio-button"
                            on:click={(event) => updateActiveElement('salary', event.target)}
                    >
                        &lt; $1000
                    </li>
                    <li
                            class="radio-button salary-radio-button"
                            on:click={(event) => updateActiveElement('salary', event.target)}
                    >
                        $1000 - $2000
                    </li>
                    <li
                            class="radio-button salary-radio-button"
                            on:click={(event) => updateActiveElement('salary', event.target)}
                    >
                        $2000 - $3000
                    </li>
                    <li
                            class="radio-button salary-radio-button"
                            on:click={(event) => updateActiveElement('salary', event.target)}
                    >
                        $3000 - $5000
                    </li>
                    <li
                            class="radio-button salary-radio-button"
                            on:click={(event) => updateActiveElement('salary', event.target)}
                    >
                        &gt; $5000
                    </li>
                </ul>
            </div>
        </div>

        <div class="filter filter-experience">
            <div class="filter-header">
                <p class="name">Experience:</p>
            </div>

            <div class="filter-content">
                <ul class="select select-radio">
                    <li
                            class="radio-button experience-radio-button"
                            on:click={(event) => updateActiveElement('experience', event.target)}
                    >
                        no
                    </li>
                    <li
                            class="radio-button experience-radio-button"
                            on:click={(event) => updateActiveElement('experience', event.target)}
                    >
                        &lt; 1 year
                    </li>
                    <li
                            class="radio-button experience-radio-button"
                            on:click={(event) => updateActiveElement('experience', event.target)}
                    >
                        1 - 3 years
                    </li>
                    <li
                            class="radio-button experience-radio-button"
                            on:click={(event) => updateActiveElement('experience', event.target)}
                    >
                        3 - 5 years
                    </li>
                    <li
                            class="radio-button experience-radio-button"
                            on:click={(event) => updateActiveElement('experience', event.target)}
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
                                class="inline-button"
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
