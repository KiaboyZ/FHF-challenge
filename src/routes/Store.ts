import { writable } from "svelte/store";

const CartStore = writable({
	name:"",
	description:"",
	price:0,
	tickets:0
})

export default CartStore;