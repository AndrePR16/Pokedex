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
  grass:    "bg-green-200 text-green-800",
  poison:   "bg-purple-200 text-purple-800",
  fire:     "bg-red-200 text-red-800",
  water:    "bg-blue-200 text-blue-800",
  electric: "bg-yellow-200 text-yellow-800",
  normal:   "bg-slate-200 text-slate-700",
  fairy:    "bg-pink-200 text-pink-800",
  ghost:    "bg-indigo-200 text-indigo-800",
  psychic:  "bg-rose-200 text-rose-800",
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
    tipos:  data.types.map(t => t.type.name)
  };
}

const nombres = ["bulbasaur", "charmander", "squirtle", "pikachu", "jigglypuff", "gengar"];
let pokedex = [];   // aquí guardamos la rejilla cargada

contenedor.innerHTML = `
  <div class="col-span-full flex justify-center items-center py-10">
    <div class="w-12 h-12 border-4 border-slate-300 border-t-red-500 rounded-full animate-spin"></div>
  </div>
`;

// Un fetch por cada nombre → array de promesas
const promesas = nombres.map(function (nombre) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`).then(r => r.json());
});

Promise.all(promesas)
  .then(function (datos) {
    pokedex = datos.map(adaptarPokemon);   // adapta todos a la forma limpia
    render(pokedex);
  })
  .catch(function () {
    contenedor.innerHTML = `<p class="col-span-full text-center text-red-600">No se pudo cargar la Pokédex.</p>`;
  });

// Buscador reconectado — solo cambia pokemonLocal por pokedex
const buscador = document.getElementById("buscador");

buscador.addEventListener("input", function () {
  const texto = buscador.value.toLowerCase();
  const filtrados = pokedex.filter(p => p.nombre.includes(texto));
  render(filtrados);
});