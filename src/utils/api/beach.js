import fetchData from "./fetch.js";

async function getAllBeaches() {
	const beach = await fetchData("/beach")
	return beach;
}

async function getBeachById(id) {
	const beach = await fetchData(`/beach/${id}`)
	return beach;
}

export {
	getAllBeaches,
	getBeachById
}