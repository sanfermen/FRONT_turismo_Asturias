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

async function getVisitedWithData() {
	const result = await fetchData("/visited/with-data");
	return result;
}

export {
	getVisited,
	addVisited,
	editVisited,
	removeVisited,
	getVisitedWithData
}