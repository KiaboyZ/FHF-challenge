<script lang="ts">
	import Container from './Container.svelte';

	export let validCard: boolean = false;

	// represents whether or not you are currently adding a card.
	let adding: boolean = false;
	// dummy list of credit cards that you can add to
	let cards: any = [
		{
			name: 'John Johnson',
			type: 'Visa',
			number: '1234 5678 9101 1121',
			expiration: '05/1565',
			validCVV: false
		}
	];

	// starts adding a new card
	const startNewCard = () => {
		adding = true;
	};

	// stops adding a new card
	const cancelNewCard = () => {
		adding = false;
	};

	// check if there is a selected card with a valid cvv in the cards list
	const lookForValidCard = () => {
		validCard = false;
		for (let index in cards) {
			if (cards[index].validCVV && cards[index].selected) {
				validCard = true;
			}
		}
	};

	// when a character is entered in the cvv field, check if it is valid and update the card it corresponds to
	// then check if any cards are valid for checkout
	function checkCVV(e: any) {
		for (let index in cards) {
			if (e.target.name == cards[index].number) {
				cards[index].validCVV = /^[0-9]{3,4}$/.test(e.target.value);
				lookForValidCard();
			}
		}
		lookForValidCard();
	}

	// when a radio button is selected, update the card it corresponds to and deselect all of the others
	// then check if any cards are valid for checkout
	function changeSelected(e: any) {
		for (let index in cards) {
			if (e.target.id == cards[index].number) {
				cards[index].selected = true;
			} else {
				cards[index].selected = false;
			}
		}
		lookForValidCard();
	}

	// https://www.thisdot.co/blog/handling-forms-in-svelte
	// takes the new card form submission and creates a new object with the data
	// then add that new card object to the cards list
	function submitNewCard(e: any) {
		const formData = new FormData(e.target);

		const data: any = {};
		for (let field of formData) {
			const [key, value] = field;
			data[key] = value;
		}
		const newCard = {
			name: data.name,
			type: 'Visa',
			number: data.number,
			expiration: data.expiration,
			selected: false
		};
		cards.push(newCard);
		cards = cards;
		adding = false;
	}
</script>

<form>
	{#each cards as card}
		<div class="flex items-center gap-4 rounded p-4 {card.selected ? 'bg-blue-50' : ''} ">
			<input type="radio" name="cardRadio" id={card.number} on:change={changeSelected} />
			<div class="w-full">
				<p class="font-semibold text-lg p-0">
					{card.type} - {card.number.slice(card.number.length - 4, card.number.length)}
				</p>
				<p class="text-slate-600 text-sm p-0">{card.name} | {card.expiration}</p>
				<p class="text-sm">Security Code</p>
				<div class="flex gap-4 items-center">
					<form>
						<input
							id="cvv"
							name={card.number}
							type="password"
							class="form-input rounded w-14"
							maxlength="4"
							on:input={checkCVV}
						/>
					</form>
					{#if card.validCVV}
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
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="red"
							class="w-8 h-8"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					{/if}
					<p class="text-sm">3-4 digits on back of card</p>
				</div>
			</div>
		</div>
	{/each}
</form>

{#if adding}
	<Container>
		<form on:submit|preventDefault={submitNewCard}>
			<div class="flex gap-2 items-center py-2">
				<label for="name" class="">Cardholder's Name:</label>
				<input id="name" name="name" type="text" class="form-input rounded" />
			</div>
			<div class="flex gap-2 items-center py-2">
				<label for="number" class="">Card Number:</label>
				<input
					id="number"
					name="number"
					type="text"
					pattern="[0-9]+"
					inputmode="numeric"
					class="form-input rounded"
				/>
				<span class="text-slate-600">(Accepts numbers only.)</span>
			</div>
			<div class="flex gap-2 items-center py-2">
				<label for="expiration" class="">Expiration Date:</label>
				<input
					id="expiration"
					name="expiration"
					type="text"
					pattern="[0-9]+"
					inputmode="numeric"
					class="form-input rounded"
					placeholder="MM/YYYY"
				/>
				<span class="text-slate-600">(Accepts numbers only.)</span>
			</div>
			<div class="flex gap-2">
				<button
					class="text-white font-semibold w-full rounded p-2 bg-red-600 hover:bg-red-700"
					on:click={cancelNewCard}>Cancel</button
				>
				<button
					type="submit"
					class="text-white font-semibold w-full rounded p-2 bg-green-600 hover:bg-green-700"
					>Submit</button
				>
			</div>
		</form>
	</Container>
{:else}
	<button
		class="flex gap-4 items-center p-2 hover:bg-slate-200 transition rounded w-full"
		on:click={startNewCard}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="royalblue"
			class="w-8 h-8"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
		</svg>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="gray"
			class="w-8 h-8"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
			/>
		</svg>
		<p class="text-blue-400 font-semibold">Add New Card</p>
	</button>
{/if}
