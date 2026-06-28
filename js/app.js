// ── C09 (comentado — referencia) ─────────────────────────────────
// const pokemonLocal = [
//  { nombre: "bulbasaur",  imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",  tipos: ["grass", "poison"] },
//  { nombre: "charmander", imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",  tipos: ["fire"] },
//  { nombre: "squirtle",   imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",  tipos: ["water"] },
//  { nombre: "pikachu",    imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png", tipos: ["electric"] },
//  { nombre: "jigglypuff", imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png", tipos: ["normal", "fairy"] },
//  { nombre: "gengar",     imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png",  tipos: ["ghost", "poison"] }
// ];

// Logro 2 — Spread: agrega Mewtwo sin mutar pokemonLocal
// const nuevo = {
//  nombre: "mewtwo",
//  imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png",
//  tipos: ["psychic"]
// };
//const listaPokemon = [...pokemonLocal, nuevo];

// Logro 1 — Color por tipo
const coloresPorTipo = {
    grass: "bg-green-200 text-green-800",
    poison: "bg-purple-200 text-purple-800",
    fire: "bg-red-200 text-red-800",
    water: "bg-blue-200 text-blue-800",
    electric: "bg-yellow-200 text-yellow-800",
    normal: "bg-slate-200 text-slate-700",
    fairy: "bg-pink-200 text-pink-800",
    ghost: "bg-indigo-200 text-indigo-800",
    psychic: "bg-rose-200 text-rose-800",
};

const contenedor = document.getElementById("resultado");

function crearTarjeta(pokemon) {
    // HU3 — Destructuring de objeto
    const { nombre, imagen, tipos } = pokemon;

    // HU3 — ?? : respaldo si falta la imagen
    const img = imagen ?? "https://via.placeholder.com/96?text=?";

    // Logro 3 — Destructuring de array: tipo principal
    const [principal] = tipos;

    // HU3 + Logro 1 — .map() con color por tipo + .join()
    const badges = tipos.map(function (tipo) {
        const color = coloresPorTipo[tipo] ?? "bg-slate-200 text-slate-700";
        return `<span class="text-xs ${color} px-2 py-1 rounded-full">${tipo}</span>`;
    }).join("");

    // HU2 — createElement + innerHTML con template literal
    const articulo = document.createElement("article");
    articulo.className = "bg-white rounded-xl shadow p-4 text-center";
    articulo.innerHTML = `
    <img src="${img}" alt="${nombre}" class="w-24 h-24 mx-auto">
    <h2 class="capitalize font-bold text-slate-800 mt-2">${nombre}</h2>
    <p class="text-xs text-slate-500 mt-1">Tipo principal: ${principal}</p>
    <div class="flex gap-1 justify-center mt-2 flex-wrap">${badges}</div>
  `;
    return articulo;
}

// HU2 — Patrón render: limpiar → recorrer → agregar
function render(lista) {
    contenedor.innerHTML = "";
    lista.forEach(function (pokemon) {
        const tarjeta = crearTarjeta(pokemon);

        const botonQuitar = document.createElement("button");
        botonQuitar.textContent = "❌ Quitar";
        botonQuitar.className = "mt-2 w-full bg-red-200 text-red-800 font-semibold rounded-lg py-1 hover:bg-red-300";
        botonQuitar.addEventListener("click", function () {
            pokedex = pokedex.filter(p => p.nombre !== pokemon.nombre);
            render(pokedex);
        });
        tarjeta.appendChild(botonQuitar);

        contenedor.appendChild(tarjeta);
    });
}

// Llamada inicial con la lista ampliada (Logro 2)
// render(listaPokemon);

// HU4 — Filtro en vivo
// const buscador = document.getElementById("buscador");

//buscador.addEventListener("input", function () {
//  const texto = buscador.value.toLowerCase();
//  const filtrados = listaPokemon.filter(function (p) {
//    return p.nombre.includes(texto);
//  });
//  render(filtrados);
// });

// ── C10: lo nuevo va aquí ─────────────────────────────────────────

// Traduce la estructura anidada de la API a la forma limpia de C09
function adaptarPokemon(data) {
    return {
        nombre: data.name,
        imagen: data.sprites?.front_default ?? "https://via.placeholder.com/96?text=?",
        tipos: data.types.map(t => t.type.name),   // ← coma aquí
        stats: data.stats.map(s => ({ nombre: s.stat.name, valor: s.base_stat }))
    };
}

// const nombres = ["bulbasaur", "charmander", "squirtle", "pikachu", "jigglypuff", "gengar"];
// let pokedex = [];   // aquí guardamos la rejilla cargada

//contenedor.innerHTML = `
//  <div class="col-span-full flex justify-center items-center py-10">
//    <div class="w-12 h-12 border-4 border-slate-300 border-t-red-500 rounded-full animate-spin"></div>
//  </div>
// ;

// Un fetch por cada nombre → array de promesas
// const promesas = nombres.map(function (nombre) {
//  return fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`).then(r => r.json());
// });

// Promise.all(promesas)
//  .then(function (datos) {
//    pokedex = datos.map(adaptarPokemon);   // adapta todos a la forma limpia
//    render(pokedex);
//  })
//  .catch(function () {
//    contenedor.innerHTML = `<p class="col-span-full text-center text-red-600">No se pudo cargar la Pokédex.</p>`;
//  });

// Buscador reconectado — solo cambia pokemonLocal por pokedex
// const buscador = document.getElementById("buscador");

// buscador.addEventListener("input", function () {
//  const texto = buscador.value.toLowerCase();
//  const filtrados = pokedex.filter(p => p.nombre.includes(texto));
//  render(filtrados);
// });

// ── C11: lo nuevo va aquí ─────────────────────────────────────────

// Función base: trae un Pokémon por nombre o id
// async function obtenerPokemon(idONombre) {
//    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idONombre}`);
//    return response.json();
// }

// Reformula la carga de C10 con async/await
let pokedex = [];   // ← agregar esta línea

//async function obtenerPokemon(idONombre) {
//    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idONombre}`);
//    return response.json();
// }

//async function cargarPokedex() {
//    const nombres = ["bulbasaur", "charmander", "squirtle", "pikachu", "jigglypuff", "gengar"];
//    contenedor.innerHTML = `
//    <div class="col-span-full flex justify-center items-center py-10">
//      <div class="w-12 h-12 border-4 border-slate-300 border-t-red-500 rounded-full animate-spin"></div>
//    </div>
//  `;
//    const datos = await Promise.all(nombres.map(obtenerPokemon));
//    pokedex = datos.map(adaptarPokemon);
//    render(pokedex);
// }

// cargarPokedex();

// HU2 — Buscar y traer el Pokémon
const buscador = document.getElementById("buscador");
const botonBuscar = document.getElementById("btn-buscar");

async function buscarPokemon(nombre) {
    const data = await obtenerPokemon(nombre.toLowerCase());
    return adaptarPokemon(data);
}

// async function mostrarBusqueda(nombre) {
//    const pokemon = await buscarPokemon(nombre);
//    mostrarResultado(pokemon);
// }

botonBuscar.addEventListener("click", function () {
    const nombre = buscador.value.trim();
    if (nombre !== "") mostrarBusqueda(nombre);
});

buscador.addEventListener("keydown", function (event) {
    if (event.key === "Enter") botonBuscar.click();
});

// HU3 — Capturar el Pokémon
function capturar(pokemon) {
    if (!pokedex.some(p => p.nombre === pokemon.nombre)) {
        pokedex.push(pokemon);
    }
    render(pokedex);
    buscador.value = "";
}

function mostrarResultado(pokemon) {
    const tarjeta = crearTarjeta(pokemon);

    // estadísticas (solo en el resultado de búsqueda)
    const stats = document.createElement("div");
    stats.className = "mt-2 text-left text-xs space-y-1";
    stats.innerHTML = pokemon.stats.map(s => `
    <div class="flex justify-between">
      <span class="capitalize">${s.nombre}</span>
      <span class="font-semibold">${s.valor}</span>
    </div>
  `).join("");
    tarjeta.appendChild(stats);

    const botonCapturar = document.createElement("button");
    botonCapturar.textContent = "⚡ Capturar";
    botonCapturar.className = "mt-2 w-full bg-yellow-400 font-semibold rounded-lg py-1 hover:bg-yellow-500";
    botonCapturar.addEventListener("click", () => capturar(pokemon));
    tarjeta.appendChild(botonCapturar);

    contenedor.innerHTML = "";
    contenedor.appendChild(tarjeta);
}
// HU5 — Cargar más con parámetros de consulta
let offset = 0;   // desde qué Pokémon empezamos

async function cargarMas() {
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${offset}`);
    const lista = await respuesta.json();   // { results: [{ name, url }, ...] }

    // cada item trae solo name + url → pide el detalle de cada uno en paralelo
    const datos = await Promise.all(
        lista.results.map(item => fetch(item.url).then(r => r.json()))
    );

    datos.map(adaptarPokemon).forEach(function (pokemon) {
        if (!pokedex.some(p => p.nombre === pokemon.nombre)) {
            pokedex.push(pokemon);   // sin duplicar
        }
    });

    offset += 12;     // la próxima vez, la siguiente página
    render(pokedex);
}

document.getElementById("cargar-mas").addEventListener("click", cargarMas);

// ── C12: lo nuevo va aquí ─────────────────────────────────────────

const spinner = document.getElementById("spinner");
const mensaje = document.getElementById("mensaje");

// 1. primero obtenerPokemon (la base)
async function obtenerPokemon(idONombre) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idONombre}`);
    if (!response.ok) {
        throw new Error(`No se encontró "${idONombre}"`);
    }
    return response.json();
}

// 2. luego mostrarBusqueda (que la usa indirectamente)
async function mostrarBusqueda(nombre) {
    spinner.classList.remove("hidden");   // ⏳ muestra carga  
    mensaje.classList.add("hidden");

    try {
        const pokemon = await buscarPokemon(nombre);
        mostrarResultado(pokemon);
    } catch (error) {
        // si es un error de red, muestra mensaje de conexión
        // si es un 404, muestra el mensaje específico del throw
        if (error.message === "Failed to fetch") {
            mensaje.textContent = "Algo salió mal. Revisa tu conexión.";
        } else {
            mensaje.textContent = error.message;
        }
        mensaje.classList.remove("hidden");
    } finally {
        spinner.classList.add("hidden");
    }
}

// cargarPokedex robusta — comenta la de C11 y agrega esta
async function cargarPokedex() {
    spinner.classList.remove("hidden");
    try {
        const nombres = ["bulbasaur", "charmander", "squirtle", "pikachu", "jigglypuff", "gengar"];
        const datos = await Promise.all(nombres.map(obtenerPokemon));
        pokedex = datos.map(adaptarPokemon);
        render(pokedex);
    } catch (error) {
        mensaje.textContent = "No se pudo cargar la Pokédex.";
        mensaje.classList.remove("hidden");
    } finally {
        spinner.classList.add("hidden");
    }
}

cargarPokedex();