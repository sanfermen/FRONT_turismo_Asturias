export function translateType(type) {
	switch (type) {
		case "area": return "Áreas";
		case "route": return "Rutas";
		case "beach": return "Playas";
		case "museum": return "Museos";
		case "preroman": return "Prerrománico";
		case "rockArt": return "Arte rupestre";
		default: return type;
	}
}