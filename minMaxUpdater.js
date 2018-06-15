const cron = require('node-cron');
const node_storage = require('node-storage');

const clima = require('./clima');

let task;
let minutes_counter;

module.exports = {
  start: (lang, path) => {
    let storage = new node_storage(path);
    minutes_counter = 0;

    updateMinMax(storage, lang);

    /* El formato CRON "* * * * *" es igual a "cada 1 minuto" */
    task = cron.schedule('* * * * *', updateMinMax.bind(this, storage, lang));
    task.start();
  },
  stop: () => {
    task.stop();
  },
  destroy: () => {
    task.destroy();
  }
}

function updateMinMax(storage, lang) {
  minutes_counter++;
  // Si ya pasaron 1440 minutos (24hs), debemos reiniciar el minimo y el máximo.
  // De esta manerea obtendremos el min y max de las ultimas 24hs desde que se inició el microservicio, y no el min y max desde que se inició por primera vez el microservicio
  if ( minutes_counter >= 1440 ) {
    minutes_counter = 0;
    storage.remove('max');
    storage.remove('min');
  }

  clima.obtenerActual(lang).then( (response) => {
    if ( !storage.get('max') || response.temperatura > storage.get('max') ) {
      storage.put('max', response.temperatura);
    }
    if ( !storage.get('min') || response.temperatura < storage.get('min') ) {
      storage.put('min', response.temperatura);
    }
  }).catch( (error) => {
    console.log('Error al intentar obtener el clima actual. Minimo/maximo no actualizado');
  });
}