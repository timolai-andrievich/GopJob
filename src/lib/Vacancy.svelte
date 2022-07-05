<script lang="ts">
    import type { VacancyType } from './VacancyType';

    let expanded = false;
    export let data: VacancyType;
</script>
    
<div id="vacancy" class={expanded ? "expanded" : "folded"} on:click={() => expanded =! expanded}>
    <h2 id="name"><a id="name-link" href={data.refs.landing_page}>{data.name}</a></h2>
    {#if expanded}
        <div id="vacancy-contents">
            <div id="contents">{@html data.contents}</div>
        </div>
    {/if}
</div>


<style>
    div#vacancy {
        background-color: #DCDCDC;
        border-radius: 39px;
        margin-bottom: 7vh;
        font-family: 'Lato';
    }
    h2#name {
        padding-top: 5vh;
        padding-bottom: 5vh;
        padding-left: 4vw;
        font-family: 'Lato-bold';
        font-size: 2vmax;
    }
    #vacancy-contents {
        padding-left: 5.9vw;
        padding-bottom: 7vh;
        padding-right: 4vw;
        font-size: 1.5vmax;
    }
    #name-link {
        text-decoration: none;
        color: inherit;
        transition: 250ms;
    }
    #name-link:hover {

    }
</style>