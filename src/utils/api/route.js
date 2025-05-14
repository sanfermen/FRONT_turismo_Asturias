import fetchData from "./fetch.js";

async function getAllRoutes() {
	const routes = await fetchData("/route")
	return routes;
}

async function getRouteById(id) {
	const route = await fetchData(`/route/${id}`)
	return route;
}

export {
	getAllRoutes,
	getRouteById
}