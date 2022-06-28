<script lang="ts">
    import type { VacancyType } from './VacancyType';

    export let data: VacancyType;
</script>

<h1>{data.name}</h1>
<p>{@html data.contents}</p>