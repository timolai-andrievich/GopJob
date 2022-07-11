<script lang="ts">
	import { createEventDispatcher } from 'svelte/internal';
	import { base } from '$app/paths';
	import Tags from 'svelte-tags-input';
	import { locations } from './Locations';

	let tagFlags = '';
	const dispatch = createEventDispatcher();
	let expanded = false;
	export let values;

	function onTagsUpdated(event) {
		tagFlags = event.detail.tags;
		values.locations = tagFlags;
		dispatch('updated');
	}
</script>

<div class="location-filter">
	<div on:click={(e) => (expanded = !expanded)} class="header">
		<div>Locations</div>
		<img
			class="expand-button"
			src="{base}/expand.png"
			alt={expanded ? 'Fold' : 'Expand'}
			style="transform:scaleY({expanded ? -1 : 1})"
		/>
	</div>
	{#if expanded}
		<div id="locations-tags">
			<Tags
				on:tags={onTagsUpdated}
				autoComplete={locations}
				onlyAutocomplete={true}
				minChars={3}
				autocomplete="off"
			/>
		</div>
	{/if}
</div>

<style>
	#locations-tags {
		display: flex;
		flex-direction: column;
		margin-left: 1vw;
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
	.location-filter {
		margin-top: 1vh;
		margin-bottom: 1vh;
		padding: 2vmin;
		background-color: #d5d7df;
		border-radius: 2vmin;
	}
	.location-filter :global(.svelte-tags-input-layout) {
		border-radius: 10px;
	}
	.location-filter :global(.svelte-tags-input-tag) {
		border-radius: 7px;
	}
</style>
