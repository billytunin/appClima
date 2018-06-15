# appClima
Repositorio dedicado al código para la solución del ejercicio de Bondacom

<h3>Ejecución</h3>
<p style="background-color: rgba(230, 230, 230, 0.6)">node appClima.js</p>
o en su defecto
<p style="background-color: rgba(230, 230, 230, 0.6)">nodemon appClima.js</p>

<h3>Parámetros</h3>
Todos los parámetros son opcionales.
<dl>
  <dt>Listado:</dt>
  <dd>--port o -p : especifica el puerto en el que la app estará escuchando. Ejemplo: "node appClima.js --port=1337". El default es 3000</dd>
  <dd>--lang o -l: especifica el idioma. Ejemplo "node appClima.js --lang=en". El default es "es" (los códigos de idiomas soportados son todos los idiomas soportados por Apixu: http://www.apixu.com/doc/conditions.json)</dd>
  <dd>--path: especifica la ruta donde será guardado el archivo que lleva la cuenta de la temperatura minima y maxima. El default es "min_max" <i>(es decir, será un archivo binario llamado "min_max" creado en la misma ruta desde donde se ejecuta la app)</i>.</dd>
</dl>
<h3>Endpoints</h3>
/climaActual

/obtenerMinMax





<b>NOTA</b>: recuerde despachar un "npm install" antes de ejecutar la app
