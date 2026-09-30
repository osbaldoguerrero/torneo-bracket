/* =========================================================
   BRACKET DINÁMICO
   ========================================================= */


/* =========================================================
   1. LEER PARÁMETROS DE LA URL
   ========================================================= */

const params = new URLSearchParams(window.location.search);



/* =========================================================
   2. EQUIPOS CLASIFICADOS

   p1 = primer lugar
   p2 = segundo lugar
   ...
   p16 = lugar 16

   Si no existe el parámetro, usamos un nombre de prueba.
   ========================================================= */

const equipos = {};

for (let i = 1; i <= 16; i++) {

  equipos[i] = {
    puesto: i,
    nombre:
      params.get(`p${i}`) ||
      `Equipo ${i}`
  };

}



/* =========================================================
   3. ESTRUCTURA DE OCTAVOS

   El orden es FIJO según nuestro sistema.
   ========================================================= */

const crucesOctavos = [

  [1, 16],
  [8, 9],

  [4, 13],
  [5, 12],

  [2, 15],
  [7, 10],

  [3, 14],
  [6, 11]

];



/* =========================================================
   4. RESULTADOS

   Los parámetros serán:

   o1a / o1b = Octavos partido 1
   o2a / o2b = Octavos partido 2
   etc.

   c1a / c1b = Cuartos
   s1a / s1b = Semifinales
   f1a / f1b = Final
   ========================================================= */

function obtenerMarcador(parametro) {

  const valor = params.get(parametro);

  if (
    valor === null ||
    valor === ""
  ) {
    return null;
  }

  return Number(valor);

}



/* =========================================================
   5. DETERMINAR GANADOR

   Si todavía no existen ambos marcadores,
   el partido sigue pendiente.

   Si hay empate, tampoco avanzamos automáticamente.
   ========================================================= */

function obtenerGanador(
  equipoA,
  equipoB,
  marcadorA,
  marcadorB
) {

  if (
    !equipoA ||
    !equipoB ||
    marcadorA === null ||
    marcadorB === null
  ) {

    return null;

  }


  if (marcadorA > marcadorB) {

    return equipoA;

  }


  if (marcadorB > marcadorA) {

    return equipoB;

  }


  return null;

}



/* =========================================================
   6. CREAR VISUALMENTE UN PARTIDO
   ========================================================= */

function crearPartido(
  equipoA,
  equipoB,
  marcadorA,
  marcadorB,
  ganador
) {

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
      marcadorA,
      ganador
    )
  );


  partido.appendChild(
    crearFilaEquipo(
      equipoB,
      marcadorB,
      ganador
    )
  );


  return partido;

}



/* =========================================================
   7. CREAR FILA DE EQUIPO
   ========================================================= */

function crearFilaEquipo(
  equipo,
  marcador,
  ganador
) {

  const fila =
    document.createElement("div");

  fila.className =
    "equipo";


  if (
    equipo &&
    ganador &&
    equipo === ganador
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


  /* MARCADOR */

  const marcadorElemento =
    document.createElement("span");

  marcadorElemento.className =
    "marcador";

  marcadorElemento.textContent =
    marcador !== null
      ? marcador
      : "–";


  fila.appendChild(
    puesto
  );

  fila.appendChild(
    nombre
  );

  fila.appendChild(
    marcadorElemento
  );


  return fila;

}



/* =========================================================
   8. OCTAVOS
   ========================================================= */

const ganadoresOctavos = [];

const contenedorOctavos =
  document.getElementById(
    "octavos"
  );


crucesOctavos.forEach(
  (cruce, index) => {

    const numeroPartido =
      index + 1;


    const equipoA =
      equipos[cruce[0]];

    const equipoB =
      equipos[cruce[1]];


    const marcadorA =
      obtenerMarcador(
        `o${numeroPartido}a`
      );

    const marcadorB =
      obtenerMarcador(
        `o${numeroPartido}b`
      );


    const ganador =
      obtenerGanador(
        equipoA,
        equipoB,
        marcadorA,
        marcadorB
      );


    ganadoresOctavos.push(
      ganador
    );


    contenedorOctavos.appendChild(

      crearPartido(
        equipoA,
        equipoB,
        marcadorA,
        marcadorB,
        ganador
      )

    );

  }
);



/* =========================================================
   9. CUARTOS

   Ganador O1 vs ganador O2
   Ganador O3 vs ganador O4
   Ganador O5 vs ganador O6
   Ganador O7 vs ganador O8
   ========================================================= */

const ganadoresCuartos = [];

const contenedorCuartos =
  document.getElementById(
    "cuartos"
  );


for (
  let i = 0;
  i < 4;
  i++
) {

  const numeroPartido =
    i + 1;


  const equipoA =
    ganadoresOctavos[i * 2];

  const equipoB =
    ganadoresOctavos[
      (i * 2) + 1
    ];


  const marcadorA =
    obtenerMarcador(
      `c${numeroPartido}a`
    );

  const marcadorB =
    obtenerMarcador(
      `c${numeroPartido}b`
    );


  const ganador =
    obtenerGanador(
      equipoA,
      equipoB,
      marcadorA,
      marcadorB
    );


  ganadoresCuartos.push(
    ganador
  );


  contenedorCuartos.appendChild(

    crearPartido(
      equipoA,
      equipoB,
      marcadorA,
      marcadorB,
      ganador
    )

  );

}



/* =========================================================
   10. SEMIFINALES
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

  const numeroPartido =
    i + 1;


  const equipoA =
    ganadoresCuartos[i * 2];

  const equipoB =
    ganadoresCuartos[
      (i * 2) + 1
    ];


  const marcadorA =
    obtenerMarcador(
      `s${numeroPartido}a`
    );

  const marcadorB =
    obtenerMarcador(
      `s${numeroPartido}b`
    );


  const ganador =
    obtenerGanador(
      equipoA,
      equipoB,
      marcadorA,
      marcadorB
    );


  ganadoresSemifinales.push(
    ganador
  );


  contenedorSemifinales.appendChild(

    crearPartido(
      equipoA,
      equipoB,
      marcadorA,
      marcadorB,
      ganador
    )

  );

}



/* =========================================================
   11. FINAL
   ========================================================= */

const equipoFinalA =
  ganadoresSemifinales[0];

const equipoFinalB =
  ganadoresSemifinales[1];


const marcadorFinalA =
  obtenerMarcador(
    "f1a"
  );

const marcadorFinalB =
  obtenerMarcador(
    "f1b"
  );


const campeon =
  obtenerGanador(
    equipoFinalA,
    equipoFinalB,
    marcadorFinalA,
    marcadorFinalB
  );


const contenedorFinal =
  document.getElementById(
    "final"
  );


contenedorFinal.appendChild(

  crearPartido(
    equipoFinalA,
    equipoFinalB,
    marcadorFinalA,
    marcadorFinalB,
    campeon
  )

);



/* =========================================================
   12. CAMPEÓN
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

      <div class="nombre-campeon">
        ${campeon.nombre}
      </div>

    </div>

  `;

} else {

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
