<script lang="ts">
	import { createEventDispatcher } from 'svelte/internal';
	import type { Company } from '$lib/ApiUtils';
	import { base } from '$app/paths';
	import { companies } from './Companies';
    import Tags from 'svelte-tags-input';

	const dispatch = createEventDispatcher();
	let expanded = false;
	let tags = "";
	export let values;

    function onTagsUpdated(event) {
            tags = event.detail.tags;
            values.companies = tags;
		    dispatch('updated');
    }
</script>

<div class="companies-filter">
	<div on:click={(e) => (expanded = !expanded)} class="header">
		<div 
		>Companies</div>
		<img
			class="expand-button"
			src="{base}/expand.png"
			alt={expanded ? 'Fold' : 'Expand'}
			style="transform:scaleY({expanded ? -1 : 1})"
		/>
	</div>
	{#if expanded}
		<div class="company-combobox">
            <Tags
                    on:tags={onTagsUpdated}
                    autoComplete={companies}
                    onlyAutocomplete={true}
                    minChars={3}
                />
		</div>
	{/if}
</div>

<style>
	.company-combobox {
		margin-left: 1vw;
		display: flex;
		flex-direction: column;
	}
	.company-combobox :global(.svelte-tags-input-layout) {
		border-radius: 10px;
	}
	.company-combobox :global(.svelte-tags-input-tag) {
		border-radius: 7px;
	}
	.expand-button {
		margin: 1vh;
		height: 2vh;
		transition: 250ms;
	}
	.expand-button:hover {
		margin: 0.5vh;
		height: 3vh;
	}
	.header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		user-select: none;
	}
	.companies-filter {
		margin-top: 1vh;
		margin-bottom: 1vh;
		padding: 2vmin;
		background-color: #d5d7df;
		border-radius: 2vmin;
	}
</style>
