<script lang="ts">
	import { goto } from '$app/navigation';
	import Container from '../../components/Container.svelte';
	import CartStore from '../Store';

	$: cart = $CartStore;

	let warning:boolean = false;

	// proceed to checkout if you've added some tickets. Otherwise, display a warning.
	const proceed = () => {
		if (cart.tickets > 0) {
			goto("/checkout")
		}

		warning = true;
	};

	// add 1 to ticket quantity
	const plus = () => {
		CartStore.update((currentData) => {
			let newData = currentData;
			newData.tickets += 1;
			return newData;
		})
	}

	// subtract 1 from ticket quantity
	const minus = () => {
		if (cart.tickets > 0) {
			CartStore.update((currentData) => {
				let newData = currentData;
				newData.tickets -= 1;
				return newData;
			})
		}
	}
</script>

<p class="text-center font-bold">Tickets</p>
{#if cart.name == ""}
	<Container>
		<p>Aw rats, you haven't selected a show! Go back to the <a class="text-blue-400" href="/shows">shows page</a> before they sell out!</p>
	</Container>
{:else}
	<p>Back to <a class="text-blue-400" href="/shows">shows</a>.</p>
	<Container>
		<div class="grid grid-cols-5 gap-2">
			<div class="col-span-3 flex flex-col relative">
				<p class="font-bold text-lg">{cart.name}</p>
				<p>{cart.description}</p>
				<p class="absolute bottom-0">${cart.price} per ticket.</p>
			</div>
			<div class="grid col-span-2">
				<div class="row-span-1 flex">
					<button class="text-slate-500 hover:text-slate-700 click:text-slate-900" on:click={minus}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
							<path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</button>
					<button class="text-slate-500 hover:text-slate-700 click:text-slate-900" on:click={plus}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
					  	</svg>
					</button>
					<p class="font-semibold text-lg">&nbsp{cart.tickets + " tickets"}</p>
				</div>
				<div class="row-span-1">
					<p>Total cost: ${(cart.price * cart.tickets).toFixed(2)}</p>
					{#if warning}
						<p class="text-red-600">You need to buy at least one ticket.</p>
					{/if}
					<button class="bg-green-600 hover:bg-green-500 rounded-md p-2 w-full text-white font-semibold transition" on:click={proceed}>
						Proceed to checkout.
					</button>
				</div>
			</div>
		</div>
	</Container>
{/if}
