export const load = ({ fetch }: any) => {

	// these are just some dummy show objects I made to load in.
	// they will be loaded into the shows/+page.svelte file
	return {

		shows: [
			{
				name: "Cool Band and the Gang",
				description: "At volutpat diam ut venenatis.",
				price: 10
			},
			{
				name: "Hamsterton",
				description: "Etiam dignissim diam quis enim lobortis.",
				price: 89.99
			},
			{
				name: "Possum Joe and the Boogies",
				description: "Adipiscing enim eu turpis egestas.",
				price: 5.55
			},
			{
				name: "Wawaweewa",
				description: "Quis viverra nibh cras pulvinar mattis nunc.",
				price: 1337.00
			},
			{
				name: "The Red Blues",
				description: "Sit amet commodo nulla facilisi.",
				price: 123.45
			},
			{
				name: "XXbandXX",
				description: "Etiam dignissim diam quis enim lobortis.",
				price: 999.66
			},
			{
				name: "Lohn Jennon",
				description: "Dolor magna eget est lorem ipsum dolor.",
				price: 753.19
			},
			{
				name: "Normal Al Yankovic",
				description: "Tempus urna et pharetra pharetra massa.",
				price: 888.00
			},
			{
				name: "James",
				description: "Ac turpis egestas maecenas pharetra.",
				price: 25
			},]
	}
}