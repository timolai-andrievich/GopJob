<script lang="ts">
	import type { VacancyType } from './ApiUtils';
	import { base } from '$app/paths';

	let expanded = false;
	export let data: VacancyType;
</script>

<div id="vacancy" class={expanded ? 'expanded' : 'folded'}>
	<div class="vacancy-header">
		<h2 id="name">
			<a id="name-link" target="_blank" href={data.refs.landing_page}>{data.name}</a>
		</h2>
		<img
			class="expand-button"
			src="{base}/expand.png"
			alt={expanded ? 'Fold' : 'Expand'}
			on:click={(e) => (expanded = !expanded)}
			style="transform:scaleY({expanded ? -1 : 1})"
		/>
	</div>
	{#if expanded}
		<div id="vacancy-contents">
			<div id="contents">{@html data.contents}</div>
		</div>
	{/if}
</div>

<style>
	div#vacancy {
		background-color: #e8e8e8;
		border-radius: 39px;
		margin-bottom: 7vh;
		font-family: 'Lato';
		transition: 5s;
	}
	h2#name {
		padding-top: 5vh;
		padding-bottom: 5vh;
		padding-left: 4vw;
		font-family: 'Lato-bold';
		font-size: 2vmax;
		flex: 1;
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
		color: #008;
	}
	.vacancy-header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-items: stretch;
	}
	.expand-button {
		margin: 2vmin;
		width: 2.5vw;
		margin-right: 3vw;
		transition: 250ms;
	}
	.expand-button:hover {
		margin: 1vmin;
		width: 3.5vw;
		margin-right: 2.5vw;
	}
</style>
