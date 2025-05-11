import fetchData from "./fetch";

async function updateUser(_, id, updateData) {
	const data = {
		name: updateData.name,
		email: updateData.email,
	}
	const result = await fetchData(`/user/${id}`, "PUT", data);
	return result;
};

export { 
	updateUser 
};