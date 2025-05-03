import "./AreaCard.css";

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
		<div className="area_card">
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
