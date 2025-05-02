import fetchData from "./fetch.js";

async function getAllMuseums() {
	const museums = await fetchData("/museum")
	return museums;
}

async function getMuseumById(id) {
	const museum = await fetchData(`/museum/${id}`)
	return museum;
}

export {
	getAllMuseums,
	getMuseumById
}