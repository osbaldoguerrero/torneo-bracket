/*
==================================================
TORNEO - BRACKET
==================================================

Este archivo manejará los datos enviados desde Glide.

Posteriormente podremos recibir información
mediante la URL, por ejemplo:

?e1=Rudos
&e16=Titanes
&m1=6
&m16=3
&ganador1=Rudos

JavaScript leerá esos parámetros y construirá
automáticamente el bracket.

Por ahora utilizamos los datos de demostración
que están escritos en index.html.
*/


console.log("Bracket cargado correctamente");


/*
==================================================
LECTURA DE PARÁMETROS DE URL
==================================================
*/

const parametros = new URLSearchParams(
  window.location.search
);


/*
Ejemplo:

const equipo1 = parametros.get("e1");

console.log(equipo1);

*/
