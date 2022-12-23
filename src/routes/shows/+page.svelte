<script lang="ts">
	import type { PageData } from './$types';
	import Show from "../../components/Show.svelte";

	export let data:PageData;
</script>

<p class="text-center font-bold">Shows</p>
<div class="grid gap-2 grid-cols-3">
{#each data.shows as show}
	<Show name={show.name} description={show.description} price={show.price}/>
{/each}
</div>