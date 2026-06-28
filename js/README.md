# Pokédex

Buscador de Pokémon que consume la PokeAPI. Proyecto integrador del Módulo 3 del curso de Desarrollo Web.

## Demo
🔗 [Ver en GitHub Pages](https://andrepr16.github.io/Pokedex/)

## Cómo usarlo
1. Abre el sitio desplegado.
2. Al cargar, aparecen 6 Pokémon iniciales en la rejilla.
3. Escribe el nombre o número de un Pokémon y presiona **Buscar** o **Enter**.
4. Revisa sus estadísticas y presiona **⚡ Capturar** para agregarlo a tu Pokédex.
5. Presiona **Cargar más** para traer más Pokémon a la rejilla.
6. Presiona **❌ Quitar** en cualquier tarjeta para eliminarla de tu colección.

## Historias de Usuario implementadas
- **HU1:** Ver la rejilla de tarjetas con imagen, nombre y tipos.
- **HU2:** Generar las tarjetas desde un array con JavaScript.
- **HU3:** Datos limpios con destructuring, tipos con `.map` y acceso seguro con `?.` / `??`.
- **HU4:** Filtrar la lista en vivo (la UI reacciona a los datos).
- **HU5:** Reformular la carga con `async/await`.
- **HU6:** Buscar y traer un Pokémon desde la API.
- **HU7:** Capturar el Pokémon buscado en la colección.
- **HU8:** Mostrar estadísticas del Pokémon buscado.
- **HU9:** Cargar más Pokémon con paginación (`?limit`/`?offset`).
- **HU10:** Manejo de errores con `try/catch/finally` y `response.ok`.

## Decisiones técnicas clave
- **Patrón render:** limpiar → recorrer → agregar. La UI es un reflejo de los datos.
- **Función adaptadora:** traduce la estructura anidada de la PokeAPI a la forma limpia del proyecto, permitiendo reusar `crearTarjeta` y `render` sin cambios.
- **`response.ok` + `throw`:** `fetch` no falla automáticamente en un 404. Se revisa manualmente y se lanza un error propio con mensaje claro.
- **`finally`:** garantiza que el spinner se oculte siempre, haya éxito o error.

## Tecnologías
- JavaScript (`fetch`, `async/await`, `Promise.all`, `try/catch/finally`)
- Tailwind CSS (por CDN)
- [PokeAPI](https://pokeapi.co/)

## Capturas

![Rejilla de Pokémon](assets/rejilla.png)
![Búsqueda exitosa](assets/busqueda.png)
![Mensaje de error](assets/error.png)ya esta