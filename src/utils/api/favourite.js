import fetchData from "./fetch.js";

async function getFavourites() {
	const favourites = await fetchData("/favourite");
	return favourites;
}

async function addFavourites(favData) {
	const favourites = await fetchData("/favourite", "POST", favData);
	return favourites;
}

async function removeFavourites(id) {
	return await fetchData(`/favourite/${id}`, "DELETE");
}

async function getFavouritesWithData() {
	const result = await fetchData("/favourite/with-data");
	return result;
}

export {
	getFavourites,
	addFavourites,
	removeFavourites,
	getFavouritesWithData
}