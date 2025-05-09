import fetchData from "./fetch.js";

async function getVisited() {
	const visited = await fetchData("/visited");
	return visited;
}

async function addVisited(visitData) {
	const visited = await fetchData("/visited", "POST", visitData);
	return visited;
}

async function editVisited(id, visitData) {
	const visited = await fetchData(`/visited/${id}`, "PUT", visitData);
	return visited;
}

async function removeVisited(id) {
	return await fetchData(`/visited/${id}`, "DELETE");
}

export {
	getVisited,
	addVisited,
	editVisited,
	removeVisited
}