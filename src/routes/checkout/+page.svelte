<script lang="ts">
	import { goto } from '$app/navigation';
	import Container from '../../components/Container.svelte';
	import CreditCards from '../../components/CreditCards.svelte';
	import CartStore from '../Store';

	$: cart = $CartStore;

	let cardWarning:boolean = false;
	let termsWarning: boolean = false;
	let termsAgree: boolean = false;
	let validCard:boolean;

	const serviceFee: number = 44.08;
	const processingFee: number = 2.95;

	const placeOrder = () => {
		if (!validCard) {
			cardWarning = true;
			return;
		} else {
			cardWarning = false;
		}

		if (!termsAgree) {
			termsWarning = true;
			return;
		} else {
			termsWarning = false;
		}

		goto('/finish');
	};

	const agreeToTerms = () => {
		termsAgree = !termsAgree;
	};
</script>

<p class="text-center font-bold">Checkout</p>
{#if cart.name == ''}
	<Container>
		<p>
			Aw rats, you haven't selected a show! Go back to the <a class="text-blue-400" href="/shows"
				>shows page</a
			> before they sell out!
		</p>
	</Container>
{:else}
	<p>Back to <a class="text-blue-400" href="/tickets">ticket selection</a>.</p>
	<div class="grid grid-cols-5 gap-4">
		<div class="grid col-span-3 gap-4">
			<Container>
				<div class="flex items-center">
					<p class="font-bold text-xl">Delivery &nbsp</p>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="green"
						class="w-8 h-8"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<p class="font-bold text-lg">Mobile Entry - Free</p>
				<p class="text-slate-600">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Lectus urna duis convallis convallis tellus id interdum.
					Bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim.
				</p>
			</Container>
			<Container>
				<div class="flex items-center">
					<p class="font-bold text-xl">Payments &nbsp</p>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="green"
						class="w-8 h-8"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<CreditCards bind:validCard />
			</Container>
			<div />
		</div>
		<div class="grid col-span-2">
			<Container>
				<div class="flex relative">
					<p class="font-bold text-xl">Total</p>
					<p class="absolute right-0 font-bold text-xl">${(cart.tickets * cart.price + processingFee + serviceFee + cart.tickets).toFixed(2)}</p>
				</div>
				<p class="font-bold text-lg">Tickets</p>
				<div class="flex relative">
					<p>Resale Tickets: ${cart.price} x {cart.tickets}</p>
					<p class="absolute right-0">${(cart.price * cart.tickets).toFixed(2)}</p>
				</div>
				<p class="font-bold text-lg">Notes From Seller</p>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Lectus urna duis convallis convallis tellus id interdum.
					Bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim.
				</p>
				<p class="font-bold text-lg">Fees</p>
				<div class="flex relative">
					<p>Service Fee: ${serviceFee} x {cart.tickets}</p>
					<p class="absolute right-0">${serviceFee * cart.tickets}</p>
				</div>
				<div class="flex relative">
					<p>Order Processing Fee</p>
					<p class="absolute right-0">${processingFee}</p>
				</div>
				<p class="font-bold text-lg">Delivery</p>
				<div class="flex relative">
					<p>Mobile Entry</p>
					<p class="absolute right-0">Free</p>
				</div>
				<br />
				<a class="text-blue-400 py-2" href="/" title="Cancel order.">Cancel Order</a>
				<p>*All Sales Final - No Refunds</p>
				<br />
				<div class="flex gap-2 items-center">
					<input class="rounded" type="checkbox" on:click={agreeToTerms} />
					<p>I have read and agree to the current
						<a class="text-blue-400" href="/terms" title="Terms of Use">Terms of Use</a>.
					</p>
				</div>
				
				{#if termsWarning}
					<p class="text-red-600">You need to agree to the current Terms of Use.</p>
				{/if}
				{#if cardWarning}
					<p class="text-red-600">You need a valid card to place your order.</p>
				{/if}
				<button
					class="bg-green-600 hover:bg-green-500 rounded-md p-2 w-full text-white font-semibold transition"
					on:click={placeOrder}
				>
					Place Order
				</button>
				<p class="text-sm">*Exceptions may apply, see our Terms of Use.</p>
			</Container>
		</div>
	</div>
{/if}
