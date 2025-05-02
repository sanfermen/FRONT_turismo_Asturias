import fetchData from "./fetch.js";

async function getAllAreas() {
	const areas = await fetchData("/area")
	return areas;
}

async function getAreaById(id) {
	const area = await fetchData(`/area/${id}`)
	return area;
}

export {
	getAllAreas,
	getAreaById
}