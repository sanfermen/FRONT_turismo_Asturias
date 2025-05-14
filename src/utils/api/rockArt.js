import fetchData from "./fetch.js";

async function getAllRockArt() {
	const rockArt = await fetchData("/rockArt")
	return rockArt;
}

async function getRockArtById(id) {
	const rockArt = await fetchData(`/rockArt/${id}`)
	return rockArt;
}

export {
	getAllRockArt,
	getRockArtById
}