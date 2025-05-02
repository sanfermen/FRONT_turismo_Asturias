const BASE_URL = 'http://localhost:3000/api';
// TOTO meto el token ya en fetchData aunque no haga falta para todo?

async function fetchData(route, method="GET", data=null) {
	const url = BASE_URL + route;
	const options = {
		method: method,
		headers: {}
	};
	if (data) {
		options.headers["Content-type"] = "application/json";
		options.body = JSON.stringify(data)
	}
	const response = await fetch(url, options);
	const responseData = await response.json();
	if (!response.ok) {
		responseData.status = response.status;
	}
	return responseData;
}

export default fetchData;