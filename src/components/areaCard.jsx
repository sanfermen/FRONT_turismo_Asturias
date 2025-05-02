
function AreaCard({ area }) {
	const {
		name,
		image,
		address,
		type,
		drinking_water,
		waste_water,
		black_water,
		places,
		max_stay
	} = area;

	return (
		<div style={{
			border: "1px solid #ccc",
			borderRadius: "10px",
			padding: "1rem",
			margin: "1rem",
			width: "300px",
			boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
		}}>
			<img
				src={image}
				alt={name}
				style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px" }}
			/>
			<h2>{name}</h2>
			<p><strong>Dirección:</strong> {address}</p>
			<p><strong>Tipo:</strong> {type === "public" ? "Pública" : "Privada"}</p>
			<p><strong>Plazas:</strong> {places}</p>
			<p><strong>Estancia máxima:</strong> {max_stay || "Sin límite"}</p>
			<p>
				<strong>Servicios:</strong>{" "}
				{[
					drinking_water && "Agua potable",
					waste_water && "Aguas grises",
					black_water && "Aguas negras"
				].filter(Boolean).join(", ") || "Ninguno"}
			</p>
		</div>
	);
}

export default AreaCard;
