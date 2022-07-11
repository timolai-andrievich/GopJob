<script lang="ts">
	import { createEventDispatcher } from 'svelte/internal';
	
	const dispatch = createEventDispatcher();
	export let page: number;
	export let totalPages: number;

	function dispatchEvent() {
		dispatch('pageChanged');
	}

	function toFirstPage() {
		if (page > 1) {
			page = 1;
			dispatchEvent();
		}
	}
	function toPreviousPage() {
		if (page > 1) {
			page--;
			dispatchEvent();
		}
	}
	function toNextPage() {
		if (page < totalPages) {
			page++;
			dispatchEvent();
		}
	}
	function toLastPage() {
		if (page < totalPages) {
			page = totalPages;
			dispatchEvent();
		}
	}
</script>

{#if totalPages > 0}
	<div class="page-controls">
		{#if page > 1}
			<div class="link" on:click={toFirstPage}>1.</div>
		{/if}
		{#if page > 2}
			<div class="no-underline">...</div>
			<div class="link" on:click={toPreviousPage}>
				{page - 1}.
			</div>
		{/if}
		<div class="no-underline">{page}.</div>
		{#if page < totalPages - 1}
			<div class="link" on:click={toNextPage}>
				{page + 1}.
			</div>

			<div class="no-underline">...</div>
		{/if}
		{#if page < totalPages}
			<div class="link" on:click={toLastPage}>
				{totalPages}.
			</div>
		{/if}
	</div>
{/if}

<style>
	.page-controls {
		display: flex;
		flex-direction: row;
		margin-bottom: 2vh;
		margin-top: 2vh;
	}
	.page-controls > div {
		user-select: none;
		min-width: 2vw;
		transition: 250ms;
		display: flex;
		place-content: center;
	}
	.page-controls > div.link:hover {
		text-decoration: underline;
	}
	.no-underline {
		font-weight: bold;
		text-decoration: none;
	}
	.no-underline:hover {
		font-weight: bold;
		text-decoration: none;
	}
</style>
