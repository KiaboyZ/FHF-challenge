import { writable } from "svelte/store";

// stores the tickets you want to order
const CartStore = writable({
	name:"",
	description:"",
	price:0,
	tickets:0
})

export default CartStore;