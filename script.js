/* =========================================================
   TORNEO - BRACKET DINÁMICO

   FASE FINAL DE 8 EQUIPOS

   CUARTOS:
   c1 ... c4

   SEMIFINALES:
   s1 ... s2

   FINAL:
   f1

   FORMATO DE RESULTADO:

   c1=6-3,5-7,10-5,1

   Significa:

   Set 1: 6-3
   Set 2: 5-7
   Set 3: 10-5
   Ganador: puesto 1
========================================================= */


/* =========================================================
   1. PARÁMETROS DE URL
========================================================= */

const params = new URLSearchParams(
  window.location.search
);


/* =========================================================
   2. NOMBRE DEL TORNEO
========================================================= */

const nombreTorneo =
  params.get("torneo");


const subtituloTorneo =
  document.querySelector(".subtitulo");


if (subtituloTorneo) {

  subtituloTorneo.textContent =
    nombreTorneo || "TORNEO";

}


/* =========================================================
   3. CREAR LOS EQUIPOS

   El parámetro "equipos" llega ordenado
   por posición desde Glide.

   Ejemplo:

   ?equipos=Equipo1|Equipo2|Equipo3|...

   Solo clasifican los primeros 8.
========================================================= */

const equipos = {};


const equiposTexto =
  params.get("equipos");


if (equiposTexto) {

  const listaEquipos =
    equiposTexto
      .split("|")
      .map(
        nombre => nombre.trim()
      )
      .filter(
        nombre => nombre !== ""
      );


  listaEquipos
    .slice(0, 8)
    .forEach(
      (nombre, index) => {

        const puesto =
          index + 1;


        equipos[puesto] = {

          puesto: puesto,

          nombre: nombre

        };

      }
    );

}


/*
   SISTEMA ALTERNATIVO PARA PRUEBAS

   Permite seguir usando:

   ?p1=Rudos&p2=Halcones...
*/

else {

  for (
    let i = 1;
    i <= 8;
    i++
  ) {

    equipos[i] = {

      puesto: i,

      nombre:
        params.get(`p${i}`) ||
        `Equipo ${i}`

    };

  }

}


/* =========================================================
   4. ESTRUCTURA DE CUARTOS

   Seeding:

   #1 vs #8
   #4 vs #5
   #2 vs #7
   #3 vs #6

   De esta manera:

   ganador C1 vs ganador C2

   ganador C3 vs ganador C4
========================================================= */

const crucesCuartos = [

  [1, 8],

  [4, 5],

  [2, 7],

  [3, 6]

];


/* =========================================================
   5. LEER RESULTADO DE UN PARTIDO
========================================================= */

function leerResultado(clave) {

  const valor =
    params.get(clave);


  if (!valor) {

    return {

      sets: [],

      ganadorPuesto: null

    };

  }


  const partes =
    valor
      .split(",")
      .map(
        parte => parte.trim()
      )
      .filter(Boolean);


  if (partes.length < 2) {

    return {

      sets: [],

      ganadorPuesto: null

    };

  }


  const ganadorPuesto =
    Number(
      partes[
        partes.length - 1
      ]
    );


  const setsTexto =
    partes.slice(
      0,
      partes.length - 1
    );


  const sets = [];


  setsTexto
    .slice(0, 3)
    .forEach(
      setTexto => {

        const valores =
          setTexto
            .split("-")
            .map(
              valor => valor.trim()
            );


        if (
          valores.length !== 2
        ) {

          return;

        }


        sets.push([

          valores[0],

          valores[1]

        ]);

      }
    );


  return {

    sets,

    ganadorPuesto:
      Number.isFinite(
        ganadorPuesto
      )
        ? ganadorPuesto
        : null

  };

}


/* =========================================================
   6. OBTENER GANADOR
========================================================= */

function obtenerGanador(
  equipoA,
  equipoB,
  resultado
) {

  if (
    !equipoA ||
    !equipoB
  ) {

    return null;

  }


  if (
    !resultado ||
    !resultado.ganadorPuesto
  ) {

    return null;

  }


  if (
    equipoA.puesto ===
    resultado.ganadorPuesto
  ) {

    return equipoA;

  }


  if (
    equipoB.puesto ===
    resultado.ganadorPuesto
  ) {

    return equipoB;

  }


  return null;

}


/* =========================================================
   7. OBTENER MARCADOR DE UN SET
========================================================= */

function obtenerSet(
  resultado,
  numeroSet,
  jugador
) {

  const set =
    resultado.sets[numeroSet];


  if (!set) {

    return "–";

  }


  return set[jugador];

}


/* =========================================================
   8. CREAR FILA DE EQUIPO
========================================================= */

function crearFilaEquipo(
  equipo,
  resultado,
  jugador,
  ganador
) {

  const fila =
    document.createElement("div");


  fila.className =
    "equipo";


  if (
    equipo &&
    ganador &&
    equipo.puesto === ganador.puesto
  ) {

    fila.classList.add(
      "ganador"
    );

  }


  /* PUESTO */

  const puesto =
    document.createElement("span");


  puesto.className =
    "puesto";


  puesto.textContent =
    equipo
      ? equipo.puesto
      : "—";


  /* NOMBRE */

  const nombre =
    document.createElement("span");


  nombre.className =
    "nombre";


  nombre.textContent =
    equipo
      ? equipo.nombre
      : "Por definir";


  /* SET 1 */

  const set1 =
    document.createElement("span");


  set1.className =
    "set";


  set1.textContent =
    equipo
      ? obtenerSet(
          resultado,
          0,
          jugador
        )
      : "–";


  /* SET 2 */

  const set2 =
    document.createElement("span");


  set2.className =
    "set";


  set2.textContent =
    equipo
      ? obtenerSet(
          resultado,
          1,
          jugador
        )
      : "–";


  /* SET 3 */

  const set3 =
    document.createElement("span");


  set3.className =
    "set";


  set3.textContent =
    equipo
      ? obtenerSet(
          resultado,
          2,
          jugador
        )
      : "–";


  fila.appendChild(
    puesto
  );


  fila.appendChild(
    nombre
  );


  fila.appendChild(
    set1
  );


  fila.appendChild(
    set2
  );


  fila.appendChild(
    set3
  );


  return fila;

}


/* =========================================================
   9. CREAR CABECERA S1 / S2 / S3
========================================================= */

function crearCabeceraSets() {

  const cabecera =
    document.createElement("div");


  cabecera.className =
    "cabecera-sets";


  cabecera.innerHTML = `

    <span class="espacio-puesto"></span>

    <span class="espacio-nombre"></span>

    <span class="titulo-set">
      S1
    </span>

    <span class="titulo-set">
      S2
    </span>

    <span class="titulo-set">
      S3
    </span>

  `;


  return cabecera;

}


/* =========================================================
   10. CREAR PARTIDO COMPLETO
========================================================= */

function crearPartido(
  equipoA,
  equipoB,
  resultado,
  ganador
) {

  const contenedor =
    document.createElement("div");


  contenedor.className =
    "partido-contenedor";


  contenedor.appendChild(
    crearCabeceraSets()
  );


  const partido =
    document.createElement("div");


  partido.className =
    "partido";


  if (ganador) {

    partido.classList.add(
      "resuelto"
    );

  }


  partido.appendChild(

    crearFilaEquipo(
      equipoA,
      resultado,
      0,
      ganador
    )

  );


  partido.appendChild(

    crearFilaEquipo(
      equipoB,
      resultado,
      1,
      ganador
    )

  );


  contenedor.appendChild(
    partido
  );


  return contenedor;

}


/* =========================================================
   11. CUARTOS DE FINAL
========================================================= */

const ganadoresCuartos = [];


const contenedorCuartos =
  document.getElementById(
    "cuartos"
  );


crucesCuartos.forEach(
  (cruce, index) => {

    const numero =
      index + 1;


    const equipoA =
      equipos[
        cruce[0]
      ];


    const equipoB =
      equipos[
        cruce[1]
      ];


    const resultado =
      leerResultado(
        `c${numero}`
      );


    const ganador =
      obtenerGanador(
        equipoA,
        equipoB,
        resultado
      );


    ganadoresCuartos.push(
      ganador
    );


    contenedorCuartos.appendChild(

      crearPartido(
        equipoA,
        equipoB,
        resultado,
        ganador
      )

    );

  }
);


/* =========================================================
   12. SEMIFINALES
========================================================= */

const ganadoresSemifinales = [];


const contenedorSemifinales =
  document.getElementById(
    "semifinales"
  );


for (
  let i = 0;
  i < 2;
  i++
) {

  const numero =
    i + 1;


  const equipoA =
    ganadoresCuartos[
      i * 2
    ];


  const equipoB =
    ganadoresCuartos[
      (i * 2) + 1
    ];


  const resultado =
    leerResultado(
      `s${numero}`
    );


  const ganador =
    obtenerGanador(
      equipoA,
      equipoB,
      resultado
    );


  ganadoresSemifinales.push(
    ganador
  );


  contenedorSemifinales.appendChild(

    crearPartido(
      equipoA,
      equipoB,
      resultado,
      ganador
    )

  );

}


/* =========================================================
   13. FINAL
========================================================= */

const equipoFinalA =
  ganadoresSemifinales[0];


const equipoFinalB =
  ganadoresSemifinales[1];


const resultadoFinal =
  leerResultado(
    "f1"
  );


const campeon =
  obtenerGanador(
    equipoFinalA,
    equipoFinalB,
    resultadoFinal
  );


const contenedorFinal =
  document.getElementById(
    "final"
  );


contenedorFinal.appendChild(

  crearPartido(
    equipoFinalA,
    equipoFinalB,
    resultadoFinal,
    campeon
  )

);


/* =========================================================
   14. CAMPEÓN
========================================================= */

const contenedorCampeon =
  document.getElementById(
    "campeon"
  );


if (campeon) {

  contenedorCampeon.innerHTML = `

    <img
      class="copa"
      src="copa.png"
      alt="Copa"
    >

    <div class="campeon-titulo">
      CAMPEÓN
    </div>

    <div class="campeon-card">

      <div class="corona">
        ♛
      </div>

      <div class="campeon-puesto">
        #${campeon.puesto}
      </div>

      <div class="nombre-campeon"></div>

    </div>

  `;


  contenedorCampeon
    .querySelector(
      ".nombre-campeon"
    )
    .textContent =
      campeon.nombre;

}


else {

  contenedorCampeon.innerHTML = `

    <img
      class="copa"
      src="copa.png"
      alt="Copa"
    >

    <div class="campeon-titulo">
      CAMPEÓN
    </div>

    <div class="campeon-card">

      <div class="corona">
        ♛
      </div>

      <div class="nombre-campeon">
        Por definir
      </div>

    </div>

  `;

}


/* =========================================================
   15. INFORMACIÓN PARA PRUEBAS
========================================================= */

console.log(
  "Bracket cargado"
);


console.log(
  "Equipos clasificados:",
  equipos
);


console.log(
  "Ganadores de cuartos:",
  ganadoresCuartos
);


console.log(
  "Ganadores de semifinales:",
  ganadoresSemifinales
);


console.log(
  "Campeón:",
  campeon
);
