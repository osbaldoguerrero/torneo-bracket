/* =========================================================
   TORNEO - BRACKET DINÁMICO
   =========================================================
// VERSION 2 - 30 SEPTIEMBRE

   EQUIPOS:

   p1=Rudos
   p2=Halcones
   ...
   p16=Titanes


   RESULTADOS:

   o1=6-3,5-7,10-5,1

   Significa:

   Set 1: 6-3
   Set 2: 5-7
   Set 3: 10-5
   Ganador: puesto 1


   PARTIDOS:

   OCTAVOS:
   o1 ... o8

   CUARTOS:
   c1 ... c4

   SEMIFINALES:
   s1 ... s2

   FINAL:
   f1
========================================================= */


/* =========================================================
   1. PARÁMETROS DE URL
========================================================= */

const params = new URLSearchParams(
  window.location.search
);



/* =========================================================
   2. CREAR LOS 16 EQUIPOS
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
   3. ESTRUCTURA FIJA DE OCTAVOS
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
   4. LEER RESULTADO DE UN PARTIDO

   Ejemplo:

   o1=6-3,5-7,10-5,1

   Devuelve:

   {
     sets: [
       [6,3],
       [5,7],
       [10,5]
     ],

     ganadorPuesto: 1
   }
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


  /*
     El último valor siempre será
     el puesto del ganador.
  */

  const ganadorPuesto =
    Number(
      partes[partes.length - 1]
    );


  /*
     Todo lo anterior son sets.
  */

  const setsTexto =
    partes.slice(
      0,
      partes.length - 1
    );


  const sets = [];


  setsTexto
    .slice(0, 3)
    .forEach(setTexto => {

      /*
         Permitimos:

         6-3
         7-5
         10-8
      */

      const valores =
        setTexto
          .split("-")
          .map(
            valor => valor.trim()
          );


      if (valores.length !== 2) {
        return;
      }


      sets.push([

        valores[0],

        valores[1]

      ]);

    });


  return {

    sets,
    ganadorPuesto:
      Number.isFinite(ganadorPuesto)
        ? ganadorPuesto
        : null

  };

}



/* =========================================================
   5. OBTENER GANADOR

   IMPORTANTE:

   NO analizamos los sets.

   Glide nos dice quién ganó.
========================================================= */

function obtenerGanador(
  equipoA,
  equipoB,
  resultado
) {

  if (
    !equipoA ||
    !equipoB ||
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


  /*
     Si Glide manda un puesto que
     no corresponde a ninguno de
     los dos jugadores, no avanzamos.
  */

  return null;

}



/* =========================================================
   6. OBTENER MARCADOR DE UN SET
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
   7. CREAR FILA DE EQUIPO
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


  /*
     Pintar ganador
  */

  if (
    equipo &&
    ganador &&
    equipo.puesto === ganador.puesto
  ) {

    fila.classList.add(
      "ganador"
    );

  }



  /* ==============================
     PUESTO
  ============================== */

  const puesto =
    document.createElement("span");


  puesto.className =
    "puesto";


  puesto.textContent =
    equipo
      ? equipo.puesto
      : "—";



  /* ==============================
     NOMBRE
  ============================== */

  const nombre =
    document.createElement("span");


  nombre.className =
    "nombre";


  nombre.textContent =
    equipo
      ? equipo.nombre
      : "Por definir";



  /* ==============================
     SET 1
  ============================== */

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



  /* ==============================
     SET 2
  ============================== */

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



  /* ==============================
     SET 3
  ============================== */

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



  /* ==============================
     AGREGAR ELEMENTOS
  ============================== */

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
   8. CREAR CABECERA S1 / S2 / S3
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
   9. CREAR PARTIDO COMPLETO
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



  /* CABECERA */

  contenedor.appendChild(
    crearCabeceraSets()
  );



  /* TARJETA */

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
   10. OCTAVOS
========================================================= */

const ganadoresOctavos = [];


const contenedorOctavos =
  document.getElementById(
    "octavos"
  );


crucesOctavos.forEach(
  (cruce, index) => {

    const numero =
      index + 1;


    const equipoA =
      equipos[cruce[0]];


    const equipoB =
      equipos[cruce[1]];


    const resultado =
      leerResultado(
        `o${numero}`
      );


    const ganador =
      obtenerGanador(
        equipoA,
        equipoB,
        resultado
      );


    ganadoresOctavos.push(
      ganador
    );


    contenedorOctavos.appendChild(

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
   11. CUARTOS
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

  const numero =
    i + 1;


  const equipoA =
    ganadoresOctavos[
      i * 2
    ];


  const equipoB =
    ganadoresOctavos[
      (i * 2) + 1
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

  /*
     textContent evita problemas si un nombre
     contiene caracteres especiales.
  */

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
  "Ganadores de octavos:",
  ganadoresOctavos
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
