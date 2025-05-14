# Mapa turístico Asturias

Este proyecto es la interfaz web desarrollada con **React + Vite** para visualizar datos turísticos de Asturias a través de un mapa interactivo con **Leaflet**. Se conecta con una API propia que provee información sobre áreas de autocaravanas, playas, rutas, arte prerrománico y otros puntos de interés.

## Tecnologías utilizadas

- React
- Leaflet
- CSS (modular)
- Fetch API

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tuusuario/nombre-repo-frontend.git
   cd nombre-repo-frontend
   ```

2. Instala las dependencias:

	```bash
	npm install
	```

3. Inicia el servidor de desarrollo:

	```bash
	npm start
	```
La aplicación estará disponible en http://localhost:5173 por defecto.

## Uso

- Utiliza la barra lateral para filtrar los puntos de interés mostrados en el mapa.
- Haz clic en los marcadores para ver información detallada de cada lugar.
- Regístrate o inicia sesión para marcar puntos como favoritos o visitados.
- Accede a tu perfil para gestionar tus lugares guardados, ver comentarios y fechas de visita.

## Backend

El frontend se conecta con un backend desarrollado con Node.js y Sequelize. Puedes acceder al repositorio del backend aquí:
[Repositorio del backend](https://github.com/sanfermen/API_turismo_Asturias.git)

## Licencia

Este proyecto está licenciado bajo la licencia MIT. Consulta el archivo [LICENSE](./LICENSE) para más información.

