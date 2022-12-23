<script lang="ts">
	import Container from './Container.svelte';
	import CartStore from '../routes/Store';

	export let name: string;
	export let description: string;
	export let price: number;

	const buy = () => {
		CartStore.update(() => {
			return {name:name, description:description, price:price, tickets:0};
		})
	};
</script>

<Container>
	<div class="grid grid-cols-5 gap-2">
		<div class="col-span-3 flex flex-col relative">
			<p class="font-bold text-lg">{name}</p>
			<p>{description}</p>
			<br>
			<p class="absolute bottom-0">${price} per ticket.</p>
		</div>
		<div class="col-span-2 flex flex-col">
			<img
				class="rounded-t-md"
				src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
				alt="placeholder"
			/>
			<a href="/tickets">
				<button class="bg-green-600 hover:bg-green-500 rounded-b-md p-2 w-full text-white font-semibold transition" on:click={buy}>
					Buy tickets.
				</button>
			</a>
		</div>
	</div>
</Container>
