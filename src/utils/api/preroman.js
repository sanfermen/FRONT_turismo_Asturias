import fetchData from "./fetch.js";

async function getAllPreroman() {
	const preroman = await fetchData("/preroman")
	return preroman;
}

async function getPreromanById(id) {
	const preroman = await fetchData(`/preroman/${id}`)
	return preroman;
}

export {
	getAllPreroman,
	getPreromanById
}