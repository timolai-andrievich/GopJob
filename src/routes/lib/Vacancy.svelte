<script lang="ts">
    import type { VacancyType } from './VacancyType';

    export let data: VacancyType;
</script>

<div class="vacancy">
    <h2>{data.name}</h2>
    <p>{@html data.contents}</p>
</div>


<style>
    .vacancy {
        background-color: #d0d2db;
        border-radius: 50px;
        margin-bottom: 7vh;
    }
    h2, p {
        font-family: 'Lato', sans-serif;
    }
    h2 {
        padding-top: 7vh;
        padding-left: 4vw;
    }
    p {
        padding-left: 5.9vw;
        padding-bottom: 7vh;
        padding-right: 4vw
    }
</style>