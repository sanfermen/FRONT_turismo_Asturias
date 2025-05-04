import "./SideBar.css";

function SideBar({ activeFilters, setActiveFilters }) {
	const handleChange = (e) => {
		const { value, checked } = e.target;
		if (checked) {
			setActiveFilters((prev) => [...prev, value]);
		} else {
			setActiveFilters((prev) => prev.filter((f) => f !== value));
		}
	};
	return (
		<div className="checkbox-list">
			<label><input type="checkbox" value="area" onChange={handleChange} />Áreas</label>
			<label><input type="checkbox" value="beach" onChange={handleChange} />Playas</label>
			<label><input type="checkbox" value="museum" onChange={handleChange} />Museos</label>
			<label><input type="checkbox" value="route" onChange={handleChange} />Rutas</label>
			<label><input type="checkbox" value="preroman" onChange={handleChange} />Arte prerrománico</label>
			<label><input type="checkbox" value="rockArt" onChange={handleChange} />Arte rupestre</label>
		</div>
	);
}

export default SideBar;